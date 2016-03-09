/* 575 boilerplate main.js */

//execute script when window is loaded
window.onload = function() {
	var w = 900, h = 500;

	var container = d3.select("body") //get the <body> element from the DOM
		.append("svg") //put a new svg in the body
		.attr("width", w) //assign the width
		.attr("height", h) //assign the height
		.attr("class", "container"); //always assign a class (as the block name) for styling and future selection

	var rectangle = container
		.datum(400)
		.append("rect") //add a <rect> element
		.attr("width", function(d) {
			return d * 2;
		}) //rectangle width
		.attr("height", function(d){
			return d;
		}) //rectangle height
		.attr("class", "rectangle")
		.attr("x", 50)
		.attr("y", 50)
	};