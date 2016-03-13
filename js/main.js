/* 575 boilerplate main.js */

//execute script when window is loaded
window.onload = function() {
	//svg dimension variables
	var w = 900, h = 500;

	//container block
	var container = d3.select("body") //get the <body> element from the DOM
		.append("svg") //put a new svg in the body
		.attr("width", w) //assign the width
		.attr("height", h) //assign the height
		.attr("class", "container"); //always assign a class (as the block name) for styling and future selection

	//inner rectangle block
	var rectangle = container
		.datum(400)
		.append("rect") //add a <rect> element
		.attr("width", function (d) {
			return d * 2;
		}) //rectangle width
		.attr("height", function (d){
			return d;
		}) //rectangle height
		.attr("class", "rectangle")//class name
		.attr("x", 50)//position from left on x-axis
		.attr("y", 50);//position from top on y-axis
	

	//array of numbers
	//var dataArray = [10, 20, 30, 40, 50];

	var cityPopulation = [
		{	
			city: 'Fond du Lac',
			population: 43021
		},

		{	
			city: 'Appleton',
			population: 72623
		},

		{	
			city: 'De Pere',
			population: 23800
		},

		{	
			city: 'Oshkosh',
			population: 66083
		}

	];

	var x = d3.scale.linear()//create the scale
		.range([90, 725])//output min and mpx
		.domain([0, 3]);//input min and max
	
	//find min array value	
	var minPop = d3.min(cityPopulation, function (d){
		return d.population;
	});

	//find the max array value
	var maxPop = d3.max(cityPopulation, function (d){
		return d.population;
	});

	//scale for circles center y coordinate
	var y = d3.scale.linear()
		.range([450, 50])
		.domain([0, 80000]);

	//color scale generator
	var color = d3.scale.linear()
		.range([
			"#FDBE85",
            "#D94701"
		])
		.domain ([
			minPop,
			maxPop
		]);

	//circles container
	var circles = container
		.selectAll(".circles")//no circles yet
		.data(cityPopulation)//feed in an array
		.enter()
		.append("circle")//add a circle for each datum
		.attr("class", "circles")//apply a class name to all circles
		.attr("id", function (d) {
			return d.city;
		})
		.attr("r", function (d){
			//calculate radius based on pop as circle area
			//console.log("d:", d, "i:", i);
			var area = d.population * 0.01;
			return Math.sqrt(area/Math.PI);
		})
		.attr("cx", function (d, i){
			//use scale generator with the index to place each circle horizontally
			return x(i);
		})
		.attr("cy", function (d){
			//subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
			return y(d.population);
		})
		.style("fill", function (d, i){ //add a fill based on the color scale generator
			return color(d.population);
		})
		.style("stroke", "#000"); //black stroke

	//create y-axis generator
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")

	//create axis g element and add axis
	var axis = container.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(50, 0)")
		.call(yAxis);

	//create a text element and add the title
	var title = container.append("text")
		.attr("class", "title")
		.attr("text-anchor", "middle")
		.attr("x", 450)
		.attr("y", 30)
		.text("City Populations");

	var labels = container.selectAll(".labels")
		.data(cityPopulation)
		.enter()
		.append("text")
		.attr("class", "labels")
		.attr("text-anchor", "left")
		.attr("y", function (d){
			//vertical position centered on each circle
			return y(d.population) + -2;
		});

	//first line of label
	var nameLine = labels.append("tspan")
		.attr("class", "nameLine")
		.attr("x", function (d, i){
			//horizontal position to the right of each circle
			return x(i) + Math.sqrt(d.population * 0.01/Math.PI) + 5;
		})
		.text(function (d){
			return d.city;
		});

	//create format generator
	var format = d3.format(",");

	//second line of label
	var popLine = labels.append("tspan")
		.attr("class", "popLine")
		.attr("x", function (d, i){
			//horizontal position to the right of each circle
			return x(i) + Math.sqrt(d.population * 0.01/Math.PI) + 5;
		})
		.attr("dy", "15")//vertical offset
		.text(function (d){
			return "Pop. " + format(d.population); //use format generator to format numbers
		});
	};