
 
 function donut() 
 {
 var data = [54, 90, 78, 60, 18, 36, 24];
        var r = 350;

        var color = d3.scale.ordinal()
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2']);

        var canvas = d3.select('#canvas').append('svg')
        .attr('width', 1000)
        .attr('height', 1000);

        <!-- Zentrum von unserem Donut --> 
        var group = canvas.append('g')
        .attr('transform', 'translate(600, 600)');

        
        var arc = d3.svg.arc()
        .innerRadius(200)
        .outerRadius(r);

        <!-- sort(null) daf�r, dass unsere Ordnung beibehalten wird, sonst w�ren die Segmenten automatisch nach Gr��e sortiert --> 
        var pie = d3.layout.pie()
        .value(function (d) {
          return d; })
        .sort(null);

        <!-- Zuerst schicken wir Data an Pie-layout, jedes Group-Element hat die Klasse von Arc --> 

        var arcs = group.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

        /** F�r die oberen Objekten m�ssen wir Pfade einbinden, dann mit Farbe bef�llt mittels function(d) **/
        arcs.append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
          return color(d.data);
        })
         .attr('d', arc)
        .on("click", function(d,i) {
        if(i == 0) {
         return a1(); 
         }
        if(i == 1) {
        return a2(); 
        }
        if(i == 2) {
        return a3(); 
        }
        else if(i==3) {
        return a4(); 
        }
        else if(i==4) {
        
        a5();
        }
        else if(i==5) {
        a6(); 
        }
        else if(i==6) {
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