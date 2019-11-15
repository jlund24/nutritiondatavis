// JavaScript Document
d3.json('data/nutrients_and_price1.json').then( data => {
	console.log('data', data);
	this.data = data;
	
	let table = new Table(data);
	let scatterplot = new ScatterPlot(data, table);
	table.saveScatterReference(scatterplot);
	table.createTable();
	table.updateTable();
	table.updateTable();
	let meal_planner = new MealPlanner(data);

});