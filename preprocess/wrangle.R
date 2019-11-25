library(tidyverse)
library(readxl)
library(jsonlite)

timestamp <- '201911221241'

# fda data, extracted with the query

nutrients <- read_csv(str_c('preprocess/nutrition_extract_', timestamp, '.csv'))
colnames(nutrients) <- c('fdc_id', 'data_type', 'description', 'food_category_id',
                     'portion_amount', 'serving', 'grams_per_serving',
                     'nutrients_per_100g', 'data_points', 'nutrient')

nutrient_names <- read_csv('preprocess/nutrients.csv') %>%
  select(nutrient = name, label)

nutrients_spread <- nutrients %>%
  select(-data_points) %>%
  mutate(nutrients = nutrients_per_100g * grams_per_serving / 100) %>%
  select(-nutrients_per_100g) %>%
  left_join(nutrient_names, by = c('nutrient')) %>%
  select(-nutrient) %>%
  pivot_wider(names_from = label,
              values_from = nutrients)

# pick a serving that makes sense
nutrients_spread$na <- rowSums(is.na(nutrients_spread))
nutrients_spread <- nutrients_spread %>%
  group_by(fdc_id, description) %>%
  # has "cup" in it, or has the least NA's
  filter(str_detect(serving, 'cup') | (!(any(str_detect(serving, 'cup'))) & min_rank(na) == 1)) %>%
  # now pick the one with least na's
  filter(row_number(na) == 1) %>%
  select(-na)
nutrients_spread <- nutrients_spread %>%
  mutate(serving = str_c(coalesce(str_c(portion_amount, ' '), ''), serving)) %>%
  select(-portion_amount)

# price data
snack_prices <- read_excel('raw/snackprices.xls', range = 'A4:B23', col_names = FALSE)
fv_prices <- read_excel('raw/fvprices.xls', range = 'A6:B24', col_names = FALSE)
supp_prices <- read_csv('preprocess/supp_prices.csv') %>%
  mutate(price_per_pound = Price/Pounds) %>%
  select(price_name = Food, price_per_pound)


prices <- bind_rows(snack_prices, fv_prices)
colnames(prices) <- c('price_name', 'price_per_pound')
prices <- bind_rows(prices, supp_prices)
prices <- prices %>% mutate(price_per_gram = price_per_pound / 453.592)


# join em
key_table <- read_csv('preprocess/fdc_usda_key.csv')

nutrients_and_price <- nutrients_spread %>%
  left_join(key_table, by = c('description' = 'fda_description')) %>%
  left_join(prices, by = 'price_name') %>%
  mutate(price = price_per_gram * grams_per_serving) %>%
  select(-c(data_type, food_category_id))

nutrients_and_price %>%
  write_csv('preprocess/nutrients_and_price.csv')

nutrients_and_price %>%
  write_json('src/data/nutrients_and_price.json')



# macros

macros_raw <- read_csv('preprocess/macros.csv')

age_dat <- data.frame(Age = c('1–3 y', '4–8 y', '9–13 y', '14–18 y', '19–30 y',
                                     '31–50 y', '51–70 y'),
                             age_cut = c('(0,3]', '(3,8]', '(8,13]', '(13,18]',
                                         '(18,30]', '(30,50]', '(50,70]'))

dat <- expand.grid(actual_age = c(19, 4:14 * 5),
                    weight = 16:55 * 5,
                    Sex = c('Male', 'Female'),
                   height_in = c(48:78))

dat %>%
  mutate(weight_kg = weight / 2.205,
         height_cm = height_in * 2.54,
         age_cut = cut(actual_age, breaks = c(0, 3, 8, 13, 18, 30, 50, 70)),
         bmr = if_else(Sex == 'Male',
                       66 + (13.7 * weight_kg) + (5 * height_cm) - (6.8 * actual_age),
                       655 + (9.6 * weight_kg) + (1.8 * height_cm) - (4.7 * actual_age)),
         tdee = 1.2 * bmr) %>%
  left_join(age_dat) %>%
  left_join(macros_raw) %>%
  mutate(cals_from_fat = `Fat (calories from fat / total calories)` * tdee,
         grams_of_fat = round(cals_from_fat / 9),
         grams_of_protein = round(`Protein (g/kg/day)` * weight_kg),
         grams_of_carbs = `Carbohydrates (g/day)`) %>%
  select(age = actual_age, sex = Sex, height = height_in, weight,
         grams_of_fat, grams_of_protein, grams_of_carbs) %>%
  write_json('src/data/recommended_values.json')

