// JavaScript Document


class Table {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;

        this.width = 775;
        this.height = 800;

        this.columnData = {
            food_title : {
                "title": "food",
                "id": "food-title"
            },
            serving_size: {
                "title": "serving size",
                "id": "serving-size",
                // "vis" : "text",
                "visData" : {
                    type: "text",
                    value: d => `${d.portion_amount} ${d.serving}`,
                }
            },
            food_group : {
                "title": "food group",
                "id": "food-group",
                "visData" : {
                    type: "text",
                    //TODO: fix this
                    value: d => d.food_category_id,
                    //TODO: fix this
                    color: d => d.food_category_id
                }
            },
            calories : {
                "title": "calories",
                "unit": "cal",
                "id": "calories",
                "visData" : {
                    type: "donut",
                    value: d => d["Energy"],
                    totalValue: d => 2400, 
                }
                
            },
            carbs : {
                "title": "total carbs",
                "unit": "grams",
                "id": "total-carbs",
                "vis" : "donut",
                "maxValue" : 130
            },
            protein : {
                "title": "protein",
                "unit": "grams",
                "id": "protein",
                "vis": "donut",
                "maxValue" : 56
            },
            fat : {
                "title": "total fat",
                "unit": "grams",
                "id": "total-fat",
                "vis": "donut",
                "maxValue": 35
                //in % kcal
            },
            sugar : {
                "title": "total sugar",
                "unit": "grams",
                "id": "total-sugar",
                "maxValue": 10,
                //in % kcal
            },
            price : {
                "title": "price",
                "unit": "dollars",
                "id": "price",
                "vis": "text"
            },
        };

        this.selectedColumns = [this.columnData["serving_size"],
                                this.columnData["food_group"],
                                this.columnData["calories"]
                            ];
    }

    createTable()
    {
        d3.select("#food-table-container")
            .append("table")
            .attr("id", "food-table");

        // add header row
        d3.select("#food-table")
            .append("thead")
            .append("tr")
            .selectAll("th")
            .data([this.columnData.food_title, ...this.selectedColumns])
                .join("th")
                .classed("header-row", true)
                .attr("id", d => `${d.id}-header`)
                    .append("p")
                        .classed("header-line-1", true)
                        .text(d => d.title); 
        
        
        d3.select("#food-title-header")
            .classed("header-row", false);

        // add header units
        d3.selectAll("#food-table th")
            .append("p")
                .classed("header-line-2", true)
                .text(d => ("unit" in d) ? d.unit : "");

        d3.select("#food-table")
            .append("tbody");
    }

    updateTable()
    {
        // bind data to rows
        let rows = d3.select("#food-table tbody")
            .selectAll(".row")
                .data(this.tableElements);

        // console.log("table elements");
        // console.log(this.tableElements);
        rows.join("tr")
            .classed("row", true)
            .selectAll(".food-title-cell")
                .data(d => [d])
                .join("th")
                    .classed("first-col-cell", true)
                    .classed("food-title-cell", true)
                    .selectAll(".food-title-text")
                        .data(d => [d])
                        .join("p")
                            .classed("food-title-text", true)
                            .text(d => d.title);

        d3.selectAll(".food-title-cell")
            .selectAll(".food-title-image")
            .data(d => [d])
                .join('img')
                .classed("food-title-image", true)
            //.append('img')
                .attr('src', d => "icon_name" in d && d.icon_name != null ? `assets/${d.icon_name}.svg` : "");

        let td = d3.selectAll(".row")
            .selectAll("td")  
            .data((d) => {
                let rowData = [];
                this.selectedColumns.forEach(column => {
                    // d is the rowData
                    // let cellData = {
                    //     // "vis": column.vis,
                    //     "vis": column.visData.type,
                    //     // "value": d[column.key],
                    //     "value": 6,
                    //     // "total_value": demographicData[something],
                    //     "total_value": column.maxValue,
                    //     // "units": column.unit,
                    //     "units": column.unit

                    // };
                    // console.log("column");
                    // console.log(column);
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
        
        this.setScroll();
    }

    setScroll() {
        $('tbody').scroll(function(e) { //detect a scroll event on the tbody
            /*
          Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
          of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain 			it's relative position at the left of the table.    
          */
          $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
          $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
          $('.food-title-cell').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
        });
    }

    updateDonutCells(donutCells)
    {
        let radius = 25;
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
                .attr("width", 120)
                .attr("height", 60)
                .selectAll(".donut-group")
                .data(d => [d])
                .join("g")
                    .classed("donut-group", true)
                    .attr("transform", "translate(" + 120 / 2 + "," + 60 / 2 + ")");

        d3.selectAll(".donut-group")
            .selectAll(".slice-group")
            .data(d => {
                let value = d.columnData.value(d.rowData);
                let totalValue = d.columnData.totalValue(d.rowData);

                let pieData = [
                    {
                        share: value / totalValue,
                        color: "green"
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
    }

    updateTextCells(textCells)
    {
        textCells
            .text(d => d.columnData.value(d.rowData));

    }
    
}