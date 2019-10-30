// JavaScript Document

let dummy_data = [
    {
        "calories" : 200,
        "protein" : 2,
        "total_fat": 4,
        "sugars" : 1,
        "carbs" : 25,
        "price" : 1.25,
        "serving_size" : 1,
        "name" : "hamburger"
    }
];

let columns = [
    {
        "name": "calories",
        "unit": "cal"
    },
    {
        "name": "protein",
        "unit": "g"
    },
    {
        "name": "total_fat",
        "unit": "g"
    },
    {
        "name": "sugars",
        "unit": "g"
    },
    {
        "name": "carbs",
        "unit": "g"
    },
    {
        "name": "price",
        "unit": "$"
    }
]

let table = new Table(dummy_data);
let scatterplot = new ScatterPlot(dummy_data);
let meal_planner = new MealPlanner(dummy_data);