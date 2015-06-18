'use strict';

/**
 * bead - a bead object on the abacus
 * @param  int value     - how much value the bead is worth
 * @param  obj options   - options attribute to the bead UI such as the size/color/position of the bead
 * @param  bool canMoveUp - boolean to keep track of which direction the bead is able to move
 * @return void         
 */
var bead = function(value, options, canMoveUp) {
	this.value = value;
	//this.shape = this.drawBead(options);
	this.shape = this.drawSVGBead(options);
	this.beadAbove = null;
	this.beadBelow = null;
	this.canMoveUp = canMoveUp;
	this.currPos = options.yPos;
	var self = this;

	this.moveBead = function() {

		// depending on the bead.canMoveUp property, animation bead movement and update the canMoveUp property
		if(!self.canMoveUp) {
			//moving the bead down
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(self.shape).webkitTransform);
			TweenLite.to(self.shape, 0.3, {
				y: self.currPos+48
			},1.8);

			if(self.beadBelow !== null && !self.beadBelow.canMoveUp) {
				self.beadBelow.moveBead();
			}

			self.currPos += 48;
		}
		else {
			//moving bead up
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(self.shape).webkitTransform);
			TweenLite.to(self.shape, 0.3, {
				y: self.currPos-48
			}, 1.8);

			if(self.beadAbove !== null && self.beadAbove.canMoveUp) {
				self.beadAbove.moveBead();
			}

			self.currPos -= 48;		
		}

	 	self.canMoveUp = !self.canMoveUp;
	}

	this.shape.addEventListener("click", this.moveBead, false);
}

/**
 * drawBead - creates a div element to represent the bead
 * @param  obj options - options attribute to the bead UI such as the size/color/position of the bead
 * @return the bead div element created
 */
bead.prototype.drawBead = function drawBead(options) {
	options = options || {};
	var dotWidth = options.dotWidth || 50,
		dotHeight = options.dotHeight || 32, 
		color = options.color || 'Brown',
		xPos = options.xPos || 0,
		yPos = options.yPos || 0,
		opacity = options.opacity || 0.9,
		aBead;

	aBead = document.createElement('div');
	//element.appendChild(bead);
	TweenLite.set(aBead, {
		width: dotWidth,
		height: dotHeight,
		x:xPos,
		y:yPos,
		backgroundColor: color,
		opacity: opacity,
		borderRadius: '50% 50%',
		force3D: true,
		position: 'absolute'
	});
	return aBead;
}

/**
 * drawSVGBead - method for drawing the beads dynamically using SVG. 
 * The shape of the bead is defined as a <symbol> on the mainpage for later use
 * @param  {[type]} options [description]
 * @return the bead svg element
 */
bead.prototype.drawSVGBead = function drawSVGBead(options) {

	options = options || {};
	var xPos = options.xPos || 0,
		yPos = options.yPos || 0,
		aSVGBead;

	aSVGBead = document.createElementNS('http://www.w3.org/2000/svg', 'use');
	aSVGBead.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href','#bead');
	aSVGBead.setAttributeNS(null, "width", 70);
	aSVGBead.setAttributeNS(null, "height", 50);

	TweenLite.set(aSVGBead, {x:xPos, y:yPos});
	//aSVGBead.setAttributeNS(null, "x", xPos);
	//aSVGBead.setAttributeNS(null, "y", yPos);

	//var svgBoard = document.getElementById("board");
	//svgBoard.appendChild(aSVGBead);
	return aSVGBead;
}

/**
 * abacus - representation of the abacus board
 * @param  string abacusName - name of the abacus     
 * @param  int columns - how many columns the abacus contain
 * @param  int topBeadCount - number of beads on the top row of the abacus
 * @param  int bottomBeadCount - number of beads on the bottom row of the abacus
 * @return void 
 */
var abacus = function(abacusName, columns, topBeadCount, bottomBeadCount) {
	this.element = document.getElementById("board");
	this.elementResetButton = document.getElementById(abacusName+"Reset");
	this.elementResetButton.addEventListener("click", this.reset.bind(this), false);
	this.elementSubmitNumberButton = document.getElementById("submitNumber");
	this.elementSubmitNumberButton.addEventListener("click", this.displayNumber.bind(this), false);
	this.columns = columns;
	this.topBeadCount = topBeadCount;
	this.bottomBeadCount = bottomBeadCount;
	this.topLevelNodeHeads = []; 	//TODO:create some simple SVG shape to represent a bead. For now, using CSS
	this.bottomLevelNodeHeads = [];
	
	//TODO: Update these hard coded values for bead positions on the abacus
	//this.beadsXAxis = [500, 430, 357, 283, 210, 140, 65]; old png based axis
	this.beadsXAxis = [795, 667, 539, 411, 283, 155]; //Placing the beads from the right most axist fo the left
	this.beadYAxisSpaceTop = 50;
	this.beadYAxisSpaceBottom = 410;
	this.beadYAxisMovementTop = 71;
	//this.currVal = 0;
}

/**
 * insertBead - inserting a bead into the head of a doubly-linked list 
 * @param  bead headBead - the current head of the doubly-linked list
 * @param  bead newBead - the new bead at the head of the doubly-linked list
 * @return void
 */
