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
	 console.log("In donut");
	 console.log(objectArrayGeneralInformation);

 //var data = [54, 90, 78, 60, 18, 36, 24];
var myData = objectArrayGeneralInformation;
console.log(myData);
 var data2 = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
        var r = 300;
        
        var legendRectSize = 20;
        var legendSpacing = 4;
        
        var color = d3.scale.ordinal()
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']);

        var canvas = d3.select('#canvas').append('svg')
        .attr('width', 1000)
        .attr('height', 1000);
		/** Hier die Höhe und Breite nicht fest setzen **/

		
        /**Zentrum von unserem Donut **/
        var group = canvas.append('g')
        .attr('transform', 'translate(600, 600)');
        
 
        var arc = d3.svg.arc()
        .innerRadius(150)
        .outerRadius(r);

        /** sort(null) dafür, dass unsere Ordnung beibehalten wird, sonst wären die Segmenten automatisch nach Größe sortiert **/ 
        var pie = d3.layout.pie()
       .value(function (d) {
         return d.maxECTS; })
       .sort(null);

		//var pie = d3.layout.pie().sort(null).value(function(d){ return d.maxECTS;});
        /** Zuerst schicken wir Data an Pie-layout, jedes Group-Element hat die Klasse von Arc **/

		/**
		var arcs = pie(objectArrayGeneralInformation);
		alert("hallo breakpint");
		arcs.forEach(function(d,i){
			
		}
		**/
		console.log(myData[0]);
        var arcs = 
		//pie(objectArrayGeneralInformation)
		group.selectAll('.arc')
        .data(pie(myData[0]))
		//.data(data2)
        .enter()
        .append('g')
        .attr('class', 'arc')
		.on("mouseover", function(d){
			console.log("On mouseOver " + d.data.id);
			//Hier die Info im Kreisinnern 
			//console.log("On Mouseover: " + d);
		})
		.on("click", function(d){
			//alert("Hier kommt ein clickable Event " + d.value);
			clickedArc(d.data.id);
		});

        
        var legend = group.selectAll('.legend')
        .data(myData[0])
        .enter()
        .append('g')
        .attr('class', 'legend');
        
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "transparent")                                   
         .style('stroke');
        
        
        


        /** Für die oberen Objekten müssen wir Pfade einbinden, dann mit Farbe befüllt mittels function(d) **/
        arcs.append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
          return color(d.data);
        })
         .attr('d', arc)
        .on("click", function(d,i) {

         var legend = group.selectAll('.legend')
        .data(data2[i])
        .enter()
        .append('g')
        .attr('class', 'legend');
        
        

		
         
     
         var rect = d3.selectAll("rect"); 
     
        if(i == 0) {
           legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#1f77b4")                                   
         .style('stroke');
           
       
         return a1(); 
         
         }
        if(i == 1) {
        //Warum geht es nicht?! 
        d3.select('legend').remove();

        
         }
        if(i == 1) { 
   legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#ff7f0e")                                   
         .style('stroke');
        
        
        return a2(); 
        }
        if(i == 2) {
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#2ca02c")                                   
         .style('stroke');
        
        return a3(); 
        }
        else if(i==3) {
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#d62728")                                   
         .style('stroke');
        
        return a4(); 
        }
        else if(i==4) {
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#9467bd")                                   
         .style('stroke');
        
        a5();
        }
        else if(i==5) {
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#8c564b")                                   
         .style('stroke');
        a6(); 
        }
        else if(i==6) {
         legend.append('rect')  
         .attr('x', -100)
         .attr('y', -100)
         .attr('width', 200)                          
         .attr('height', 200)                         
         .style("fill", "#e377c2")                                   
         .style('stroke');
        a7(); 
        }
		
      });  
	  
 	  
}
function a1() {
            alert("Hier kommt ein clickable Event A1");
        }  
        
function a2() {
            alert("Hier kommt ein clickable Event A2");
        } 
function a3() {
            alert("Hier kommt ein clickable Event A3");
        } 
function a4() {
            alert("Hier kommt ein clickable Event A4");
        } 
function a5() {
            alert("Hier kommt ein clickable Event A5");
        }
function a6() {
            alert("Hier kommt ein clickable Event A6");
        }
function a7() {
            alert("Hier kommt ein clickable Event A7");
        }       



/*$('#loading-gif').bind('ajaxStart', function(){
	console.log("lädt gerade");
    $(this).show();
}).bind('ajaxStop', function(){
	console.log("hat geladen");
    $(this).hide();
});*/
