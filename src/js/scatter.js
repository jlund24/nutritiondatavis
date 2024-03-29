// JavaScript Document
class ScatterPlot {
    constructor(data, table)
    {
        this.data = Object.assign([], data);
        this.tableElements = this.data;
		this.tableRef = table;
		
		this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 700 - this.margin.left - this.margin.right; //700 is the container width
        this.height = 600 - this.margin.top - this.margin.bottom; //container height is 800 but I probably don't need that much

		// variable column names, just in case
		let energyCol = 'Calories';
		let fatCol = 'Fat';
		let proteinCol = 'Protein';
		let sugarCol = 'Sugars';
		let carbCol = 'Carbohydrates'
		let priceCol = 'price';
		
		this.curXIndicator = energyCol;
		this.curYIndicator = priceCol;
		
		this.energyMax = d3.max(data, d => d[energyCol]);
		this.priceMax = d3.max(data, d => d[priceCol]);
		this.proteinMax = d3.max(data, d => d[proteinCol]);
		this.fatMax = d3.max(data, d => d[fatCol]);
		this.sugarMax = d3.max(data, d => d[sugarCol]);
		this.carbMax = d3.max(data, d => d[carbCol]);
		
		//changed to 100 grams but I'm not going to rename everything
		this.energyPerGramMax = d3.max(data, d => d[energyCol] / d.grams_per_serving * 100);
		this.pricePerGramMax = d3.max(data, d => d[priceCol] / d.grams_per_serving * 100);
		this.proteinPerGramMax = d3.max(data, d => d[proteinCol] / d.grams_per_serving * 100);
		this.fatPerGramMax = d3.max(data, d => d[fatCol] / d.grams_per_serving * 100);
		this.sugarPerGramMax = d3.max(data, d => d[sugarCol] / d.grams_per_serving * 100);
		this.carbPerGramMax = d3.max(data, d => d[carbCol] / d.grams_per_serving * 100);
		
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
		this.labels[energyCol] = "Calories (cal)";
		this.labels[priceCol] = "Price (dollars)";
		this.labels[proteinCol] = "Protein (grams)";
		this.labels[fatCol] = "Total Fat (grams)";
		this.labels[sugarCol] = "Total Sugar (grams)";
		this.labels[carbCol] ="Total Carbohydrates (grams)";
		
		this.tooltipLabels = {};
		this.tooltipLabels[energyCol] = "Calories";
		this.tooltipLabels[priceCol] = "Price";
		this.tooltipLabels[proteinCol] = "Protein";
		this.tooltipLabels[fatCol] = "Total Fat";
		this.tooltipLabels[sugarCol] = "Total Sugar";
		this.tooltipLabels[carbCol] = "Total Carbs";
		
		this.perServing = true;
		
		this.createScatterPlot();
		this.drawDropDown(this.curXIndicator, this.curYIndicator);

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
			.attr('id', 'scatterTooltip')
            .style("opacity", 0);
		
		//create svg for the scatterplot
		d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);
		
