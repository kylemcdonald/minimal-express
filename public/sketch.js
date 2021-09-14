var rx = 0, ry = 0;
var sketchSize = 320;
var modeChoices = [0, 0];
var colorChoices = [0, 0];
var colors = ['#000000', '#00abec', '#ec008c', '#ffee00'];

function setup(){
	createCanvas(sketchSize, sketchSize, WEBGL);
    ortho(-width/2, width/2, height/2, -height/2, 0, 2*sketchSize);
    noStroke();
}

function draw(){
	var size = 128;
	var spacing = size / 6;
	
	var bigSide = Math.max(width, height);
	var cy = +(mouseX - (width / 2)) / bigSide;
	var cx = -(mouseY - (height / 2)) / bigSide;

	var maxDistance = 1;
	var dist = Math.sqrt(cx * cx + cy * cy);
	if(dist > maxDistance || mouseX == 0 || mouseY == 0) {
		cx = 0, cy = 0;
	}

	var range = 0.5;
	cy = constrain(cy, -range, +range);
	cx = constrain(cx, -range, 0);

	var rate = 0.1;
	rx = lerp(rx, cx, rate);
	ry = lerp(ry, cy, rate);

	background(255);
	rotateX(PI/4 + rx);
	rotateY(PI/4 + ry);
	translate(0, -size/2, 0);
	drawIYO(size, modeChoices[0], colors[colorChoices[0]]);
	translate(0, size + spacing, 0);
	drawIYO(size, modeChoices[1], colors[colorChoices[1]]);
}

function randomExcept(range, current) {
	var result = (current + 1 + int(random(range - 1))) % range;
	console.log(current + ' => ' + result);
	return result;
}

function mousePressed() {
	modeChoices[0] = randomExcept(3, modeChoices[0]);
	modeChoices[1] = randomExcept(3, modeChoices[1]);
	colorChoices[0] = randomExcept(colors.length, colorChoices[0]);
	colorChoices[1] = randomExcept(colors.length, colorChoices[1]);
}

function drawIYO(size, mode, color) {
	var sphereSize = size / 3;
	var lineSize = size / 10;
	var linePadding = 0;
	
	fill(0);
	
	var offset = (size - lineSize) / 2 + 1;
	
	// I
	push();
	translate(-offset, 0, -offset);
	box(lineSize, size - linePadding, lineSize);
	pop();
	
	// Y stem
	push();
	translate(-offset, 0, offset);
	box(lineSize, size - linePadding, lineSize);
	pop();
	
	// Y left
	push();
	translate(-offset, offset, 0);
	box(lineSize, lineSize, size - linePadding);
	pop();
	
	// Y right
	push();
	translate(0, offset, offset);
	box(size - linePadding, lineSize, lineSize);
	pop();
	
	// O
	push();
	fill(color);
	if(mode == 0) {
		// sphere
		translate(0, 0, size/2 - sphereSize/2);
		sphere(sphereSize);
	} else if(mode == 1) {
		// black
		translate(0, 0, size/2);
		rotateX(PI/2);
		cylinder(sphereSize, lineSize);
	} else if(mode == 2) {
		// hollowed
		translate(0, 0, size/2);
		rotateX(PI/2);
		cylinder(sphereSize, lineSize);
		fill(255);
		translate(0, -lineSize/2, 0);
		cylinder(sphereSize - lineSize*1.5, 1);
	} else {
		// zfight mode
		translate(0, 0, size/2 - sphereSize/2);
		rotateX(PI/2);
		cylinder(sphereSize, sphereSize);
	}
	pop();
	
	// white box to hide the sphere
	push();
	fill(255);
	translate(0, 0, sphereSize/2);
	box(size-sphereSize);
	pop();
}