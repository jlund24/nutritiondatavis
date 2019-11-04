// JavaScript Document


class Table {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;

        this.width = 775;
        this.height = 800;

        this.columnData = [
            {
                "title": "food",
                "id": "food-title"
            },
            {
                "title": "serving size",
                "id": "serving-size"
            },
            {
                "title": "food group",
                "id": "food-group"
            },
            {
                "title": "calories",
                "unit": "cal",
                "id": "calories"
            },
            {
                "title": "total carbs",
                "unit": "grams",
                "id": "total-carbs"
            },
            {
                "title": "price",
                "unit": "dollars",
                "id": "price"
            },
            {
                "title": "protein",
                "unit": "grams",
                "id": "protein"
            },
            {
                "title": "total fat",
                "unit": "grams",
                "id": "total-fat"
            },
            {
                "title": "total sugar",
                "unit": "grams",
                "id": "total-sugar"
            },
        ];

        this.selectedColumns = [[],[],[],[],[],[],[],[]];
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
            .data(this.columnData)
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
            .append("th")
                .classed("first-col-cell", true)
                .classed("food-title-cell", true)
                .append("p")
                .classed("food-title-text", true)
                .text(d => d.title);

        d3.selectAll(".food-title-cell")
            .append('img')
            .attr('src', d => "icon_name" in d && d.icon_name != null ? `assets/${d.icon_name}.svg` : "");

        let td = d3.selectAll(".row")
            .selectAll("td")  
            .data((d) => {
                let rowData = [];
                this.selectedColumns.forEach(column => {
                    let cellData = {
                        // "vis": column.vis,
                        "vis": "donut",
                        // "value": d[column.key],
                        "value": 6,
                        // "total_value": demographicData[something],
                        "total_value": 10,
                        // "units": d[column.unit],
                        "units": "g"

                    };
                    rowData.push(cellData);
                });
                return rowData;
            });

        td.join("td")
            .classed("cell", true)
            // .text(d => d.vis);
            ;
        
        let donutCells = d3.selectAll(".cell").filter((d) => {
            return d.vis == "donut";
        });
        
        let radius = 25;
        let arc = d3.arc()
            .innerRadius(radius * .75)
            .outerRadius(radius);

        let pie = d3.pie();
        pie.value(d => d.share);
         
       
        donutCells.append("svg")
            .attr("width", 120)
            .attr("height", 60)
            .append("g")
                .classed("donut-group", true)
                .attr("transform", "translate(" + 120 / 2 + "," + 60 / 2 + ")");

        d3.selectAll(".donut-group")
            .selectAll(".slice-group")
            .data(d => {
                let pieData = [
                    {
                        share: d.value / d.total_value,
                        color: "green"
                    },
                    {
                        share: (d.total_value - d.value) / d.total_value,
                        color: "gray"
                    }
                    
                ];
                return pie(pieData);
            })
            .join("g")
            .classed("slice-group", true)
            .append("path")
                .attr("d", arc)
                .style("fill", d => d.data.color)
                ;

        
            


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

    
}