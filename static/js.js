var colorSwitch = function(i,j, currentR, currentG, currentB){
	var scale = i/j;
	var newR = Math.floor(currentR + (255-currentR) * (1- scale));
	var newG = Math.floor(currentG + (255-currentG) * (1 - scale));
	var newB = Math.floor(currentB + (255-currentB) * (1 -scale));
	return "rgb(" + newR + "," + newG + "," + newB + ")";
};

console.log(colorSwitch(10,10,0,1,56));
console.log(colorSwitch(8,10,0,1,56));
console.log(colorSwitch(6,10,0,1,56));
console.log(colorSwitch(4,10,0,1,56));
console.log(colorSwitch(2,10,0,1,56));
