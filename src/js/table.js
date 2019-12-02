// JavaScript Document


class Table {
    constructor(data, valuedata)
    {
        this.data = data;
        this.tableElements = data;
        this.recommendedValues = valuedata;
		
		this.scatterRef = null;

        this.width = 775;
        this.height = 800;

        // variable column names, just in case
        let energyCol = 'Calories';
        let fatCol = 'Fat';
        let proteinCol = 'Protein';
        let sugarCol = 'Sugars';
        let carbCol = 'Carbohydrates'
        let priceCol = 'price';

        this.columnData = {
            food_title : {
                "title": "food",
                "id": "food-title",
                "sort": (first, second) => first.title <= second.title ? -1 : 1
            },
            serving_size: {
                "title": "serving size",
                "id": "serving-size",
                "visData" : {
                    type: "text",
                    value: d => `${d.serving}`,
                    color: _ => ""
                },
                "sort": (first, second) => first.serving <= second.serving ? -1 : 1
            },
            calories : {
                "title": "calories",
                "unit": "cal",
                "id": "calories",
                "visData" : {
                    type: "donut",
                    value: d => d[energyCol],
                    totalValue: _ => 2400, 
                },
                "sort": (first, second) => first[energyCol] <= second[energyCol] ? -1 : 1 
            },
            carbs : {
                "title": "total carbs",
                "unit": "grams",
                "id": "total-carbs",
                "visData" : {
                    type: "donut",
                    value: d => d[carbCol],
                    totalValue: _ => 130,
                },
                "sort": (first, second) => first[carbCol] 
                    <= second[carbCol] ? -1 : 1 
            },
            protein : {
                "title": "protein",
                "unit": "grams",
                "id": "protein",
                "visData" : {
                    type: "donut",
                    value: d => d[proteinCol],
                    totalValue: _ => 56
                },
                "sort": (first, second) => first[proteinCol] <= second[proteinCol] ? -1 : 1 
            },
            fat : {
                "title": "total fat",
                "unit": "grams",
                "id": "total-fat",
                "visData" : {
                    type: "donut",
                    value: d => d[fatCol],
                    totalValue: _ => 93
                },
                "sort" : (first, second) => first[fatCol] <= second[fatCol] ? -1 : 1
                
                //max val is 35% kcal. I got 93 by taking 
                // number of calories * %kcal / num calories per g of fat
                // maxVal = 2400 * .35 / 9 = 93
            },
            sugar : {
                "title": "total sugar",
                "unit": "grams",
                "id": "total-sugar",
                "maxValue": 10,
                "visData" : {
                    type: "donut",
                    value: d => d[sugarCol] ? d[sugarCol] : 0,
                    totalValue: _ => 60
                },
                "sort" : (first, second) => (first[sugarCol] ? first[sugarCol] : 0) <= (second[sugarCol] ? second[sugarCol] : 0) ? -1 : 1
                //max val is 10% kcal
                //num_calories * %kcal / num calories per g of sugar
                //maxVal = 2400 * .1 / 4 = 60
            },
            price : {
                "title": "price",
                "unit": "dollars",
                "id": "price",
                "visData" : {
                    type: "text",
                    value: d => `$${d.price.toFixed(2)}`,
                    color: _ => ""
                },
                "sort" : (first, second) => first[priceCol] <= second[priceCol] ? -1 : 1
            },
        };

        this.selectedColumns = [
            this.columnData["calories"],
            this.columnData["carbs"],
            this.columnData["protein"],
            this.columnData["fat"],
            this.columnData["sugar"],
            this.columnData["price"]
            ];

        this.sortedBy = null;
    }

    sortByColumn(d, instance, selection)
    {
        let direction = null;
        if (instance.sortedBy === d.id)
        {
            instance.tableElements = instance.tableElements.reverse();
            instance.sortedBy = null;
            direction = "down";
        }
        else
        {
            instance.tableElements = instance.tableElements.sort( d.sort );
            instance.sortedBy = d.id;
            direction = "up";
        }

        instance.updateTable();
        instance.showSortIcon(selection, direction);
    }

    showSortIcon(selection, direction)
    {
        // hide any currently showing icons
        d3.selectAll('.sort-icon')
            .classed("hidden", true);

        // show the correct one
        d3.select(selection)
            .select(`.sorted-${direction}-icon`)
            .classed("hidden", false);
    }
	
	saveScatterReference(scatter) {
		this.scatterRef = scatter;
	}

