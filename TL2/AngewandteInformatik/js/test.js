var objectArrayGeneralInformation = [];

$(window).load(
	$.ajax({
	url: "php/moduleGroups.php",
	type: "GET",	
	dataType: "json",
	data: {},
	success: function(data){
		//objectArrayGeneralInformation = data;
		objectArrayGeneralInformation = generalInformation(data);
		//console.log("Request ohne Parameter für die allgemeinen Informationen.");
		//console.log(objectArrayGeneralInformation);
		//document.getElementById('donut').innerHTML = donut();
		donut();
	},
	error: function(jqXHR, textStatus){
		alert("Request failed" + textStatus)
	}
})
);

var msg = "Hat funktioniert."
var textStatus = "Hat nicht funktioniert."



var createTableHead = function(){
	var tdHeaderKuerzel = document.createElement('th');
	tdHeaderKuerzel.innerHTML = "Kürzel";
	var tdHeaderBezeichnung = document.createElement('th');
	tdHeaderBezeichnung.innerHTML = "Bezeichnung";
	var tdHeaderSemester = document.createElement('th');
	tdHeaderSemester.innerHTML = "Semester";
	var tdHeaderEcts = document.createElement('th');
	tdHeaderEcts.innerHTML = "ECTS";
	
	var thHeader = document.createElement('tr');
	thHeader.appendChild(tdHeaderKuerzel);
	thHeader.appendChild(tdHeaderBezeichnung);
	thHeader.appendChild(tdHeaderSemester);
	thHeader.appendChild(tdHeaderEcts);
	return thHeader;
}

var displayModuleDetails = function(data){
	$('mandatoryCourses').empty();
	$('nonmandatoryCourses').empty();
	//console.log("In DisplayModuleDetails");
	document.getElementById("moduleID").innerHTML = data.details.id;
	document.getElementById("title").innerHTML = data.details.name;

	if(data.details.minECTS == data.details.maxECTS){
		document.getElementById("ects").innerHTML = data.details.minECTS;
	}else{
		document.getElementById("ects").innerHTML = "[" + data.details.minECTS + " - " + data.details.maxECTS + " ECTS-Punkte]";
	}

	document.getElementById("moduleDescription").innerHTML = data.details.description;


	var mandatoryCourses = document.getElementById("mandatoryCourses").innerHTML = "<h4>Pflichtkurse</h4> \n";
	

	var nonmandatoryCourses = document.getElementById("nonmandatoryCourses").innerHTML = "<h4>Wahlkurse</h4> \n";

	var tableMandatory = document.createElement('table');
	tableMandatory.appendChild(createTableHead());
	var tableNonMandatory = document.createElement('table');
	tableNonMandatory.appendChild(createTableHead());

	
	
	
	$.each(data.details.courses, function(index, course){

		if(course.mandatory == true){
			console.log("Course: " + course);

				var td1 = document.createElement('td');
				td1.innerHTML = course.short_name;
				console.log(td1);
				var td2 = document.createElement('td');
				td2.innerHTML = course.full_name;
				var td3 = document.createElement('td');
				td3.innerHTML = course.semester;
				var td4 = document.createElement('td');
				td4.innerHTML = course.ects;

				var tr = document.createElement('tr'); 
				tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tableMandatory.appendChild(tr);
			
		} else {
			var td1 = document.createElement('td');
				td1.innerHTML = course.short_name;
				console.log(td1);
				var td2 = document.createElement('td');
				td2.innerHTML = course.full_name;
				var td3 = document.createElement('td');
				td3.innerHTML = course.semester;
				var td4 = document.createElement('td');
				td4.innerHTML = course.ects;
				var tr = document.createElement('tr'); 
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tableNonMandatory.appendChild(tr);


		 

		}


		
	});
	document.getElementById("mandatoryCourses").appendChild(tableMandatory);
	document.getElementById("nonmandatoryCourses").appendChild(tableNonMandatory);

}


var clickedArc = function(parameter){
	console.log("clicked an arc");
	console.log("Parameter " + parameter);
	$.ajax({
		url: "php/moduleGroups.php",
		type: "GET",
		data: {module_details : parameter},
		dataType: "json",
		success: function(data){
			console.log(data);
			displayModuleDetails(data);
		},
		error: function(jqXHR, textStatus){
			alert("Request failed" + textStatus);
		}
	});
	
};


$(function(){
	//$(".arc").click(function(){
 $(".clickableModule").click(function() {
 	console.log("clicked");
	var parameter = $(this).data('parameter');
	console.log(parameter);
	$.ajax({
	url: "php/moduleGroups.php",
	type: "GET",
	data: {module_details : parameter},
	dataType: "json",
	success: function(data){
		console.log(data);
		displayModuleDetails(data);
	},
	error: function(jqXHR, textStatus){
		alert("Request failed" + textStatus)
	}
});
});
});

var generalInformation = function(data){
	var objectArray = [];
	console.log("In generalInformation" + objectArray);
//	console.log("Data");
//	console.log(data);
	$.each(data, function(index, d){
	//$(data).each(function(d){
//		console.log("Each data: " + d);
		objectArray.push(d);
	});
	//console.log("In generalInformation creating");
	//console.log(objectArray);
	return objectArray;

}



 function donut() 
 {
	 console.log("in donut");
	 var myData = objectArrayGeneralInformation[0];
 //var dataset = {
  //apples: [53245, 28479, 19697, 24037, 40245],
//};

var width = 460,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
.value(function(d){
	return d.maxECTS;
})
    .sort(null);
	
	//  Kreis für den Text in der Mitte

	
var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var svg = d3.select("#donut").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
console.log(svg);


	
//Draw the Circle
var circleGroup = svg.append('g');
 var circle = circleGroup.append("circle")
   //                       .attr("cx", 30)
  //                        .attr("cy", 30)
                         .attr("r", radius - 100)
						 .style("fill", "transparent")
						 .text(function (d) { return "Some text"; });
var circleText = circleGroup.append('text').text("Test");



var path = svg.selectAll("path")
    .data(pie(myData))
  .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc)
	.on("mouseover", function(d){
			console.log("On mouseOver " + d.data.id);
			//Hier die Info im Kreisinnern 
			//console.log("On Mouseover: " + d);
		})
		.on("click", function(d){
			//alert("Hier kommt ein clickable Event " + d.value);
			clickedArc(d.data.id);
		})

		;
		/**
var circles = svg.selectAll("circle")
                     .append("circle");
var circleAttributes = circles
 //                      .attr("cx", function (d) { return d.x_axis; })
   //                    .attr("cy", function (d) { return d.y_axis; })
                      .attr("r", radius - 100)
                      .style("fill", "blue");
		
	**/



			 

}