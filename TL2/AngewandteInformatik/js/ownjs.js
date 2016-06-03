
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



$(function(){
 $("#A1").click(function() {
 	console.log("clicked");
	var parameter = $(this).data('parameter'); 
	$.ajax({
	url: "php/moduleGroups.php",
	type: "GET",
	data: {module_details : parameter},
	dataType: "json",
	success: function(data){
		document.getElementById("display").innerHTML = data.details.description;
	},
	error: function(jqXHR, textStatus){
		alert("Request failed" + textStatus)
	}
});
});
});