    createTable()
    {
        d3.select("#food-table-container")
            .append("table")
            .attr("id", "food-table");

        // add header row
        let headerRow = d3.select("#food-table")
            .append("thead")
            .append("tr")
                .attr("id", "header-row-container");

        let instance = this;

        headerRow.selectAll("th")
            .data([this.columnData.food_title])
                .join("th")
                    .attr("id", d => `${d.id}-header`)
                    .on("click", function(d) {
                        instance.sortByColumn(d, instance, this);
                    })
                    .selectAll(".header-cell-container")
                    .data(d => [d])
                    .join("div")
                        .classed("header-cell-container", true)
                        .selectAll(".header-title-container")
                        .data(d => [d])
                        .join("div")
                            .classed("header-title-container", true)
                                .selectAll(".header-line-1")
                                .data(d => [d])
                                    .join("p")
                                        .classed("header-line-1", true)
                                        .text(d => d.title); 
        
        // add sort icons and then hide them for use later
        d3.selectAll(".header-cell-container")
            .selectAll(".sorted-down-icon")
            .data(d => [d])
            .join("img")
                .classed("sort-icon sorted-down-icon hidden", true)
                    .attr('src', `src/assets/arrow_down.svg`)
                    ;

        d3.selectAll(".header-cell-container")
            .selectAll(".sorted-up-icon")
            .data(d => [d])
            .join("img")
                .classed("sort-icon sorted-up-icon hidden", true)
                    .attr('src', `src/assets/arrow_up.svg`);


        d3.select("#food-table")
            .append("tbody");
    }

    updateTable()
    {
        let instance = this;
        //bind data to columns
        d3.select("#header-row-container")
            .selectAll(".header-row")
            .data(this.selectedColumns)
            .join("th")
                .classed("header-row", true)
                .attr("id", d => `${d.id}-header`)
                .on("click", function(d) {
                    instance.sortByColumn(d, instance, this);
                })
                .selectAll(".header-cell-container")
                .data(d => [d])
                .join("div")
                    .classed("header-cell-container", true)
                    .selectAll(".header-title-container")
                    .data(d => [d])
                    .join("div")
                        .classed("header-title-container", true)
                        .selectAll(".header-line-1")
                        .data(d => [d])
                        .join("p")
                            .classed("header-line-1", true)
                            .text(d => d.title);

        //add header units
        d3.selectAll(".header-title-container")
            .selectAll(".header-line-2")
            .data(d => [d])
            .join("p")
                .classed("header-line-2", true)
                .text(d => {
                    if ("unit" in d)
                    {
                        if ("totalValue" in d.visData)
                        {
                            return d.visData.totalValue() + " " + d.unit;
                        }
                        else
                        {
                            return d.unit;
                        }
                    }
                    else
                    {
                        return "";
                    }
                    
                });

        //add sort icons
        d3.selectAll(".header-cell-container")
            .selectAll(".sorted-down-icon")
            .data(d => [d])
            .join("img")
                .classed("sort-icon sorted-down-icon hidden", true)
                    .attr('src', `src/assets/arrow_down.svg`);

        d3.selectAll(".header-cell-container")
            .selectAll(".sorted-up-icon")
            .data(d => [d])
            .join("img")
                .classed("sort-icon sorted-up-icon hidden", true)
                    .attr('src', `src/assets/arrow_up.svg`);
        
        // bind data to rows
        let rows = d3.select("#food-table tbody")
            .selectAll(".body-row")
                .data(this.tableElements);

        rows.join("tr")
            .classed("body-row", true)
            .classed("highlightTableRow", true)
            .on("mouseover", function(d) {
                d3.select(this)
                    .selectAll("td")
                    .classed("highlightTableRow", true);

                d3.select(this)
                    .selectAll("th")
                    .classed("highlightTableRow", true);
                instance.scatterRef.highlightCircle(d, false);
            })
            .on("mouseout", function(d) {
                d3.selectAll("td")
                    .classed("highlightTableRow", false);

                d3.selectAll("th")
                    .classed("highlightTableRow", false);

                instance.scatterRef.highlightCircle(null, true);

            })
            .selectAll(".food-title-cell")
                .data(d => [d])
                .join("th")
                    .classed("first-col-cell", true)
                    .classed("food-title-cell", true)
                    ;
                    
        d3.selectAll(".food-title-cell")
            .selectAll(".food-title-image")
            .data(d => [d])
                .join('img')
                .classed("food-title-image", true)
                .attr('src', d => ("icon_name" in d && d.icon_name != null) ? `src/assets/${d.icon_name}.svg` : "")
                .attr("width", d => ("icon_name" in d && d.icon_name != null) ? 30 : 30)
                .attr("height", d => ("icon_name" in d && d.icon_name != null) ? 30 : 30);   
                    
        d3.selectAll(".food-title-cell")
            .selectAll(".food-title-text-container")
            .data(d => [d])
            .join("div")
                .classed("food-title-text-container", true)
                    .selectAll(".food-title-text")
                        .data(d => [d])
                        .join("p")
                            .attr("class", d => d.category)
                            .classed("food-title-text", true)
                            .text(d => d.title);
      

        d3.selectAll(".food-title-text-container")
            .selectAll(".food-serving-size")
            .data(d => [d])
                .join("text")
                .classed("food-serving-size", true)
                .text(d => d.serving);

        let td = d3.selectAll(".body-row")
            .selectAll("td")  
            .data((d) => {
                let rowData = [];
                this.selectedColumns.forEach(column => {
                    // d is the rowData
                    let combinedCellData = {
                        columnData: column.visData,
                        units: column.unit,
                        rowData: d
                    }
                    rowData.push(combinedCellData);
                });
                return rowData;
            });

        td.join("td")
            .classed("cell", true);
        
        let donutCells = d3.selectAll(".cell").filter((d) => {
            return d.columnData.type == "donut";
        });
        
        this.updateDonutCells(donutCells);

        let textCells = d3.selectAll(".cell").filter((d) => {
            return d.columnData.type == "text";
        });

        this.updateTextCells(textCells);

    }


