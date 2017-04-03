var colorSwitch = function(i,j, currentR, currentG, currentB){
	var scale = i/j;
	var newR = Math.floor(currentR + (255-currentR) * (1- scale));
	var newG = Math.floor(currentG + (255-currentG) * (1 - scale));
	var newB = Math.floor(currentB + (255-currentB) * (1 -scale));
//    return "fill:rgb(" + newR + "," + newG + "," + newB + "); stroke-width:1; stroke:#808080;";
    return "rgb(" + newR + "," + newG + "," + newB + ")";
};
var updateMap = function(e){
    var lists = JSON.parse(document.getElementById("dObj").innerHTML);
    var data = lists[(document.getElementsByClassName("ui-slider-handle")[0].getAttribute("aria-valuenow") - 1977)];
    console.log(data);
    var names = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
    var squares = d3.selectAll("rect");
    squares.data(data);
    console.log(squares);
    squares.attr("style", "").attr("stroke","#808080");
    squares.transition().duration(2000).attr("height", function(d,i) { return 50 * (1 + (d / 20)) }).attr("width", function(d,i) { return 50 * (1 + (d/20)) }).attr("fill", function(d) {
	if(d < 0){
	    return colorSwitch(-1 * d, 10, 255,0,0);
	}else{
	    return colorSwitch(d,30,0,255,0);
	}
    });
};
