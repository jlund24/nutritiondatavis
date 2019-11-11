// JavaScript Document
class MealPlanner {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;
		
		this.createMealPlanner();
    }

    createMealPlanner()
    {
		let mealContainer = d3.select("#meal-container");
		mealContainer.append("div")
			.attr("id", "menu-div");
		
		mealContainer.append("div")
			.attr("id", "price-div");
		
		mealContainer.append("div")
			.attr("id", "bar-div");
    }

    updateMealPlanner()
    {
        
    }
}