abacus.prototype.insertBead = function(headBead, newBead) {
	newBead.beadBelow = headBead;
	headBead.beadAbove = newBead;
	return newBead;
}

abacus.prototype.reset = function() {
	for(var i=0; i<this.topLevelNodeHeads.length; i++) {
		var currBead = this.topLevelNodeHeads[i];
		if(currBead.canMoveUp) {
			currBead.moveBead();
		}
	}

	for(var j=0; j<this.bottomLevelNodeHeads.length; j++) {
		var currBead = this.bottomLevelNodeHeads[j];
		if(!currBead.canMoveUp) {
			currBead.moveBead();
		}
	}
}

/**
 * displayNumber - given a number, the abacus board will correctly display the configuration of the beads
 * @param  int number - the value the abacus board needs to display
 * @return void
 */
abacus.prototype.displayNumber = function() {
	//TODO: later on adding back the number parameter
	var number = document.getElementById("number").value;
	number = parseInt(number);

	console.log("Number to display is: "+number);

	//Reset the abacus board
	this.reset();

	for(var i=this.columns-1; i>=0; i--) {
	 	var place = Math.pow(10, i);
	 	var placeVal = Math.floor(number/place);
	 	if (placeVal !== 0) {
	 		var bottom = 0;
	 		var top = 0;
	 		if((placeVal-5) < 0) {
	 			bottom = placeVal;
	 		}
	 		else if(placeVal-5>0) {
	 			bottom = placeVal-5;
	 			top = 1;
	 		}
	 		else if (placeVal-5 === 0) {
	 			top = 1;
	 		}

	 		if(top === 1) {
	 			this.topLevelNodeHeads[i].moveBead();
	 		}

	 		if (bottom > 0) {
	 			var nodeToMove = this.bottomLevelNodeHeads[i];
				for(var j=0; j<bottom-1; j++){
					nodeToMove = nodeToMove.beadBelow;
				}
				nodeToMove.moveBead();
	 		}

	 		number = number%place; //the remainder will be used as the next value
	 	}
	}
}	

/**
 * fillBeads - 
 * @return {[type]} [description]
 */
abacus.prototype.fillBeads = function() {
	var beadWidth = 50;
	var beadHeight = 40;

	//Loop through the number of columns the abacus contains
	for(var i=0; i<this.columns; i++)
	{
		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		//The head of the top bead will be the second bead from the top
		var head = null;
		for (var j=this.topBeadCount-1; j>-1; j--) 
		{
			var beadShapeOptions = {xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceTop+(j*beadHeight)};

			var value = Math.pow(10, i)*5;
			var newBead = new bead(value, beadShapeOptions, false);
			this.element.appendChild(newBead.shape);	

			if (head === null) {
				head = newBead;
				this.topLevelNodeHeads.push(head);
			}
			else {
				var insertedNewBead = this.insertBead(head, newBead);
				head = insertedNewBead;
			}
		}

		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		//The head of the bottom bead will be the bead near the top 
		head = null;
		for (var j=0; j<this.bottomBeadCount; j++) 
		{
			var beadWidth = 50;
			var beadHeight = 40;
			var beadShapeOptions = {xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceBottom-(j*beadHeight)};

			var value = Math.pow(10, i);
			var newBead = new bead(value, beadShapeOptions, true);
			this.element.appendChild(newBead.shape);

			if (head === null) {
				head = newBead;
				//this.bottomLevelNodeHeads.push(head);
			}
			else {
				var insertedNewBead = this.insertBead(head, newBead);
				head = insertedNewBead;
			}
		}

		this.bottomLevelNodeHeads.push(head);
	}

	// For debugging

/*	for(var i=0; i<this.topLevelNodeHeads.length; i++)
	{
		console.log("Column number:"+i);
		var currBead = this.topLevelNodeHeads[i];
		while(currBead !== null)
		{
			console.log("Bead value: ", currBead.value);
			//currBead.shape.addEventListener("click", function(){move(currBead)}, false);
			currBead = currBead.beadBelow;
		}
	}*/
}

window.onload = function() {

	// Drawing the basic abacus frame
	var frame = $("#frame"),
    //rectTR = $("#svgRectangleTR"),
    //rectBL = $("#svgRectangleBL"),
    //rectBR = $("#svgRectangleBR"),
    midPost = $("#mid_post"),
    posts = $("#post_1, #post_2, #post_3, #post_4, #post_5, #post_6"),
    tl = new TimelineMax();

	//tl.to(rectTL, 2, {scaleX:20}, 1.8)
	//tl.to(rectTR, 2, {scaleY:10}, 1.8)
	//tl.to(rectBR, 2, {scaleX:-20}, 1.8)
	//tl.to(rectBL, 2, {scaleY:-10}, 1.8)
	tl.to(frame, 2, {attr:{rx:"30"}})
	tl.to(posts, 2, {scaleY:-16}, 1.8)
	tl.to(midPost, 2, {scaleX:36})

	var cnAbacus = new abacus("chineseAbacus", 6, 2, 5);
	cnAbacus.fillBeads();

/*	var jpAbacus = new abacus("japaneseAbacus", 7, 1, 4);
	jpAbacus.fillBeads();*/
};