		//create wrapper group for scatterplot points
		let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true).attr("id", "scatterGroup");
		
		//create brush
		let brushGroup = svgGroup.append('g')
			.classed('brush', true);
		
		brushGroup.append('rect')
			.attr('transform', 'translate(' + (this.margin.left - 10) + ',' + (this.margin.top - 10) + ')')
			.attr('height', this.height + 20)
			.attr('width', this.width + 20)
			.attr('fill', 'none')
			.attr('stroke', 'none');
		
		let brush = d3.brush()
			.extent([[this.margin.left - 10, this.margin.top - 10], [this.margin.left + this.width + 10, this.margin.top + this.height + 10]])
			.on('start', () => {
				if (d3.event.selection)
					that.brushHighlight(d3.event.selection);
			})
			.on('brush', () => {
				if (d3.event.selection)
					that.brushHighlight(d3.event.selection);
			});
		
		brushGroup.call(brush);
		
		//clear brush on click
		d3.select('#food-scatterplot-container')
			.on('click', function() {
				brushGroup.call(brush.move, null);
				that.brushHighlight([[that.margin.left - 10, that.margin.top - 10],[that.margin.left - 10, that.margin.top - 10]])
			});
		
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
				that.updateScatterPlot(that.curXIndicator, that.curYIndicator);
			});
		
		switchDiv.append('span')
			.style("margin-left",  "15px")
			.html('Per 100 Grams');
		
		//draw the initial data
		this.updateScatterPlot(this.curXIndicator, this.curYIndicator);
    }

	//updates all the circles based on the provided xIndicator and yIndicator
    updateScatterPlot(xIndicator, yIndicator)
    {
		let that = this;
		//update global information
		this.curXIndicator = xIndicator;
		this.curYIndicator = yIndicator;
		
		//set scales
		let xAxis = d3.axisBottom();
		xAxis.scale(this.perServing ? this.xScales[xIndicator] : this.xScales_perGram[xIndicator]);
		
		let yAxis = d3.axisLeft();
		yAxis.scale(this.perServing ? this.yScales[yIndicator] : this.yScales_perGram[yIndicator]);
		
		d3.select('#xAxis')
			.transition()
			.duration(1000)
			.call(xAxis);
		
		d3.select('#yAxis')
			.transition()
			.duration(1000)
			.call(yAxis);
		
		d3.select("#xAxisLabel")
			.text(this.labels[xIndicator])
		
		d3.select("#yAxisLabel")
			.text(this.labels[yIndicator])
		
		//the group of all the circles
		let scatterGroup = d3.select('#scatterGroup');
		
		//tooltip
		let tooltip = d3.select("#scatterTooltip");
		
		//update circles
		scatterGroup.selectAll("circle")
			.data(this.data)
			.join(
				enter => enter.append("circle")
							.attr("cx", function (d) { 
								if (d[xIndicator]) {
									return that.perServing ? that.xScales[xIndicator](d[xIndicator]) : that.xScales_perGram[xIndicator](d[xIndicator] / d.grams_per_serving * 100);
								} else return that.xScales[xIndicator](0)}) //should be the same whether per gram or per serving
							.attr("cy", function (d) { 
								if (d[yIndicator]) {
									return that.perServing ? that.yScales[yIndicator](d[yIndicator]) : that.yScales_perGram[yIndicator](d[yIndicator] / d.grams_per_serving * 100);
								} else return that.yScales[yIndicator](0)}) //should be the same whether per gram or per serving
							.attr("r", 10)
							.attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ") scale (1, 1)")
							.attr("class", (d) => d.category)
							.on("mouseover", function (d) {
								tooltip.style("opacity", 0.9)
								   	   .html(that.tooltipRender(d))
								       .style("left", (d3.event.pageX + 20) + "px")
								       .style("top", (d3.event.pageY - 20) + "px");
								that.highlightCircle(d, false);
								that.tableRef.highlightRow(d, false);
							})
							.on("mouseout", function(d) {
								tooltip.style("opacity", 0);
								that.highlightCircle(null, true);
								that.tableRef.highlightRow(null, true);
							}),
			
				update => update
							.transition()
							.duration(1000)
							.attr("cx", function (d) { 
								if (d[xIndicator]) {
									return that.perServing ? that.xScales[xIndicator](d[xIndicator]) : that.xScales_perGram[xIndicator](d[xIndicator] / d.grams_per_serving * 100);
								} else return that.xScales[xIndicator](0)}) //should be the same whether per gram or per serving
							.attr("cy", function (d) { 
								if (d[yIndicator]) {
									return that.perServing ? that.yScales[yIndicator](d[yIndicator]) : that.yScales_perGram[yIndicator](d[yIndicator] / d.grams_per_serving * 100);
								} else return that.yScales[yIndicator](0)}) //should be the same whether per gram or per serving
							.attr("r", 10),
			
				exit => exit.remove()
		
			);
		
		
		
    }
	
	//draws the drop down menus. Only needs to be called once on creation
	drawDropDown(xIndicator, yIndicator) 
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
            that.updateScatterPlot(xValue, yValue);
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
            that.updateScatterPlot(xValue, yValue);
        });
	}
	
	
	//call on hover of the circles to get a tooltip for it
	tooltipRender(data) {
		let x = "";
		let y = "";
		
		if (this.perServing) {
			x = this.tooltipLabels[this.curXIndicator] + ": " + (data[this.curXIndicator] ? data[this.curXIndicator] : "no data");
			y = this.tooltipLabels[this.curYIndicator] + ": " + (data[this.curYIndicator] ? data[this.curYIndicator] : "no data");
		} else {
			x = this.tooltipLabels[this.curXIndicator] + ": " + (data[this.curXIndicator] ? (data[this.curXIndicator] / data.grams_per_serving * 100).toPrecision(4) : "no data");
			y = this.tooltipLabels[this.curYIndicator] + ": " + (data[this.curYIndicator] ? (data[this.curYIndicator] / data.grams_per_serving * 100).toPrecision(4) : "no data");
		}
		
        let text = "<span>" + data.title + "</span><br>" 
			+ "<div>"
			+ x + "<br>"
			+ y
			+ "</div>";
        return text;
    }
	
	highlightCircle(data, clear) {
		if (clear) {
			d3.select('#scatterGroup').selectAll('circle')
				.classed('highlighted', false);
		} else {
			d3.select('#scatterGroup').selectAll('circle')
				.classed('highlighted', d => d.title == data.title);
		}
	}
	
	brushHighlight(extent) {
		
		let circles = d3.select('#scatterGroup').selectAll('circle');
		
		let insideCircles = circles.filter((d,i,c) => {
			let circleX = parseInt(c[i].getAttribute('cx')) + this.margin.left;
			let circleY = parseInt(c[i].getAttribute('cy')) + this.margin.top;
			return circleX >= extent[0][0] && circleX <= extent[1][0] && circleY >= extent[0][1] && circleY <= extent[1][1];
		});
		
		
		if (insideCircles.size() == 0) {
			circles.each((d,i,c) => {
				d3.select(c[i]).classed(d.category, true);
			});
			this.tableRef.followBrush([], true);
			
		} else {
			circles.each((d,i,c) => {
				d3.select(c[i]).classed(d.category, false);
			});
			insideCircles.each((d,i,c) => {
				d3.select(c[i]).classed(d.category, true);
			});
			
			let highlightedData = [];
			insideCircles.each(d => highlightedData.push(d))
			this.tableRef.followBrush(highlightedData, false);
		}
		
	}

	

}