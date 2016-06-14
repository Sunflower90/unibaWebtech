
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
	console.log("In DisplayModuleDetails");
	document.getElementById("moduleID").innerHTML = data.details.id;
	document.getElementById("title").innerHTML = data.details.name;

	if(data.details.minECTS == data.details.maxECTS){
		document.getElementById("ects").innerHTML = data.details.minECTS;
	}else{
		document.getElementById("ects").innerHTML = "[" + data.details.minECTS + " - " + data.details.maxECTS + " ECTS-Punkte]";
	}
/**
<<<<<<< HEAD
	/**for(i = 0; i <= data.details.courses.length; i++){
		
	}**/
//	var mandatory = "<h4> Pflichtmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr> ";
	//var nonmandatory = "<h4> Wahlmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr>";

//	var mandatory = $(document.createElement("h4"));
/**
	var tableHeader = "<tr><td>Kürzel</td><td>Bezeichnung</td><td>Semester</td><td>ECTS</td></tr>"
// Erstellen der Pflichtmodultabelle
	$("#header-table-mandatory").remove();
	$("#table-mandatory").before("<h4 id=\"header-table-mandatory\">Pflichtmodule</h4>");
	$("#table-mandatory").empty();
	$("#table-mandatory").append(tableHeader);
//	var nonmandatory = $(document.createElement('h4')).appendTo('#div-nonmandatory');
	
	$.each(data.details.courses, function(index, course){
		if(course.mandatory){
			console.log("Console log" + mandatory);
		//	mandatory.innerHTML = "Hallo";
		}
	/**		mandatory = mandatory + "\n <tr> <td>" + course.short_name + "</td> </tr>";
			mandatory = mandatory + 
		} else {
			nonmandatory = nonmandatory + "\n <tr> <td>" + course.short_name + "</td> </tr>"; **/

		//			$("#div-mandatory").append(mandatory);
/**
	});
	// Erstellen der Wahlmodultabelle
	
	$("#header-table-nonmandatory").remove();
	$("#table-nonmandatory").before("<h4 id=\"header-table-nonmandatory\">Wahlmodule</h4>");
	$("#table-nonmandatory").empty();
	$("#table-nonmandatory").append(tableHeader);

	
	
//		mandatory.appendTo("#div-mandatory");
=======
**/
	document.getElementById("moduleDescription").innerHTML = data.details.description;

/**
	if(data.details.courses.contains(course.mandatory)){
		document.getElementById("mandatoryCourses").innerHTML = "<h4>Pflichtkurse</h4>";
	}
	if(data.details.courses.contains(!course.mandatory)){
		document.getElementById("nonmandatoryCourses").innerHTML = "<h4>Wahlkurse</h4>";
	}
**/

/**
	var mandatory = "<h4> Pflichtmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr> ";
	var nonmandatory = "<h4> Wahlmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr>";

*/

	var mandatoryCourses = document.getElementById("mandatoryCourses").innerHTML = "<h4>Pflichtkurse</h4> \n";
	var fragmentMandatory = document.createDocumentFragment();

	var nonmandatoryCourses = document.getElementById("nonmandatoryCourses").innerHTML = "<h4>Wahlkurse</h4> \n";
	var fragmentNonMandatory = document.createDocumentFragment();

	$.each(data.details.courses, function(index, course){

		if(course.mandatory == true){
			console.log(course);

				var td1 = document.createElement('td');
				td1.innerHTML = course.short_name;
				console.log(td1);
				var td2 = document.createElement('td');
				td2.innerHTML = course.full_name;
				var td3 = document.createElement('td');
				td3.innerHTML = course.semester;
				var td4 = document.createElement('td');
				td4.innerHTML = course.ects;

				fragmentMandatory.appendChild(td1);
				fragmentMandatory.appendChild(td2);
				fragmentMandatory.appendChild(td3);
				fragmentMandatory.appendChild(td4);
				console.log(fragmentMandatory);
			
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

				fragmentNonMandatory.appendChild(td1);
				fragmentNonMandatory.appendChild(td2);
				fragmentNonMandatory.appendChild(td3);
				fragmentNonMandatory.appendChild(td4);

		 

		}

		var tableMandatory = document.createElement('table');
		var tr = document.createElement('tr'); 
		tr.appendChild(fragmentMandatory);
		tableMandatory.appendChild(tr);
		document.getElementById("mandatoryCourses").appendChild(tableMandatory);

		var tableNonMandatory = document.createElement('table');
		var trNon = document.createElement('tr');
		trNon.appendChild(fragmentNonMandatory);
		tableNonMandatory.appendChild(trNon);
		document.getElementById("nonmandatoryCourses").appendChild(tableNonMandatory);
	});
	/*
	mandatory = mandatory + "</table>";
	nonmandatory = nonmandatory + "</table>"
	var courses = mandatory + nonmandatory;
	console.log(courses);
	document.getElementById("courseList").innerHTML = courses;
	**/
//>>>>>>> origin/master
}
//	mandatory = mandatory + "</table>";
//	nonmandatory = nonmandatory + "</table>"
//	var courses = mandatory + nonmandatory;
//	console.log(courses);
//	document.getElementById("courseList").innerHTML = courses;
	



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


