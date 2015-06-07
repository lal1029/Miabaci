'use strict';

//TODO: modify this to using SVG instead of CSS
function createBead(options) {
	options = options || {};
	var dotWidth = options.dotWidth || 50,
		dotHeight = options.dotHeight || 32, 
		color = options.color || 'Brown',
		//element = options.element || document.createElement("div"),
		xPos = options.xPos || 0,
		yPos = options.yPos || 0,
		bead;

	bead = document.createElement('div');
	//element.appendChild(bead);
	TweenLite.set(bead, {
		width: dotWidth,
		height: dotHeight,
		x:xPos,
		y:yPos,
		backgroundColor: color,
		borderRadius: '50% 50%',
		force3D: true,
		position: 'absolute'
	});
	return bead;
}

var debug = function(bead) {
	console.log("Bead value: "+bead.value);
	
	if (bead.beadAbove === null) {
		console.log(" - above: null")
	}
	else {
		console.log(" - above: "+bead.beadAbove.value);
	}

	if (bead.beadBelow === null) {
		console.log(" - below: null")
	}
	else {
		console.log(" - below: "+bead.beadBelow.value);
	}
}

var Bead = function(value, updateBead, options) {
	this.value = value;
	this.shape = createBead(options);
	this.updateBead = updateBead; //Since the beads on top adds by moving downwards while bottom beads adds by moving downwards, score function helps differentiate the top and the bottom
	this.beadAbove = null;
	this.beadBelow = null;
	var self = this;

	//move function returns 1 if bead moved up, return 0 if it did not move at all, and returns -1 if bead moved down
	this.move = function() {
		var direction = 0;

		console.log("\nTrying to move the bead");
		console.log("Original bead values:");
		debug(self);

		//If there's space below the current bead, then move the bead downwards by exchanging position with the dummy bead
		if(self.beadBelow !== null && self.beadBelow.value === 0) {		
			console.log("Moving bead down...");
			
			var tempSelfBelowBelow = self.beadBelow.beadBelow;

			//Taking care of connections with the node currently above it
			if (self.beadAbove !== null) {
				self.beadAbove.beadBelow = self.beadBelow;
			}
			self.beadBelow.beadAbove = self.beadAbove;

			//Taking care of connection between the newly moved up dummy node and node that moved down
			self.beadBelow.beadBelow = self;
			self.beadAbove = self.beadBelow;

			//Taking care of the connection below the dummy node
			self.beadBelow = tempSelfBelowBelow;
			if (self.beadBelow !== null) {
				self.beadBelow.beadAbove = self;
			}

			//TODO: Code for actually moving the shape downwards
			console.log("Dummy bead values:");
			debug(self.beadAbove);
			console.log("Updated bead values:");
			debug(self);

			direction = -1;
		}
		else if(self.beadAbove !== null && self.beadAbove.value === 0) { 
			console.log("Moving bead up...");

			var tempSelfAbove = self.beadAbove;
			var tempSelfBelow = self.beadBelow;

			//Taking care of connections with the node currently above it
			if (self.beadAbove.beadAbove !== null) {
				self.beadAbove.beadAbove.beadBelow = self;
			}
			self.beadAbove = self.beadAbove.beadAbove;
			
			//Taking care of connection between the newly moved up dummy node and node that moved down
			tempSelfAbove.beadAbove = self;
			self.beadBelow = tempSelfAbove;

			//Taking care of the connection below the dummy node
			if (tempSelfBelow !== null) {
				tempSelfBelow.beadAbove = self.beadBelow;
			}
			self.beadBelow.beadBelow = tempSelfBelow;

			//TODO: Code for actually moving the shape upwards
			console.log("Bead moved up");
			console.log("Dummy bead values:");
			debug(self.beadBelow);
			console.log("Updated bead values:");
			debug(self);

			direction = 1;
		}
		else {
			console.log("Bead cannot be moved from current position");
		}

		self.updateBead(direction, self.value, self.shape);
	}

	this.shape.addEventListener("click", this.move, false);
}


///InsertBead - Inserting a bead into the head of a doubly-linked list 
// and return itself
Bead.prototype.insertBead = function(headBead) {
	this.beadBelow = headBead;
	headBead.beadAbove = this;
	return this;
}

