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
		this.curYIndicator = "Price";
		this.curCIndicator = "Total lipid (fat)";
		
		this.energyMax = d3.max(data, d => d.Energy);
		this.priceMax = d3.max(data, d => d.Price);
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
			'Price' 					  : priceScaleX,
			'Protein' 					  : proteinScaleX,
			'Total lipid (fat)'			  : fatScaleX,
			'Fructose' 					  : sugarScaleX, //**UPDATE Fructose WHEN DATA IS CHANGED**
			'Carbohydrate, by difference' : carbScaleX
		}
		
		this.yScales = 
		{
			'Energy' 					  : energyScaleY,
			'Price' 					  : priceScaleY,
			'Protein' 					  : proteinScaleY,
			'Total lipid (fat)'			  : fatScaleY,
			'Fructose' 					  : sugarScaleY, //**UPDATE Fructose WHEN DATA IS CHANGED**
			'Carbohydrate, by difference' : carbScaleY
		}
		
		this.labels = 
		{
			'Energy' 					  : "CALORIES (DIETARY)",
			'Price' 					  : "PRICE (DOLLARS)",
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
    }

    updateScatterPlot()
    {
        
    }
	
	drawDropDown(xIndicator, yIndicator, circleSizeIndicator) 
	{
	}
}