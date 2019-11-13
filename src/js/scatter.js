// JavaScript Document
class ScatterPlot {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;
		
		this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 700 - this.margin.left - this.margin.right; //700 is the container width
        this.height = 600 - this.margin.top - this.margin.bottom; //container height is 800 but I probably don't need that much
		
		this.circleMinR = 3;
		this.circleMaxR = 20;

		// variable column names, just in case
		let energyCol = 'Calories';
		let fatCol = 'Fat';
		let proteinCol = 'Protein';
		let sugarCol = 'Sugars';
		let carbCol = 'Carbohydrates'
		let priceCol = 'price';
		
		this.curXIndicator = energyCol;
		this.curYIndicator = priceCol;
		this.curCIndicator = fatCol;
		
		this.energyMax = d3.max(data, d => d[energyCol]);
		this.priceMax = d3.max(data, d => d[priceCol]);
		this.proteinMax = d3.max(data, d => d[proteinCol]);
		this.fatMax = d3.max(data, d => d[fatCol]);
		this.sugarMax = d3.max(data, d => d[sugarCol]);
		this.carbMax = d3.max(data, d => d[carbCol]);
		
		this.energyPerGramMax = d3.max(data, d => d[energyCol] / d.grams_per_serving);
		this.pricePerGramMax = d3.max(data, d => d[priceCol] / d.grams_per_serving);
		this.proteinPerGramMax = d3.max(data, d => d[proteinCol] / d.grams_per_serving);
		this.fatPerGramMax = d3.max(data, d => d[fatCol] / d.grams_per_serving);
		this.sugarPerGramMax = d3.max(data, d => [sugarCol] / d.grams_per_serving);
		this.carbPerGramMax = d3.max(data, d => d[carbCol] / d.grams_per_serving);
		
		//energy scales
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
		
