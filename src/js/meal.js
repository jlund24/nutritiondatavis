// JavaScript Document
class MealPlanner {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;
		
		this.menuItems = []; //each index will contain the food and quantity
		this.nutrients = [['Calories', 2400], ['Carbohydrates', 130], ['Protein', 56], ['Fat', 93], ['Sugars', 60]]; //data keys and default max values (needs) -- will need to programatically set
		this.barLabels = ['Calories', 'Total Carbs', 'Protein', 'Total Fat', 'Total Sugar'];
		
		//sizing for bar chart
		this.barChartmargin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.barChartWidth = 700 - this.barChartmargin.left - this.barChartmargin.right; 
        this.barChartHeight = 700 - this.barChartmargin.top - this.barChartmargin.bottom; 
		
		this.barWidth = 100;
		this.barSpacing = 18;

		this.priceWidth = 260;
		this.priceHeight = 260;

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
		

		
		/* INITIALIZE MENU */
		let optionSelect = function(data) {
			console.log('search', data)
		}
				
		//create search bar
		let foodNames = [];
		for (let food of this.data) {
			foodNames.push(food.title)
		}
		foodNames.sort();
	
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
		
		//stylize with select2
		$(document).ready(function() {
			$('.search-select2').select2();
		});
		
		$('#searchBar').on('select2:select', e => optionSelect(e.params.data.id));
		
		let addFood = function(e) {
			let newFood = $("#searchBar").select2("val");
			let foodData = that.data.filter(d => d.title == newFood)
			
			//don't allow duplicates
			if(that.menuItems.filter(d => d[0].title == newFood).length == 0) {
				that.menuItems.push([foodData[0], 1]);
				that.updateMenu();
				that.updatePriceChart();
				that.updateBarGraph();
			}
			
		}
		
		//"add to menu" button
		menuDiv.append('button')
			.attr('type', 'button')
			.attr('id', 'addFoodButton')
			.html('ADD TO MENU')
			.on('click', addFood);
		
		let menuHeadersContainer = menuDiv.append('div')
			.attr("id", "menu-headers-container");

		menuHeadersContainer.append('span')
			.classed("menu-headers-text", true)
			.html("Food - Price per serving");
		
		menuHeadersContainer.append('span')
			.classed("menu-headers-text", true)
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
		
		/* INITIALIZE PRICE CHART */
		
		//TODO
		let priceSvg = d3.select("#price-div")
			.append('svg')
			.attr('width', this.priceWidth)
			.attr('height', this.priceHeight)
			.attr('id', 'priceSvg');

		priceSvg.append("g")
			.attr("transform", "translate(" + this.priceWidth / 2 + "," 
				+ this.priceHeight / 2 + ")");

		priceSvg.append("g")
			.attr("transform", `translate(${this.priceWidth / 2}, ${this.priceHeight / 2})`)
			.append("text")
			.attr("id", "price-label")
				.attr("text-anchor", "middle")
				.append("tspan")
				.attr("id", "price-label-value");

		priceDiv.append("div")
            .attr("class", "tooltip")
			.attr('id', 'priceTooltip')
            .style("opacity", 0);
		
		/* INITIALIZE BAR CHART */
		let barSvg = barDiv.append('svg')
			.attr('width', '100%')
			.attr('height', '100%')
			.attr('id', 'barSvg');
		
		//draw x-axis
		barSvg.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', this.barChartWidth)
			.attr('y2', 0)
			.attr('transform', 'translate(' + this.barChartmargin.left + ',' + 
				(this.barChartmargin.top + this.barChartHeight) + ')')
			.attr('stroke-width', 1)
			.attr('stroke', 'black');
		
		//draw x-axis labels
		barSvg.selectAll('text')
			.data(this.barLabels)
			.join('text')
			.attr('transform', (d, i) => 'translate(' + (this.barChartmargin.left + this.barSpacing + this.barWidth/2 + i*(this.barWidth + this.barSpacing)) + ',' + (this.barChartmargin.top + this.barChartHeight + 20) + ')')
			.text(d => d)
			.classed('axis-label', true);
		
