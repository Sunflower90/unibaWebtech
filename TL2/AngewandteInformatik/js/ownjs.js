
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
	document.getElementById("moduleID").innerHTML = data.details.id;
	document.getElementById("title").innerHTML = data.details.name;

	if(data.details.minECTS == data.details.maxECTS){
		document.getElementById("ects").innerHTML = data.details.minECTS;
	}else{
		document.getElementById("ects").innerHTML = "[" + data.details.minECTS + " - " + data.details.maxECTS + " ECTS-Punkte]";
	}

	/**for(i = 0; i <= data.details.courses.length; i++){
		
	}**/
//	var mandatory = "<h4> Pflichtmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr> ";
	//var nonmandatory = "<h4> Wahlmodule </h4> \n <table> <tr> <th>Kürzel</th> <th>Bezeichnung</th> <th>Semester</th> <th>ECTS</th> </tr>";

//	var mandatory = $(document.createElement("h4"));
	$("#table-mandatory").before("<h4>Pflichtmodul</h4>");
//	var nonmandatory = $(document.createElement('h4')).appendTo('#div-nonmandatory');
	
	$.each(data.details.courses, function(index, course){
		if(course.mandatory){
	//		console.log("Console log" + mandatory);
		//	mandatory.innerHTML = "Hallo";
		}
	/**		mandatory = mandatory + "\n <tr> <td>" + course.short_name + "</td> </tr>";
			mandatory = mandatory + 
		} else {
			nonmandatory = nonmandatory + "\n <tr> <td>" + course.short_name + "</td> </tr>"; **/

		//			$("#div-mandatory").append(mandatory);

	})
//		mandatory.appendTo("#div-mandatory");
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


