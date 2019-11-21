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
	
	//set up controls container
	let controls = d3.select('#controls');
	let controlsSvg = controls.append('svg')
		.attr('width', '100%')
		.attr('height', '100%');
	
	//draw legend
	controlsSvg.append('rect')
		.attr('transform', 'translate(680, 5)')
		.attr('height', 90)
		.attr('width', 265)
		.attr('rx', 12)
		.attr('ry', 12)
		.style('stroke', 'black')
		.style('stroke-width', '1px')
		.style('fill', 'none')
	
	let legendData = ["Vegetable", "Fruit", "Protein", "Dairy", "Grain", "Dessert", "Compound"];
	let legendItems = controlsSvg.selectAll('g.legendItem')
		.data(legendData)
		.join('g')
		.classed('legendItem', true)
		.attr('transform', (d,i) => 'translate(' + (700 + (i >= 4 ? 120 : 0)) + ',' + (15 + (i%4 * 20)) +')');
	
	let rects = legendItems.append('rect')
		.attr('height', 10)
		.attr('width', 20);
	
	rects.each((d,i,c) => {
		d3.select(c[i]).classed(d.toLowerCase(), true);
	})
	
	legendItems.append('text')
		.text(d => d)
		.attr('transform', 'translate(30, 10)');
		
	

});