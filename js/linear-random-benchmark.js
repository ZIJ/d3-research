
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

console.time('data generation');

var data = generateData(10000, 500, 1000);
var dataArr = data.map(function(point){
    return [point.x, point.y];
});
var dataY = data.map(function(point){
    return point.y;
});

console.timeEnd('data generation');

testD3();
testFlot();
testHigh();

function testD3(){
    console.time('D3: processing and rendering');

    x.domain(d3.extent(data, function(d) { return d.x; }));
    y.domain(d3.extent(data, function(d) { return d.y; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    console.timeEnd('D3: processing and rendering');
}

function testFlot(){
    console.time('Flot: processing and rendering');

    $('#flot').plot([dataArr]);

    console.timeEnd('Flot: processing and rendering');
}

function testHigh(){
    console.time('Highcharts: processing and rendering');

    $('#high').highcharts({
        chart: {
            type: 'line'
        },
        series: [{
            name: 'sample',
            data: dataY
        }]
    });

    console.timeEnd('Highcharts: processing and rendering');
}


function generateData(amount, min, max) {
    var data = [];
    for (var i = 0; i < amount; i+=1) {
        data.push({
            x: i,
            y: Math.random() * (max - min) + min
        });
    }
    return data;
}