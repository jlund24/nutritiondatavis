SELECT f.*,
food_portion.amount AS portion_amount,
COALESCE(food_portion.portion_description, food_portion.modifier) AS serving,
food_portion.gram_weight AS grams_per_serving,
fn.nutrients_per_100g, fn.data_points, fn.nutrient
FROM (SELECT FIRST(fdc_id) AS fdc_id, FIRST(data_type) AS data_type, description, FIRST(`food_category_id`) AS `food_category_id`
    FROM food
    WHERE description IN 
    ("Banana, raw","Melons, cantaloupe, raw","Grapes, raw, NS as to type",
    "Oranges, raw, navels (Includes foods for USDA's Food Distribution Program)",
    "Peach, cooked or canned, drained solids",
    "Pineapple, cooked or canned, NS as to sweetened or unsweetened; sweetened, NS as to type of sweetener",
    "Plums, raw","Raisins","Strawberries, raw","Watermelon, raw","Broccoli, raw",
    "Carrots, raw","Celery, raw","Pepper, sweet, red, raw",
    "Sweet potato, baked, peel not eaten, fat not added in cooking",
    "Tomatoes, grape, raw","Cookie, chocolate chip","Cake or cupcake, NS as to type",
    "Doughnut, raised or yeast","Crackers, graham","Ice cream, regular, chocolate",
    "Muffin, fruit","DIGIORNO Pizza, cheese topping, rising crust, frozen, baked",
    "Ice pop","White potato chips, lightly salted","Pretzels, hard",
    "Pudding, ready-to-eat, chocolate and non-chocolate flavors combined",
    "Breakfast tart",
"Rice, white, cooked, fat not added in cooking","Bread, white",
"Bread, whole wheat","Spaghetti, cooked, fat not added in cooking","Milk, whole",
"Milk, fat free (skim)","Egg, whole, raw","Ground beef, raw",
"Chicken, breast, NS as to cooking method, skin not eaten",
"Pork cured, bacon, unprepared",
'Beef, loin, top sirloin cap steak, boneless, separable lean and fat, trimmed to 1/8" fat, all grades, raw',
"Black, brown, or Bayo beans, dry, cooked, fat not added in cooking",
"Cheese, cheddar, sharp, sliced","Yogurt, Greek, plain, nonfat milk",
"Butter, stick, salted")
    AND data_type != "branded_food"
    GROUP BY description) f
LEFT JOIN food_portion ON f.fdc_id = food_portion.fdc_id
LEFT JOIN (SELECT food_nutrient.fdc_id, nutrient.name AS nutrient, food_nutrient.amount AS nutrients_per_100g, food_nutrient.data_points
    FROM food_nutrient
    LEFT JOIN nutrient
    ON nutrient.id = food_nutrient.nutrient_id
    WHERE name IN ("Protein","Total lipid (fat)","Carbohydrate, by difference","Energy","Starch",
    "Sucrose","Glucose (dextrose)","Fructose","Lactose","Caffeine","Sugars, total including NLEA",
    "Fiber, total dietary","Calcium, Ca","Iron, Fe","Magnesium, Mg",
    "Potassium, K","Sodium, Na","Zinc, Zn","Fluoride, F","Iodine, I",
    "Vitamin A, RAE","Vitamin E (alpha-tocopherol)","Vitamin D (D2 + D3)",
    "Vitamin C, total ascorbic acid","Folate, DFE","Cholesterol",
    "Fatty acids, total trans","Fatty acids, total saturated") AND unit_name != "kJ") fn
ON f.fdc_id = fn.fdc_id;

