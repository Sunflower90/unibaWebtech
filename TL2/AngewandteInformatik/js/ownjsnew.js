var objectArrayGeneralInformation = [];

$(window).load(
	$.ajax({
	url: "php/moduleGroups.php",
	type: "GET",	
	dataType: "json",
	data: {},
	success: function(data){
		objectArrayGeneralInformation = generalInformation(data);
		console.log("Request ohne Parameter für die allgemeinen Informationen.");
		alert("Request");
		console.log(objectArrayGeneralInformation);
		document.getElementById('donut').innerHTML = donut();
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
	console.log("In DisplayModuleDetails");
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




$(function(){
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
//	console.log("Data");
//	console.log(data);
	$.each(data, function(index, d){
	//$(data).each(function(d){
//		console.log("Each data: " + d);
		objectArray.push(d);
	});
	console.log("In generalInformation creating");
	console.log(objectArray);
	return objectArray;

}

function donut(){
	var data = objectArrayGeneralInformation;
	var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");

var width = canvas.width,
    height = canvas.height,
    radius = Math.min(width, height) / 2;

var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70)
    .context(context);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)
    .path.context(context);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.maxECTS; });

context.translate(width / 2, height / 2);
/**
d3.requestTsv("data.tsv", function(d) {
  d.population = +d.population;
  return d;
}, function(error, data) {
  if (error) throw error;
**/
  var arcs = pie(data);

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = colors[i];
    context.fill();
  });

  context.beginPath();
  arcs.forEach(arc);
  context.strokeStyle = "#fff";
  context.stroke();

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "#000";
  arcs.forEach(function(d) {
    var c = labelArc.centroid(d);
    context.fillText(d.data.age, c[0], c[1]);
  });
//});
}
