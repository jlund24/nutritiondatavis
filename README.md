# nutritiondatavis
![](https://jlund24.github.io/nutritiondatavis/src/assets/header.svg)

This site leverages nutrition and price data for common foods to help you compare their quality across different dimensions. The site is made up of two main tools: the **Nutrient Explorer** and the **Meal Planner**. The nutrient explorer lays out critical nutrient data for each food in a table sortable by any column. It also includes a scatter plot that allows comparing two dimensions of data (e.g. calories and price) by both serving size and 100 gram units. The meal planner allows you to add a combination of foods to a menu and see how each component affects the overall meal's nutrient values and price.

The site can be visited here: https://jlund24.github.io/nutritiondatavis/

The site is best viewed on displays that are approximately **1800 x 1300 pixels**.

## Demo Video


## File Structure
`index.html` is the main page of our site. All javascript files are in `src/js`.

When developing, we used `feast.html` within the `src` directory. We had to create `index.html` in the root directory to deploy using GitHub Pages.

Data files are `nutrients_and_price1.json` and `recommended_values.json`. They are found in `src/data`. `nutrients_and_price.json` is the original data file we used before running `icon_script.js` to add icon paths to each food item.

The `preprocess` directory contains scripts and raw data sources used to generate the data files above. See some details about this process below in Notes.

The `assets` directory contains all the icons and images used on the site.

All css is contained in `styles.css` in the `src` directory.

## Notes
* The values at the top of each column in the nutrient explorer table are the maximum recommended amount for the given nutrient. These are determined based on the demographic  data (age, gender, etc.) at the top of the page.
* All illustrations (all food items and the header) were hand crafted by Lizzie
* Wrangling the data took a significant amount of work. To reproduce our data cleaning process, you need to download the Microsoft Access database at the FDA’s FoodDataCentral (https://fdc.nal.usda.gov/index.html) and query it with the SQL query provided, as well as price information from the USDA ERS (https://www.ers.usda.gov/data-products/fruit-and-vegetable-prices/). The script `wrangle.R` will use this result to combine the other (hand-made) datasets in the `preprocess` folder to deliver the processed data to the `src` folder.
