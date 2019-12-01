// JavaScript Document
d3.json('src/data/nutrients_and_price1.json').then( data => {

    d3.json('src/data/recommended_values.json').then(valuedata => {
    
        this.data = data;
        
        let table = new Table(data, valuedata);
        let scatterplot = new ScatterPlot(data, table);
        table.saveScatterReference(scatterplot);
        table.createTable();
        table.updateTable();
        table.updateTable();
        let meal_planner = new MealPlanner(data, valuedata);
        
        //set up controls container
        let controls = d3.select('#legend');
        let controlsSvg = controls.append('svg')
            .attr('width', '300')
            .attr('height', '100%');

        // controls

        let ages = [];
        for (let i = 20; i <= 70; i += 5) {
            ages.push(i);
        }
        let ageButton = d3.select("#ageSelectDiv")
            .append('select')
            .attr('id', 'ageSelect');
        
        ageButton
            .selectAll('option')
            .data(ages)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; }); // corresponding value returned by the button


        ageButton.on("change", function(d) {
                table.updateDailyValues();
                meal_planner.updateDailyValues();
            } );
        ageButton.selectAll('option').property("selected", function(d){ return d == 25; })

        let sexSelect = d3.select("#sexSelectDiv")
            .append('select')
            .attr('id', 'sexSelect');

        sexSelect
            .selectAll('option')
            .data(['Male', 'Female'])
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; });

        sexSelect.on("change", function(d) {
                table.updateDailyValues();
                meal_planner.updateDailyValues();
            } );
        sexSelect.selectAll('option').property("selected", function(d){ return d == 'Male'; })

        let heights = [];
        for (let i = 48; i <= 78; i++) {
            heights.push(i);
        }
        let heightSelect = d3.select("#heightSelectDiv")
            .append('select')
            .attr('id', 'heightSelect');
        
        heightSelect
            .selectAll('option') // Next 4 lines add 6 options = 6 colors
            .data(heights)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; });

        heightSelect.on("change", function(d) {
                table.updateDailyValues();
                meal_planner.updateDailyValues();
            } );
        heightSelect.selectAll('option').property("selected", function(d){ return d == 70; })

        let weights = [];
        for (let i = 80; i <= 275; i += 5) {
            weights.push(i);
        }
        let weightSelect = d3.select("#weightSelectDiv")
            .append('select')
            .attr('id', 'weightSelect');
        
        weightSelect
            .selectAll('option') // Next 4 lines add 6 options = 6 colors
            .data(weights)
            .enter()
            .append('option')
            .text(function (d) { return d; }) // text showed in the menu
            .attr("value", function (d) { return d; });

        weightSelect.on("change", function(d) {
                table.updateDailyValues();
                meal_planner.updateDailyValues();
            } );
        weightSelect.selectAll('option').property("selected", function(d){ return d == 200; })


        table.updateDailyValues();
        meal_planner.updateDailyValues();

        //draw legend
        controlsSvg.append('rect')
            .attr('transform', 'translate(17, 5)')
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
            .attr('transform', (d,i) => 'translate(' + (37 + (i >= 4 ? 120 : 0)) + ',' + (15 + (i%4 * 20)) +')');
        
        let rects = legendItems.append('rect')
            .attr('height', 10)
            .attr('width', 20);
        
        rects.each((d,i,c) => {
            d3.select(c[i]).classed(d.toLowerCase(), true);
        })
        
        legendItems.append('text')
            .text(d => d)
            .attr('transform', 'translate(30, 10)');


        // tab layout

        function openTab(pageName, elmnt) {
            // hide all tabs
            let tabcontent = document.getElementsByClassName("tabcontent");
                for (let i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            // set all links to navy
            let tablinks = document.getElementsByClassName("tablink");
            for (let i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "#2E4B7C";
            }

            // but then view/highlight corresponding button/tab
            document.getElementById(pageName).style.display = "block";
            elmnt.style.backgroundColor = "lightsteelblue";
        }

        d3.select('#main-button')
            .on('click', function() {openTab('main-container', this);})

        d3.select('#meal-button')
            .on('click', function() {openTab('meal-container', this);})

        // Get the element with id="defaultOpen" and click on it
        document.getElementById("main-button").click();
    })
});