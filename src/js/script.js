// JavaScript Document
d3.json('data/nutrients_and_price1.json').then( data => {
	console.log('data', data);
	this.data = data;
	
	let table = new Table(data);
	table.createTable();
	table.updateTable();
	table.updateTable();
	let scatterplot = new ScatterPlot(data);
	let meal_planner = new MealPlanner(data);

});