    updateDonutCells(donutCells)
    {
        let svgWidth = 90;
        let svgHeight = 60;
        
        let radius = svgHeight / 2;
        let arc = d3.arc()
            .innerRadius(radius * .75)
            .outerRadius(radius);

        let pie = d3.pie();
        pie.value(d => d.share)
            .sort(null);
         
        donutCells
            .selectAll(".donut-svg")
            .data(d => [d])
            .join("svg")
                .classed("donut-svg", true)
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .selectAll(".donut-group")
                .data(d => [d])
                .join("g")
                    .classed("donut-group", true)
                    .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

        d3.selectAll(".donut-group")
            .selectAll(".slice-group")
            .data(d => {
                let value = d.columnData.value(d.rowData);
                let totalValue = d.columnData.totalValue(d.rowData);

                let pieData = [
                    {
                        share: value / totalValue,
                        color: "#2E4B7C"
                    },
                    {
                        share: (totalValue - value) / totalValue,
                        color: "lightgray"
                    },
                ];
                return pie(pieData);
            })
            .join("g")
            .classed("slice-group", true)
            .selectAll(".slice-path")
                .data(d => [d])
                .join("path")
                    .classed("slice-path", true)
                    .attr("d", arc)
                    .style("fill", d => d.data.color)
                ;

        donutCells.selectAll(".donut-svg")
            .selectAll(".donut-label-group")
            .data(d => [d])
            .join("g")
                .classed("donut-label-group", true)
                .selectAll(".donut-label")
                .data(d => [d])
                .join("text")
                    .classed("donut-label", true)
                    .text(d => +d.columnData.value(d.rowData).toFixed(2))
                    .attr("transform", "translate(" + svgWidth / 2 + "," + ((svgHeight / 2) + 5) + ")")
                    .attr("text-anchor", "middle")
                    ;

    }

    updateTextCells(textCells)
    {
        textCells
            .selectAll("text")
                .data(d => [d])
                .join("text")
                    .text(d => {
                        return ellipsizeText(d.columnData.value(d.rowData));
                    })
                    .attr("class", d => d.columnData.color(d.rowData));

    }
	
	highlightRow(food, clear) {
        if (clear) {
            d3.select('#food-table')
                .selectAll("td")
                    .classed("highlightTableRow", false);
                    
            d3.select('#food-table')
                .selectAll("th")
                    .classed("highlightTableRow", false);
        }
        else {

            let row = d3.select("#food-table")
                .selectAll("tr")
                .filter(function(d) {
                    
                    return d ? d.title == food.title : false;
                });

            row
                .selectAll("td")
                    .classed("highlightTableRow", true);
                    
            row
                .selectAll("th")
                    .classed("highlightTableRow", true);
            
            if (row.data()[0] != undefined)
            {
                this.scrollToFood(row.data()[0].title);
            }
            
        }
    }
	
	followBrush(brushedData, showAll) {
		this.tableElements = showAll ? this.data : brushedData;
		this.updateTable();
	}


    updateDailyValues() {
        let currAge = d3.select("#ageSelect").node().value;
        let currSex = d3.select("#sexSelect").node().value;
        let currHeight = d3.select("#heightSelect").node().value;
        let currWeight = d3.select("#weightSelect").node().value;

        let currRow = this.recommendedValues
            .filter(d => d.age == currAge)
            .filter(d => d.sex == currSex)
            .filter(d => d.height == currHeight)
            .filter(d => d.weight == currWeight);

        this.columnData.calories.visData.totalValue = _ => currRow[0].calories;
        this.columnData.carbs.visData.totalValue = _ => currRow[0].grams_of_carbs;
        this.columnData.protein.visData.totalValue = _ => currRow[0].grams_of_protein;
        this.columnData.fat.visData.totalValue = _ => currRow[0].grams_of_fat;

        this.updateTable();
    }

    scrollToFood(food) {
        let rows = document.querySelectorAll('#food-table tr');

        let index = this.tableElements.findIndex(function(currentValue, index, arr) {
            return currentValue.title == food;
        });
        
        index = index == 0 ? 1 : index;
        let target = rows[index];
        
        target.parentNode.scrollTop = target.offsetTop;
    }

    
}

function ellipsizeText(text)
{
    let ending = "...";
    let maxLength = 35;
    if (text.length > maxLength)
    {
        text = text.substring(0, maxLength - ending.length) + ending;
    }

    return text;
}