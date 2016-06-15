
 
 function donut() 
 {
 var data = [54, 90, 78, 60, 18, 36, 24];
var data2 = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
        var r = 300;
        
        var legendRectSize = 20;
        var legendSpacing = 4;
        
        var color = d3.scale.ordinal()
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']);

        var canvas = d3.select('#canvas').append('svg')
        .attr('width', 1000)
        .attr('height', 1000);
		/** Hier die H�he und Breite nicht fest setzen **/
        

        /**Zentrum von unserem Donut **/
        var group = canvas.append('g')
        .attr('transform', 'translate(600, 600)');
        
 
        var arc = d3.svg.arc()
        .innerRadius(150)
        .outerRadius(r);

        /** sort(null) daf�r, dass unsere Ordnung beibehalten wird, sonst w�ren die Segmenten automatisch nach Gr��e sortiert **/ 
        var pie = d3.layout.pie()
        .value(function (d) {
          return d; })
        .sort(null);

        /** Zuerst schicken wir Data an Pie-layout, jedes Group-Element hat die Klasse von Arc **/

        var arcs = group.selectAll('.arc')
        //.data(pie(data))
		.data(data2)
        .enter()
        .append('g')
        .attr('class', 'arc')
		.on("mouseover", function(d){
			/** Hier die Info im Kreisinnern **/
			console.log("On Mouseover: " + d.value);
		})
		.on("click", function(d){
			alert("Hier kommt ein clickable Event " + d.value);
		});

        
        var legend = group.selectAll('.legend')
        .data(data)
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
        
        
        


        /** F�r die oberen Objekten m�ssen wir Pfade einbinden, dann mit Farbe bef�llt mittels function(d) **/
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
        
        /**

		
         
     
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
		**/
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