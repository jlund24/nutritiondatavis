library(tidyverse)
library(readxl)

# fda data
nutrients <- read_csv('preprocess/nutrition_extract_201911011127.csv')
colnames(nutrients) <- c('fdc_id', 'data_type', 'description', 'food_category_id',
                     'portion_amount', 'serving', 'grams_per_serving',
                     'nutrients_per_100g', 'data_points', 'nutrient')

nutrients_spread <- nutrients %>%
  select(-data_points) %>%
  mutate(nutrients = nutrients_per_100g * grams_per_serving / 100) %>%
  select(-nutrients_per_100g) %>%
  pivot_wider(names_from = nutrient,
              values_from = nutrients)

# price data
snack_prices <- read_excel('raw/snackprices.xls', range = 'A4:B23', col_names = FALSE)
fv_prices <- read_excel('raw/fvprices.xls', range = 'A6:B24', col_names = FALSE)
prices <- bind_rows(snack_prices, fv_prices)
colnames(prices) <- c('price_name', 'price_per_pound')
prices <- prices %>% mutate(price_per_gram = price_per_pound / 453.592)


# join em
key_table <- read_csv('preprocess/fdc_usda_key.csv')

nutrients_and_price <- nutrients_spread %>%
  left_join(key_table, by = c('description' = 'fda_description')) %>%
  left_join(prices, by = 'price_name') %>%
  mutate(price = price_per_gram * grams_per_serving)

nutrients_and_price %>%
  write_csv('preprocess/nutrients_and_price.csv')
