// JavaScript Document
class MealPlanner {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;
		
		this.menuItems = []; //each index will contain the food and quantity
		
		this.createMealPlanner();
    }

    createMealPlanner()
    {
		let that = this;
		
		let mealContainer = d3.select("#meal-container");
		
		let menuDiv = mealContainer.append("div")
			.attr("id", "menu-div");
		
		let priceDiv = mealContainer.append("div")
			.attr("id", "price-div");
		
		let barDiv = mealContainer.append("div")
			.attr("id", "bar-div");
		

		
		//initialize menu
		let optionSelect = function(data) {
			console.log('search', data)
		}
				
				
		let foodNames = [];
		for (let food of this.data) {
			foodNames.push(food.title)
		}
	
		
		let label = menuDiv.append('label')
			.attr('for', 'searchBar')
			.html('Select a food')
//			.style('margin', '20px');
		label.append('br');
		let searchBar =	label.append('select')
			.attr('name', 'foodSearch')
			.classed('search-select2', true)
			.attr('id', 'searchBar')
			.style('width', '300px');
		
		let options = searchBar.selectAll('option')
			.data(foodNames)
			.enter()
			.append("option")
		
		options.text(d => d)
			.attr("value", d => d)
		
		$(document).ready(function() {
			$('.search-select2').select2();
		});
		
		$('#searchBar').on('select2:select', e => optionSelect(e.params.data.id));
		
		let addFood = function(e) {
			let newFood = $("#searchBar").select2("val");
			console.log('add', newFood);
			that.menuItems.push([newFood, 1]);
			that.updateMenu();
		}
		
		menuDiv.append('button')
			.attr('type', 'button')
			.attr('id', 'addFoodButton')
			.html('ADD TO MENU')
			.on('click', addFood);
		
		menuDiv.append('svg')
			.attr('width', '100%')
			.attr('height', '400px')
			.attr('id', 'menuSvg');
//		let menuTable = menuDiv.append('table')
//			.attr('id', 'menuTable');
//		
//		let tableHead = menuTable.append('thead');
//		let headerRow = tableHead.append('tr')
//			.attr('id', 'menuTableHeaders');
//		headerRow.append('td');
//		headerRow.append('td')
//			.html('Food');
//		headerRow.append('td')
//			.html('Servings');
//		
//		menuTable.append('tbody')
//			.attr('id', 'menuTableBody');
			
    }

    updateMenu()
    {
        console.log('menu:', this.menuItems);
		
		let menuSvg = d3.select('#menuSvg');
		menuSvg.selectAll('text')
			.data(this.menuItems)
			.join('text')
			.classed('menuItem', true)
			.text(d => d[0])
			.attr("transform", (d,i) => "translate(40," + (30 + i*40) + ")")
		
		//TODO: Get numbers working
		
//		let foreigns = menuSvg.selectAll('foreignobject')
//			.data(this.menuItems)
//			.join('foreignobject')
//			.attr("transform", (d,i) => "translate(100," + (30 + i*40) + ")")
//			.append('input')
//			.attr('type', 'number')
//			.attr('id', (d,i) => 'servings' + i)
//			.attr('min', '0')
//			.attr('max', '99')
			
		
		
			
    }
	
	updatePriceChart() 
	{
		
	}
	
	updateBarGraph() 
	{
		
	}
}