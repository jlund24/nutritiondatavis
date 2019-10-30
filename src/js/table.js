// JavaScript Document
class Table {
    constructor(data)
    {
        this.data = data;
        this.tableElements = data;

        this.width = 775;
        this.height = 800;
    }

    createTable()
    {
        d3.select("#food-table-container")
            .append("svg")
            .attr("id", "table-svg")
            .attr("width", this.width)
            .attr("height", this.height);
    }

    updateTable()
    {

    }
}