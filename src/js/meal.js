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
		
		let mealTitleDiv = mealContainer.append('div')
			.attr('id', "mealTitle-div")
			.html("MEAL PLANNER");

		let mealContentContainer = mealContainer.append('div')
			.attr("id", "mealContent-div");
		
		let menuDiv = mealContentContainer.append("div")
			.attr("id", "menu-div");
		
		let priceDiv = mealContentContainer.append("div")
			.attr("id", "price-div");
		
		let barDiv = mealContentContainer.append("div")
			.attr("id", "bar-div");
		

		
		//initialize menu
		let optionSelect = function(data) {
			console.log('search', data)
		}
				
				
		let foodNames = [];
		for (let food of this.data) {
			foodNames.push(food.title) //TODO: PREVENT DUPLICATES
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
			let foodData = that.data.filter(d => d.title == newFood)
			
			//don't allow duplicates
			if(that.menuItems.filter(d => d[0].title == newFood).length == 0) {
				that.menuItems.push([foodData[0], 1]);
				that.updateMenu();
				that.updatePriceChart();
				that.updateBarGraph();
			}
			
		}
		
		menuDiv.append('button')
			.attr('type', 'button')
			.attr('id', 'addFoodButton')
			.html('ADD TO MENU')
			.on('click', addFood);
		
		let menuHeadersContainer = menuDiv.append('div')
			.attr("id", "menu-headers-container");

		menuHeadersContainer.append('span')
			.html("Food")
		
		menuHeadersContainer.append('span')
			.html("Servings")
		
		menuDiv.append('ul')
			.attr('id', 'menu-list');
//		menuDiv.append('svg')
//			.attr('width', '100%')
//			.attr('height', '400px')
//			.attr('id', 'menuSvg');
		
		
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
		
		//initialize price donut chart
		
		
		
		//initialize bar chart
		let barSvg = barDiv.append('svg')
			.attr('width', '100%')
			.attr('height', '100%');
			
    }

    updateMenu()
    {
		let that = this;
        console.log('menu:', this.menuItems);
		
//		let menuSvg = d3.select('#menuSvg');
//		menuSvg.selectAll('text')
//			.data(this.menuItems)
//			.join('text')
//			.classed('menuItem', true)
//			.text(d => d[0])
//			.attr("transform", (d,i) => "translate(40," + (30 + i*40) + ")")
		
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
		
		let updateQuantity = function(d, i) {
			let node = d3.select("#servingInput" + i).node();
			let newVal = node.value;
			if (newVal < 0) {
				node.value = 0;
				newVal = node.value;
			}
			else if (newVal > 99) {
				node.value = 99;
				newVal = node.value;
			}
			that.menuItems[i][1] = +newVal;

			that.updatePriceChart();
			that.updateBarGraph();
		}
		
		let menuList = d3.select('#menu-list');
		menuList.selectAll('li')
			.data(this.menuItems)
			.join(
				enter => {	
					let li = enter.append('li')
						.classed("food-list-item", true)
						// .style('list-style', 'none')
						;
					let foodItemLeft = li.append("div")
						.classed("food-list-item-left-container", true);

					foodItemLeft.append('div')
						.classed('remove-div', true)
						.classed("hidden", true)
						.attr('width', '20px')
						.append('img')
						.classed('remove-svg', true)
						.attr('src', `assets/delete.svg`)
						.attr('width', '20px')
						.attr('height', '20px');

					d3.selectAll('.remove-div')
						.on("click", function (d, i) {
							console.log(i);
							that.menuItems.splice(i, 1);
							that.updateMenu();
					});
					foodItemLeft.append('div')
						.classed('foodName-div', true)
						.html(d => d[0].title);
					li.append('input')
						.classed('servingInput', true)
						.attr('id', (d,i) => "servingInput" + i)
						.attr('type', 'number')
						.attr('min', 0)
						.attr('max', 99)
						.attr('value', d => d[1])
						.on('change', updateQuantity);
					li.on('mouseover', function (d) {
						d3.select(this).select(".food-list-item-left-container")
							.select(".remove-div")
							.classed("hidden", false);
						
					});
					li.on("mouseout", function (d) {
						d3.select(this).select(".remove-div")
							.classed("hidden", true);
					});
				},
				update => { //I DON'T THINK THIS IS EVER USED, SO A JOIN IS UNNECESSARY
					update.select('.foodName-div')
						.html(d => d[0].title);
					update.select('.servingInput')
						.attr('value', d => d[1])
						.attr('id', (d,i) => "servingInput" + i);
				},
				exit => exit.remove()
			);
			
		
		
			
    }
	
	updatePriceChart() 
	{
		
	}
	
	updateBarGraph() 
	{
		
	}
}