		//draw y-axis label
		barSvg.append('text')
			.attr('transform', 'translate(' + (this.barChartmargin.left / 2) + ',' + (this.barChartmargin.top + (this.barChartHeight / 2)) + ') rotate(-90)')
			.text('% DAILY VALUE')
			.classed("axis-label", true);
		
		//create y-axis
		barSvg.append('g')
			.attr("id", "barYAxis")
			.classed("axis", true)
			.attr("transform", "translate(" + this.barChartmargin.left + "," + this.barChartmargin.top + ") scale (1, 1)");
		
		//create dashed line
		barSvg.append('line')
			.attr('id', 'line100')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', this.barChartWidth)
			.attr('y2', 0)
			.attr('stroke-width', 1)
			.attr('stroke', 'black')
			.attr('stroke-dasharray', '5,5');
		
		//create tooltip
		barDiv.append('div')
            .attr("class", "tooltip")
			.attr('id', 'barTooltip')
            .style("opacity", 0);
		
		this.updateBarGraph();
			
    }

    updateMenu()
    {
		let that = this;
		
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

		let format = function(d) { return "$" + d3.format(",.2f")(d); };
		
		let menuList = d3.select('#menu-list');
		menuList.selectAll('li')
			.data(this.menuItems)
			.join(
				enter => {	
					let li = enter.append('li')
						.classed("food-list-item", true)
						// .classed("food-list-item-highlighted", true)
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
						// .attr('src', d => `assets/${d[0].icon_name}.svg`)
						.attr('width', '20px')
						.attr('height', '20px');

					foodItemLeft.append('div')
						.classed('food-icon-div', true)
						.attr('width', '20px')
						.append('img')
							.classed("menu-icon-svg", true)
							.attr('src', d => `assets/${d[0].icon_name}.svg`)
							.attr('width', '20px')
							.attr('height', '20px');

					d3.selectAll('.remove-div')
						.on("click", function (d, i) {
							that.menuItems.splice(i, 1);
							that.updateMenu();
							that.updatePriceChart();
							that.updateBarGraph();
					});
					foodItemLeft.append('div')
						.classed('foodName-div', true)
						.html(d => d[0].title + " - " + format(d[0].price));
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
						
						that.highlightFood(d[0]);
						// d3.select(this)
						// 	.classed("food-list-item-highlighted", true);
					});
					li.on("mouseout", function (d) {
						d3.select(this).select(".remove-div")
							.classed("hidden", true);
						that.highlightFood(null, true);
					});
				},
				update => { //I DON'T THINK THIS IS EVER USED, SO A JOIN IS UNNECESSARY
					update.select('.foodName-div')
						.html(d => d[0].title + " - " + format(d[0].price));
					update.select('.servingInput')
						.attr('value', d => d[1])
						.attr('id', (d,i) => "servingInput" + i);
				},
				exit => exit.remove()
			);
			
		
		
			
    }
	
	updatePriceChart() 
	{
		
		let instance = this;
		let priceSvg = d3.select("#priceSvg");

		let radius = this.priceHeight / 2;
		let arc = d3.arc()
			.innerRadius(radius * 0.75)
			.outerRadius(radius);

		let pie = d3.pie();
		pie.value(d => d.share)
			
			.sort(null)
			;

		let reducer = (accumulator, currentValue) => {
			let value = accumulator + ((currentValue[0]["price"] * currentValue[1]));
			
			return value;
		};
		
		let totalValue = this.menuItems.reduce(reducer, 0);
		let priceData = this.menuItems.map((item, ind) => {
			return {
				share: item[0]["price"] * item[1] / totalValue,
				// color: `rgb(${ind * 100}, ${ind * 50}, ${ind * 10})`,
				color: "green",
				data: item[0],
				servings: item[1]
			};
		});
		

		// let format = d3.format('0.2n');
		let format = function(d) { return "$" + d3.format(",.2f")(d); };

		//round to dollars cents format
		d3.select("#price-label-value")
			.data([totalValue.toFixed(2)])
			.join(
				enter => {
					enter
					.call(enter => enter
						.transition()
						.duration(500)
						.textTween(function(d) {
							const i = d3.interpolate(format(0), d);
							return function(t) { return format(this._current = i(t)); };
							})
						)
						;
					
				},
				update => {
					update
						.call(update => update
							.transition()
							.duration(500)
							.textTween(function(d) {
								if (this._current == null){
									this._current = format(0);
								}
								const i = d3.interpolate(this._current, d);
								return function(t) {
									return format(this._current = i(t));
								};
							})
							)
				}
			);

		let pieData = pie(priceData);

		let tooltip = d3.select("#priceTooltip");

		priceSvg.select("g")
			.selectAll(".price-donut-slice-path")
			.data(pieData)
			.join(
				enter => {
					enter.append("path")
						.classed("price-donut-slice-path", true)
						
						.attr("fill", d => d.data.color)
						.attr("stroke", "white")
						.style("stroke-width", "1px")
						.on("mouseover", function(d) {
							instance.highlightFood(d.data.data, false);
							tooltip.style("opacity", 0.9)
								.html(instance.sliceTooltipRender(d))
								.style("left", (d3.event.pageX + 20) + "px")
								.style("top", (d3.event.pageY - 20) + "px");
						})
						.on("mouseout", d => {
							instance.highlightFood(null, true);
							tooltip.style("opacity", 0);
						})
						// .attr("d", arc)
						.call(enter => enter
							.transition()
							.delay(function(d, i) { return i * 50; })
							.duration(500)
							.attrTween("d", enterTween)
							.each(d => { this._current = d; }) // store the initial angles
							)
							;
				},
				update => {
					update
						.call(update => update
							.transition()
							.duration(500)
							.attrTween("d", arcTween)
							)
							// .attr("d", arc)
						;
				},
				exit => exit.remove()
			)
			;

		

		function arcTween(a) {
			var i = d3.interpolate(this._current, a);
			this._current = i(0);
			return function(t) {
			  return arc(i(t));
			};
		}
	
		function enterTween(b) {
			let i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
			return t => arc(i(t));
		}
	}

	
	
	updateBarGraph() 
	{
		let that = this;
		let barSvg = d3.select('#barSvg');
		
		//index is bar/column number from left to right. Each index contains an array where each slot matches up with the food item in this.menuItems and
		//   values are the top of the bar segment for that food(unscaled)
		let barData = []; 
		
		//calculate bar segment sizes
		for (let nutrientIndex in this.nutrients) {
			let nutrient = this.nutrients[nutrientIndex];
			let nutrientName = nutrient[0];
			let fullValue = nutrient[1];
			barData.push([]);
			
			for (let menuIndex in this.menuItems) {
				let menuItem = this.menuItems[menuIndex];
				let prevVal = menuIndex == 0 ? 0 : barData[nutrientIndex][menuIndex - 1].val;
				let rectHeight = menuItem[0][nutrientName] * menuItem[1] / fullValue * 100; //this is not set to the y-axis scale yet
				barData[nutrientIndex].push({val: prevVal + rectHeight, previous: prevVal, food: menuItem[0], nutrient: nutrientName});
				
			}
		}
		
		
		//find highest bar value to set y-axis
		let barMax = 100; //go up to at least 100
		if (this.menuItems.length > 0) {
			for (let nutrientIndex in this.nutrients) {
				let topValue = barData[nutrientIndex][this.menuItems.length - 1].val;
				if (topValue > barMax) {
					barMax = topValue;
				}
			}
		}
		
		let barScale = d3.scaleLinear()
			.domain([0, barMax])
			.range([this.barChartHeight, 0])
			.nice();
		
		let barAxis = d3.axisLeft();
		barAxis.scale(barScale);
		
		barSvg.select('#barYAxis')
			.transition()
			.duration(500)
			.call(barAxis);
		
		//draw dashed line at 100%
		barSvg.select('#line100')
			.transition()
			.duration(500)
			.attr('transform', 'translate(' + this.barChartmargin.left + ',' + (this.barChartmargin.top + barScale(100)) + ')');
		
		//tooltip
		let tooltip = d3.select("#barTooltip");
		
		//draw the bars
		let barGroups = barSvg.selectAll('g.bar')
			.data(barData)
			.join('g')
			.classed('bar', true)
			.attr('transform', (d,i) => 'translate(' + (this.barChartmargin.left + this.barSpacing + i*(this.barWidth + this.barSpacing)) + ',' + (this.barChartmargin.top + this.barChartHeight) + ') scale (1,-1)');
		
		let bars = barGroups.selectAll('rect')
			.data(d => d)
			.join(
				enter => enter.append('rect')
					.attr('width', this.barWidth)
					.attr('transform', (d,i) => 'translate(0,' + (barScale(0) - (i == 0 ? barScale(0) : barScale(d.previous))) + ')')
					.attr('fill', 'green')
					.attr('stroke', 'black')
					.on('mouseover', d => {
						this.highlightFood(d.food, false);
						tooltip.style("opacity", 0.9)
						   .html(that.barTooltipRender(d))
						   .style("left", (d3.event.pageX + 20) + "px")
						   .style("top", (d3.event.pageY - 20) + "px");
					})
					.on('mouseout', d => {
						this.highlightFood(null, true);
						tooltip.style("opacity", 0);
					})
					.attr('height', 0)
					.attr('opacity', 0)
					.call(enter => enter
						.transition()
						.duration(500)
						.attr('height', (d, i) => barScale(0) - barScale(d.val - d.previous))
						.attr('opacity', 1)
					),
				
				update => update
					.call(update => update
						.transition()
						.duration(500)
						.attr('height', (d, i) => barScale(0) - barScale(d.val - d.previous))
						.attr('transform', (d,i) => 'translate(0,' + (barScale(0) - (i == 0 ? barScale(0) : barScale(d.previous))) + ')')
					),
				
				exit => exit.transition().duration(500)
					.attr('height', 0)
					.attr('opacity', 0)
					.remove()
			);
				
//		bars.attr('width', this.barWidth)
//			.attr('height', (d, i) => barScale(0) - barScale(d.val - d.previous))
//			.attr('transform', (d,i) => 'translate(0,' + (barScale(0) - (i == 0 ? barScale(0) : barScale(d.previous))) + ')')
//			.attr('fill', 'green')
//			.attr('stroke', 'black')
//			.on('mouseover', d => this.highlightBars(d.food, false))
//			.on('mouseout', d => this.highlightBars(null, true));
		
		
	}
	
	//food is the data for the food to highlight. Clear is true if clearing all highlighting, false is highlighting something
	highlightFood(food, clear) {
		this.highlightMenu(food, clear);
		this.highlightPrice(food, clear);
		this.highlightBars(food, clear);
	}
	
	highlightMenu(food, clear) {
		
		if (clear) {
			d3.select('#menu-list').selectAll("li")
				.classed("food-list-item-highlighted", false);
		}
		else {
			d3.select('#menu-list').selectAll("li")
				.classed("food-list-item-highlighted", d => d[0].title == food.title);
		}
	}
	
	highlightPrice(food, clear) {
		if (clear) {
			d3.select('#priceSvg').selectAll('.price-donut-slice-path')
				.classed('priceHighlighted', false);
		}
		else {
			d3.select("#priceSvg").selectAll('.price-donut-slice-path')
				.classed("priceHighlighted", d => {
					return d.data.data.title == food.title;
				})
		}
	}
	
	
	highlightBars(food, clear) {
		if (clear) {
			d3.select('#barSvg').selectAll('g.bar').selectAll('rect')
				.classed('barHighlighted', false);			
		} else {
			d3.select('#barSvg').selectAll('g.bar').selectAll('rect')
				.classed('barHighlighted', d => d.food.title == food.title);
		}
	}
	
	barTooltipRender(data) {
		let text = "<span>" + data.food.title + "</span><br>" 
			+ "<div>"
			+ data.food[data.nutrient] + (data.nutrient == "Calories" ? " KCal" : " g") +"<br>"
			+ (data.val - data.previous).toFixed(2) + "%"
			+ "</div>";
        return text;
	}

	sliceTooltipRender(data) {
		let format = function(d) { return "$" + d3.format(",.2f")(d); };
		let price = format(data.data.data.price * data.data.servings);
		
		let text = "<span>" + data.data.data.title + "</span><br>" 
			+ "<div>"
			+ price
			+ "</div>";
        return text;
	}
	
}