		let energyPerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.energyPerGramMax])
			.range([0, this.width])
			.nice();
		
		let energyPerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.energyPerGramMax])
			.range([this.height, 0])
			.nice();
		
		//price scales
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
		
		let pricePerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.pricePerGramMax])
			.range([0, this.width])
			.nice();
		
		let pricePerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.pricePerGramMax])
			.range([this.height, 0])
			.nice();
		
		//protein scales
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
		
		let proteinPerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.proteinPerGramMax])
			.range([0, this.width])
			.nice();
		
		let proteinPerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.proteinPerGramMax])
			.range([this.height, 0])
			.nice();
		
		//fat scales
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
		
		let fatPerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.fatPerGramMax])
			.range([0, this.width])
			.nice();
		
		let fatPerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.fatPerGramMax])
			.range([this.height, 0])
			.nice();
		
		//sugar scales
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
		
		let sugarPerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.sugarPerGramMax])
			.range([0, this.width])
			.nice();
		
		let sugarPerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.sugarPerGramMax])
			.range([this.height, 0])
			.nice();
		
		//carb scales
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
		
		let carbPerGramScaleX = d3
			.scaleLinear()
			.domain([0, this.carbPerGramMax])
			.range([0, this.width])
			.nice();
		
		let carbPerGramScaleY= d3
			.scaleLinear()
			.domain([0, this.carbPerGramMax])
			.range([this.height, 0])
			.nice();
		
		this.xScales = {};
		this.xScales[energyCol] = energyScaleX;
		this.xScales[priceCol] = priceScaleX;
		this.xScales[proteinCol] = proteinScaleX;
		this.xScales[fatCol] = fatScaleX;
		this.xScales[sugarCol] = sugarScaleX;
		this.xScales[carbCol] = carbScaleX;


		this.yScales = {};
		this.yScales[energyCol] = energyScaleY;
		this.yScales[priceCol] = priceScaleY;
		this.yScales[proteinCol] = proteinScaleY;
		this.yScales[fatCol] = fatScaleY;
		this.yScales[sugarCol] = sugarScaleY;
		this.yScales[carbCol] = carbScaleY;
		

		this.xScales_perGram = {};
		this.xScales_perGram[energyCol] = energyPerGramScaleX;
		this.xScales_perGram[priceCol] = pricePerGramScaleX;
		this.xScales_perGram[proteinCol] = proteinPerGramScaleX;
		this.xScales_perGram[fatCol] = fatPerGramScaleX;
		this.xScales_perGram[sugarCol] = sugarPerGramScaleX;
		this.xScales_perGram[carbCol] = carbPerGramScaleX;


		this.yScales_perGram = {};
		this.yScales_perGram[energyCol] = energyPerGramScaleY;
		this.yScales_perGram[priceCol] = pricePerGramScaleY;
		this.yScales_perGram[proteinCol] = proteinPerGramScaleY;
		this.yScales_perGram[fatCol] = fatPerGramScaleY;
		this.yScales_perGram[sugarCol] = sugarPerGramScaleY;
		this.yScales_perGram[carbCol] = carbPerGramScaleY;
		

		
		this.labels = {};
		this.labels[energyCol] = "CALORIES (DIETARY)";
		this.labels[priceCol] = "PRICE (DOLLARS)";
		this.labels[proteinCol] = "PROTEIN (GRAMS)";
		this.labels[fatCol] = "TOTAL FAT (GRAMS)";
		this.labels[sugarCol] = "TOTAL SUGAR (GRAMS)";
		this.labels[carbCol] ="TOTAL CARBOHYDRATES (GRAMS)";
		
		this.tooltipLabels = {};
		this.tooltipLabels[energyCol] = "Calories";
		this.tooltipLabels[priceCol] = "Price";
		this.tooltipLabels[proteinCol] = "Protein";
		this.tooltipLabels[fatCol] = "Total Fat";
		this.tooltipLabels[sugarCol] = "Total Sugar";
		this.tooltipLabels[carbCol] = "Total Carbs";
		
		this.perServing = true;
		
		this.createScatterPlot();
		this.drawDropDown(this.curXIndicator, this.curYIndicator, this.curCIndicator);

    }

    createScatterPlot()
    {
		let that = this;
		
		//create chart-view div
		let v = d3.select("#food-scatterplot-container")
			.append('div').attr('id', 'chart-view');
	
		//create tooltip
		d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);
		
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
			.attr("transform", "translate(35" + "," + ((this.height / 2) + this.margin.top) + ") rotate (-90)")
			.text(this.labels[this.curYIndicator]);
		

		//Create dropdowns for selecting axis data
 		let dropdownWrap = d3.select('#chart-view').append('div').classed('dropdown-wrapper', true);

        let cWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        cWrap.append('div').classed('c-label', true)
            .append('text')
            .text('Circle Size');

        cWrap.append('div').attr('id', 'dropdown_c').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let xWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        xWrap.append('div').classed('x-label', true)
            .append('text')
            .text('X Axis Data');

        xWrap.append('div').attr('id', 'dropdown_x').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let yWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        yWrap.append('div').classed('y-label', true)
            .append('text')
            .text('Y Axis Data');

        yWrap.append('div').attr('id', 'dropdown_y').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

		
		//draw the circle legend
        d3.select('#chart-view')
            .append('div')
            .classed('circle-legend', true)
            .append('svg')
            .append('g')
            .attr('transform', 'translate(10, 0)');
		
		//draw the per serving/per gram switch
		let switchDiv = d3.select('#chart-view')
			.append('div')
			.attr('id', 'switchDiv');
		
		switchDiv.append('span')
			.style("margin-right",  "15px")
			.html('Per Serving');
		
		switchDiv.append('input')
			.classed('toggle', true)
			.attr('id', 'serving_gram_switch')
			.attr('type', 'checkbox')
			.on('click', function() { 
				that.perServing = !this.checked;
				that.updateScatterPlot(that.curXIndicator, that.curYIndicator, that.curCIndicator);
			});
		
		switchDiv.append('span')
			.style("margin-left",  "15px")
			.html('Per Gram');
		
		//draw the initial data
		this.updateScatterPlot(this.curXIndicator, this.curYIndicator, this.curCIndicator);
    }

	//updates all the circles based on the provided xIndicator, yIndicator, and circle size Indicator
    updateScatterPlot(xIndicator, yIndicator, circleSizeIndicator)
    {
		let that = this;
		//update global information
		this.curXIndicator = xIndicator;
		this.curYIndicator = yIndicator;
		this.curCIndicator = circleSizeIndicator;
		
		//draw the circle size legend
		let maxSize = 0;
		let minSize = Number.MAX_SAFE_INTEGER;
		for (let food of this.tableElements) {
			let val = this.perServing ? food[circleSizeIndicator] : food[circleSizeIndicator] / food.grams_per_serving;
			if (val > maxSize) {
				maxSize = val;
			}
			if (val < minSize) {
				minSize = val;
			}
		}
		
        let circleSizer = function(d) {
            let cScale = d3.scaleSqrt().range([that.circleMinR, that.circleMaxR]).domain([minSize, maxSize]);
			if (d[that.curCIndicator]) {
				return that.perServing ? cScale(d[that.curCIndicator]) : cScale(d[that.curCIndicator] / d.grams_per_serving);
			} else {
				return that.circleMinR;
			}
        };
		
		this.drawLegend(minSize, maxSize);
		
		//set scales
		let xAxis = d3.axisBottom();
		xAxis.scale(this.perServing ? this.xScales[xIndicator] : this.xScales_perGram[xIndicator]);
		
		let yAxis = d3.axisLeft();
		yAxis.scale(this.perServing ? this.yScales[yIndicator] : this.yScales_perGram[yIndicator]);
		
		d3.select('#xAxis')
			.call(xAxis);
		
		d3.select('#yAxis')
			.call(yAxis);
		
		d3.select("#xAxisLabel")
			.text(this.labels[xIndicator])
		
		d3.select("#yAxisLabel")
			.text(this.labels[yIndicator])
		
		//the group of all the circles
		let scatterGroup = d3.select('#scatterGroup');
		
		//tooltip
		let tooltip = d3.select(".tooltip");
		
		//update circles
		scatterGroup.selectAll("circle")
			.data(this.tableElements)
			.join(
				enter => enter.append("circle")
//							.attr("id", (d) => d.id)
							.attr("cx", function (d) { 
								if (d[xIndicator]) {
									return that.perServing ? that.xScales[xIndicator](d[xIndicator]) : that.xScales_perGram[xIndicator](d[xIndicator] / d.grams_per_serving);
								} else return that.xScales[xIndicator](0)}) //should be the same whether per gram or per serving
							.attr("cy", function (d) { 
								if (d[yIndicator]) {
									return that.perServing ? that.yScales[yIndicator](d[yIndicator]) : that.yScales_perGram[yIndicator](d[yIndicator] / d.grams_per_serving);
								} else return that.yScales[yIndicator](0)}) //should be the same whether per gram or per serving
							.attr("r", (d) => circleSizer(d))
							.attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ") scale (1, 1)")
							.attr("class", (d) => d.category)
							.on("mouseover", function (d) { //ALSO HIGHLIGHT THE CIRCLE BY INCREASING STROKE WIDTH, AND HIGHLIGHT ROW IN TABLE
								tooltip.style("opacity", 0.9)
								   	   .html(that.tooltipRender(d))
								       .style("left", (d3.event.pageX) + "px")
								       .style("top", (d3.event.pageY - 20) + "px");
							})
							.on("mouseout", function(d) {
								tooltip.style("opacity", 0);
							})
							/*.on("click", function(d) {
								//can call a function for interactivity
							})*/,
			
				update => update
//							.attr("id", (d) => d.id)
//							.attr("class", (d) => d.region)
							.transition()
							.duration(1000)
							.attr("cx", function (d) { 
								if (d[xIndicator]) {
									return that.perServing ? that.xScales[xIndicator](d[xIndicator]) : that.xScales_perGram[xIndicator](d[xIndicator] / d.grams_per_serving);
								} else return that.xScales[xIndicator](0)}) //should be the same whether per gram or per serving
							.attr("cy", function (d) { 
								if (d[yIndicator]) {
									return that.perServing ? that.yScales[yIndicator](d[yIndicator]) : that.yScales_perGram[yIndicator](d[yIndicator] / d.grams_per_serving);
								} else return that.yScales[yIndicator](0)}) //should be the same whether per gram or per serving
							.attr("r", (d) => circleSizer(d)),
			
				exit => exit.remove()
		
			);
		
		
		
    }
	
	//draws the drop down menus. Only needs to be called once on creation
	drawDropDown(xIndicator, yIndicator, circleSizeIndicator) 
	{
		let that = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = [];

        for (let key in this.labels) {
            dropData.push({
                indicator: key,
                indicator_name: this.tooltipLabels[key]
            });
        }

        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);


        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsCEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d.indicator === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function(d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            that.updateScatterPlot(xValue, yValue, cValue);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsXEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d.indicator === xIndicator)
            .attr('selected', true);

        dropX.on('change', function(d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            that.updateScatterPlot(xValue, yValue, cValue);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text((d, i) => d.indicator_name);

        let selectedY = optionsY.filter(d => d.indicator === yIndicator)
            .attr('selected', true);

        dropY.on('change', function(d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            that.updateScatterPlot(xValue, yValue, cValue);
        });
	}
	
	//draws the circle size legend. Call every time the circle size indicator changes
	//min is the smallest circle radius; max is the largest circle radius
	drawLegend(min, max) {
        let scale = d3.scaleSqrt().range([this.circleMinR, this.circleMaxR]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(-12, 40)');
    }
	
	//call on hover of the circles to get a tooltip for it
	tooltipRender(data) {
		let x = "";
		let y = "";
		let c = "";
		
		if (this.perServing) {
			x = this.tooltipLabels[this.curXIndicator] + ": " + (data[this.curXIndicator] ? data[this.curXIndicator] : "no data");
			y = this.tooltipLabels[this.curYIndicator] + ": " + (data[this.curYIndicator] ? data[this.curYIndicator] : "no data");
			c = this.tooltipLabels[this.curCIndicator] + ": " + (data[this.curCIndicator] ? data[this.curCIndicator] : "no data");
		} else {
			x = this.tooltipLabels[this.curXIndicator] + ": " + (data[this.curXIndicator] ? (data[this.curXIndicator] / data.grams_per_serving).toPrecision(4) : "no data");
			y = this.tooltipLabels[this.curYIndicator] + ": " + (data[this.curYIndicator] ? (data[this.curYIndicator] / data.grams_per_serving).toPrecision(4) : "no data");
			c = this.tooltipLabels[this.curCIndicator] + ": " + (data[this.curCIndicator] ? (data[this.curCIndicator] / data.grams_per_serving).toPrecision(4) : "no data");
		}
		
        let text = "<span>" + data.title + "</span><br>" 
			+ "<div>"
			+ x + "<br>"
			+ y + "<br>"
			+ c
			+ "</div>";
        return text;
    }
	

}