var Abacus = function(columns, topBeadCount, bottomBeadCount) {
	//this.parent = document.body;
	//this.parent = document.getElementById("abacusFrame");
	this.element = document.getElementById("abacusFrame");
	this.columns = columns;
	this.topBeadCount = topBeadCount;
	this.bottomBeadCount = bottomBeadCount;
	this.topLevelNodeHeads = []; 	//TODO:create some simple SVG shape to represent a bead. For now, using CSS
	this.bottomLevelNodeHeads = [];
	this.beadsXAxis = [500, 430, 357, 283, 210, 140, 65];
	this.beadYAxisSpaceTop = 20;
	this.beadYAxisSpaceBottom = 190;
	this.beadYAxisMovementTop = 71;
	//this.currVal = 0;
	
	var answer = document.getElementById("answer");

	/*this.parent.appendChild(this.element);
		TweenLite.set(this.element, {
			top: '50%',
			left: '50%',
			position: 'fixed',
			overflow: 'visible',
			perspective: 600,
		});*/
}

Abacus.prototype.fillBeads = function() {

	var UpdateBeadTop = function(direction, value, beadShape) {
		var answer = document.getElementById("answerTitle");
		var answerVal = document.getElementById("answer");
		var currVal = parseInt(answerVal.firstChild.nodeValue); //TODO: do it properly by holding the value in a variable

		if (direction === 0) {
			answer.firstChild.nodeValue += "+0";
		}
		else if(direction === -1) {
			answer.firstChild.nodeValue += "+"+value;
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(beadShape).webkitTransform);
			TweenLite.to(beadShape, 1.5, {
				y: curTransform.m42+51
			});

			answerVal.firstChild.nodeValue = currVal+value;
			//self.currVal += value;
		}
		else if(direction === 1) {
			answer.firstChild.nodeValue += "-"+value;
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(beadShape).webkitTransform);
			TweenLite.to(beadShape, 1.5, {
				y: curTransform.m42-51
			});

			answerVal.firstChild.nodeValue = currVal-value;
			//self.currVal -= value;
		}

		
	};

	var UpdateBeadBottom = function(direction, value, beadShape) {
		var answer = document.getElementById("answerTitle");
		var answerVal = document.getElementById("answer");
		var currVal = parseInt(answerVal.firstChild.nodeValue);

		if (direction === 0) {
			answer.firstChild.nodeValue += "+0";
		}
		else if(direction === -1) {
			answer.firstChild.nodeValue += "+"+value;
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(beadShape).webkitTransform);
			TweenLite.to(beadShape, 1.5, {
				y: curTransform.m42-35
			});
			answerVal.firstChild.nodeValue = currVal+value;
		}
		else if(direction === 1) {
			answer.firstChild.nodeValue += "-"+value;
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(beadShape).webkitTransform);
			TweenLite.to(beadShape, 1.5, {
				y: curTransform.m42+35
			});
			answerVal.firstChild.nodeValue = currVal-value;
		}
	};

	//Loop through the number of columns the abacus contains
	for(var i=0; i<this.columns; i++)
	{
		// The dummy bead is not displayed
		var dummyBead = new Bead(0);
		dummyBead.value = 0;
		var head = dummyBead;

		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		for (var j=this.topBeadCount-1; j>-1; j--) 
		{
			var beadWidth = 50;
			var beadHeight = 32;
			var beadShapeOptions = {color: '#61AC27', dotWidth: beadWidth, dotHeight: beadHeight, xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceTop+(j*beadHeight)};

			var value = Math.pow(10, i)*5;
			var newBead = new Bead(value, UpdateBeadTop, beadShapeOptions);
			this.element.appendChild(newBead.shape);
			var insertedNewBead = newBead.insertBead(head);
			head = insertedNewBead;
		}
		this.topLevelNodeHeads.unshift(head);

		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		head = dummyBead;
		for (var j=0; j<this.bottomBeadCount; j++) 
		{
			var beadWidth = 50;
			var beadHeight = 32;
			var beadShapeOptions = {color: '#F44336', dotWidth: beadWidth, dotHeight: beadHeight, xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceBottom+(j*beadHeight)};

			var value = Math.pow(10, i);
			var newBead = new Bead(value, UpdateBeadBottom, beadShapeOptions);
			this.element.appendChild(newBead.shape);
			var insertedNewBead = newBead.insertBead(head);
			head = insertedNewBead;
		}
		this.bottomLevelNodeHeads.unshift(head);
	}

	// For debugging
	/*
	for(var i=0; i<this.topLevelNodeHeads.length; i++)
	{
		console.log("Column number:"+i);
		var currBead = this.topLevelNodeHeads[i];
		while(currBead !== null)
		{
			console.log("Bead value: ", currBead.value);
			//currBead.shape.addEventListener("click", function(){move(currBead)}, false);
			currBead = currBead.beadBelow;
		}
	}
	*/
}

window.onload = function() {
	var abacus = new Abacus(7, 2, 5);
	abacus.fillBeads();
};

