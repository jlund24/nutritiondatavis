# nutritiondatavis
![](https://jlund24.github.io/nutritiondatavis/src/assets/header.svg)

This site leverages nutrition and price data for common foods to help you compare their quality across different dimensions. The site is made up of two main tools: the **Nutrient Explorer** and the **Meal Planner**. The nutrient explorer lays out critical nutrient data for each food in a table sortable by any column. It also includes a scatter plot that allows comparing two dimensions of data (e.g. calories and price) by both serving size and 100 gram units. The meal planner allows you to add a combination of foods to a menu and see how each component affects the overall meal's nutrient values and price.

The site can be visited here: https://jlund24.github.io/nutritiondatavis/

The site is best viewed on displays that are approximately **1800 x 1300 pixels**.

## Demo Video


## File Structure
`index.html` is the main page of our site. All javascript files are in `src/js`.

Data files are `nutrients_and_price1.json` and `recommended_values.json`. They are found in `src/data`.

## Notes
* All illustrations (all food items and the header) were hand crafted by Lizzie
* The values at the top of each column in the nutrient explorer table are the maximum recommended amount for the given nutrient. These are determined based on the demographic  data (age, gender, etc.) at the top of the page.
