
 
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

        <!-- sort(null) dafür, dass unsere Ordnung beibehalten wird, sonst wären die Segmenten automatisch nach Größe sortiert --> 
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

        /** Für die oberen Objekten müssen wir Pfade einbinden, dann mit Farbe befüllt mittels function(d) **/
        arcs.append('path')
        .attr('d', arc)
        .attr('fill', function (d) {
          return color(d.data);
        });

}
 
        