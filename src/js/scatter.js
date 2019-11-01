// JavaScript Document
class ScatterPlot {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;
		
		this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 700 - this.margin.left - this.margin.right; //700 is the container width
        this.height = 500 - this.margin.top - this.margin.bottom; //container height is 800 but I probably don't need that much
		
		this.curXIndicator = "Energy"; //calories
		this.curYIndicator = "price";
		this.curCIndicator = "Total lipid (fat)";
		
		this.energyMax = d3.max(data, d => d.Energy);
		this.priceMax = d3.max(data, d => d.price);
		this.proteinMax = d3.max(data, d => d.Protein);
		this.fatMax = d3.max(data, d => d['Total lipid (fat)']);
		this.sugarMax = d3.max(data, d => d.Fructose); //***UPDATE to 'Sugars, Total NLEA' when data is updated ***
		this.carbMax = d3.max(data, d => d['Carbohydrate, by difference']);
		
		let energyScaleX = d3
			.scaleLinear()
			.domain([0, this.energyMax])
			.range([0, this.width])
			.nice();
		
		let energyScaleY= d3
			.scaleLinear()
			.domain([0, this.energyMax])
			.range([this.height, 0])
			.nice();
		
		let priceScaleX = d3
			.scaleLinear()
			.domain([0, this.priceMax])
			.range([0, this.width])
			.nice();
		
		let priceScaleY= d3
			.scaleLinear()
			.domain([0, this.priceMax])
			.range([this.height, 0])
			.nice();
		
		let proteinScaleX = d3
			.scaleLinear()
			.domain([0, this.proteinMax])
			.range([0, this.width])
			.nice();
		
		let proteinScaleY= d3
			.scaleLinear()
			.domain([0, this.proteinMax])
			.range([this.height, 0])
			.nice();
		
		let fatScaleX = d3
			.scaleLinear()
			.domain([0, this.fatMax])
			.range([0, this.width])
			.nice();
		
		let fatScaleY= d3
			.scaleLinear()
			.domain([0, this.fatMax])
			.range([this.height, 0])
			.nice();
		
		let sugarScaleX = d3
			.scaleLinear()
			.domain([0, this.sugarMax])
			.range([0, this.width])
			.nice();
		
		let sugarScaleY= d3
			.scaleLinear()
			.domain([0, this.sugarMax])
			.range([this.height, 0])
			.nice();
		
		let carbScaleX = d3
			.scaleLinear()
			.domain([0, this.carbMax])
			.range([0, this.width])
			.nice();
		
		let carbScaleY= d3
			.scaleLinear()
			.domain([0, this.carbMax])
			.range([this.height, 0])
			.nice();
		
		this.xScales = 
		{
			'Energy' 					  : energyScaleX,
			'price' 					  : priceScaleX,
			'Protein' 					  : proteinScaleX,
			'Total lipid (fat)'			  : fatScaleX,
			'Fructose' 					  : sugarScaleX, //**UPDATE Fructose WHEN DATA IS CHANGED**
			'Carbohydrate, by difference' : carbScaleX
		}
		
		this.yScales = 
		{
			'Energy' 					  : energyScaleY,
			'price' 					  : priceScaleY,
			'Protein' 					  : proteinScaleY,
			'Total lipid (fat)'			  : fatScaleY,
			'Fructose' 					  : sugarScaleY, //**UPDATE Fructose WHEN DATA IS CHANGED**
			'Carbohydrate, by difference' : carbScaleY
		}
		
		this.labels = 
		{
			'Energy' 					  : "CALORIES (DIETARY)",
			'price' 					  : "PRICE (DOLLARS)",
			'Protein' 					  : "PROTEIN (GRAMS)",
			'Total lipid (fat)'			  : "TOTAL FAT (GRAMS)",
			'Fructose' 					  : "TOTAL SUGAR (GRAMS)", //**UPDATE Fructose WHEN DATA IS CHANGED**
			'Carbohydrate, by difference' : "TOTAL CARBOHYDRATES (GRAMS)"
		}
		
		this.createScatterPlot();

    }

    createScatterPlot()
    {
        console.log('create scatterplot');
		
		//create chart-view div
		let v = d3.select("#food-scatterplot-container")
			.append('div').attr('id', 'chart-view');
	//create tooltip
//		d3.select('#chart-view')
//            .append('div')
//            .attr("class", "tooltip")
//            .style("opacity", 0);
		
		//create svg for the scatterplot
		d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);
		
		//create wrapper group for scatterplot points
		let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true).attr("id", "scatterGroup");
		
		//create x-Axis
		let xAxis = d3.axisBottom();
		xAxis.scale(this.xScales[this.curXIndicator]);
		
		//draw x-Axis
		svgGroup.append('g')
			.attr("id", "xAxis")
			.classed("axis", true)
			.attr("transform", "translate(" + this.margin.left + "," + (this.height + this.margin.top) + ") scale (1, 1)")
			.call(xAxis);
		
		//create y-Axis
		let yAxis = d3.axisLeft();
		yAxis.scale(this.yScales[this.curYIndicator]);
		
		//draw y-Axis
		svgGroup.append('g')
			.attr("id", "yAxis")
			.classed("axis", true)
			.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ") scale (1, 1)")
			.call(yAxis);
		
		//add x-Axis label
		svgGroup.append("text")
			.attr("id", "xAxisLabel")
			.classed("axis-label", true)
			.attr("transform", "translate(" + ((this.width / 2) + this.margin.left) + "," + (this.height + this.margin.top + 40) + ")")
			.text(this.labels[this.curXIndicator]);
		
		//add y-Axis label
		svgGroup.append("text")
			.attr("id", "yAxisLabel")
			.classed("axis-label", true)
			.attr("transform", "translate(20" + "," + ((this.height / 2) + this.margin.top) + ") rotate (-90)")
			.text(this.labels[this.curYIndicator]);
		
		//add tooltip
		svgGroup.append("div")
			.attr("id", "circleTooltip")
			.classed("tooltip", true)
			.style("opacity", 0);

    }

    updateScatterPlot()
    {
        
    }
	
	drawDropDown(xIndicator, yIndicator, circleSizeIndicator) 
	{
	}
}