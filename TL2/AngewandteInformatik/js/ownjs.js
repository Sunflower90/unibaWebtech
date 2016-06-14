
//Hier steht unser eigenes javascript
$(window).load($.get("php/moduleGroups.php"), function(){
	//return document.innerHTML("<h3>Hallo</h3>")
	console.log("Hallo")
}, "json");

var msg = "Hat funktioniert."
var textStatus = "Hat nicht funktioniert."

/**$.ajax({
	url: "php/moduleGroups.php",
	type: "GET",
	data: {"?module_details=A1"},
	dataType: "json",
	success: function(msg){
		console.log("funktioniert");
	},
	error: function(jqXHR, textStatus){
		alert("Request failed" + textStatus)
	}
});


**/

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

	
	var tdHeaderKuerzel = document.createElement('td');
	tdHeaderKuerzel.innerHTML = "Kürzel";
	var tdHeaderBezeichnung = document.createElement('td');
	tdHeaderBezeichnung.innerHTML = "Bezeichnung";
	var tdHeaderSemester = document.createElement('td');
	tdHeaderSemester.innerHTML = "Semester";
	var tdHeaderEcts = document.createElement('td');
	tdHeaderEcts.innerHTML = "ECTS";
	
	var thHeader = document.createElement('th');
	thHeader.appendChild(tdHeaderKuerzel);
	thHeader.appendChild(tdHeaderBezeichnung);
	thHeader.appendChild(tdHeaderSemester);
	thHeader.appendChild(tdHeaderEcts);
	//var thHeaderNonMandatory = document.createElement('th');

	
//	thHeaderNonMandatory.appendChild(fragmentHeader);
//	thHeaderMandatory.appendChild(fragmentHeader);
	var tableNonMandatory = document.createElement('table');
	tableNonMandatory.appendChild(thHeader);

	var tableMandatory = document.createElement('table');
	tableMandatory.appendChild(thHeader);
	
	
	$.each(data.details.courses, function(index, course){
//		var fragmentMandatory = document.createDocumentFragment();
//		var fragmentNonMandatory = document.createDocumentFragment();

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
/**
				fragmentMandatory.appendChild(td1);
				fragmentMandatory.appendChild(td2);
				fragmentMandatory.appendChild(td3);
				fragmentMandatory.appendChild(td4);
				console.log(fragmentMandatory);
				*/
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

/*				fragmentNonMandatory.appendChild(td1);
				fragmentNonMandatory.appendChild(td2);
				fragmentNonMandatory.appendChild(td3);
				fragmentNonMandatory.appendChild(td4);
				*/

		 

		}

		
		
		

		/*
		var trNon = document.createElement('tr');
		trNon.appendChild(fragmentNonMandatory);
		tableNonMandatory.appendChild(trNon);
		*/
		
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


