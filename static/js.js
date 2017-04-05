var colorSwitch = function(i,j, currentR, currentG, currentB){
	var scale = i/j;
	var newR = Math.floor(currentR + (255-currentR) * (1- scale));
	var newG = Math.floor(currentG + (255-currentG) * (1 - scale));
	var newB = Math.floor(currentB + (255-currentB) * (1 -scale));
//    return "fill:rgb(" + newR + "," + newG + "," + newB + "); stroke-width:1; stroke:#808080;";
    return "rgb(" + newR + "," + newG + "," + newB + ")";
};
var names = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

var text = d3.select("[id='america']").select("g").selectAll("text").data(names).enter().append("text");
var texters = d3.selectAll("text");

var updateMap = function(e){
    var lists = JSON.parse(document.getElementById("dObj").innerHTML);
    var data = lists[(document.getElementsByClassName("ui-slider-handle")[0].getAttribute("aria-valuenow") - 1977)];
    console.log(data);
    var squares = d3.selectAll("rect");
    squares.data(data);
    console.log(squares);
    squares.attr("style", "").attr("stroke","#808080");
    squares.transition().duration(2000).attr("height", function(d,i) { return 50 * (1 + (d / 20)) }).attr("width", function(d,i) { return 50 * (1 + (d/20)) }).attr("fill", function(d) {
	if(d < 0){
	    return colorSwitch(-1 * d, 10, 255,0,0);
	}else{
	    return colorSwitch(d,10,0,255,0);
	}
    });

    texters.transition().duration(2000)
	.attr("x", function(d,i) { return squares[0][i].x.animVal.value + (50 * (1 + (data[i] /20) ) /2 );})
	.attr("y", function(d,i) { return squares[0][i].y.animVal.value + ( 50 * (1 + (data[i] /20) )/2 );})
	.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "black")
	.attr("text-anchor", "middle")
	.text( function(d){return d;});
    console.log(text);

    var legenddata = [-8,-6,-4,-2,0,2,4,6,8,10];
    var legendnames = ["-8+%","-6%","-4%","-2%","0%","2%","4%","6%","8%","10+%"]
    var legs = d3.selectAll("line").data(legenddata).attr("stroke", function(d) {
	if(d < 0){
	    return colorSwitch(-1 * d, 10, 255,0,0);
	}else{
	    return colorSwitch(d,10,0,255,0);
	}
    });
    var legstxt = d3.select("[id='america']").select("g").selectAll("text[class=legend]").data(legendnames).enter().append('text').attr('class','legend');
    var legst = d3.selectAll("text[class=legend]")
	.attr("x", function(d,i) { return (legs[0][i].x1.animVal.value + legs[0][i].x2.animVal.value ) /2;})
	.attr("y", function(d,i) { return (legs[0][i].y1.animVal.value + legs[0][i].y2.animVal.value ) /2;})
	.attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "black")
	.attr("text-anchor", "middle")
	.text( function(d){return d;});
    
};

window.onload = function(){
    updateMap();
    document.getElementsByTagName("body")[0].addEventListener('mouseup',updateMap);
};


var play = function() {
    $.ajax({
	type: "POST",
	url: "/go/",
    });

    updateMap();
};

var playbtn = document.getElementById("play");
playbtn.addEventListener("click", play);
