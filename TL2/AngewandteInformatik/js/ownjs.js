 $(document).ready(function () {
 $(document).ajaxStart(function () {
 $("#loading-gif").show();
 }).ajaxStop(function () {
 $("#loading-gif").hide();
 });
})

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
	$(data).each(function(d){
		
		objectArray.push(d);
	});
	return objectArray;

}



/*$('#loading-gif').bind('ajaxStart', function(){
	console.log("lädt gerade");
    $(this).show();
}).bind('ajaxStop', function(){
	console.log("hat geladen");
    $(this).hide();
});*/
