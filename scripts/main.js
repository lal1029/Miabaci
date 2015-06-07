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

var Bead = function(value, options, canMoveUp) {
	this.value = value;
	this.shape = createBead(options);
	this.beadAbove = null;
	this.beadBelow = null;
	this.canMoveUp = canMoveUp;
	var self = this;

	this.moveBead = function() {
		
		// depending on the bead.canMoveUp property, animation bead movement and update the canMoveUp property
		if(!self.canMoveUp) {
			//moving the bead down
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(self.shape).webkitTransform);
			TweenLite.to(self.shape, 0.3, {
				y: curTransform.m42+51
			},1.8);

			if(self.beadBelow !== null && !self.beadBelow.canMoveUp) {
				self.beadBelow.moveBead();
			}
		}
		else {
			//moving bead up
			var curTransform = new WebKitCSSMatrix(window.getComputedStyle(self.shape).webkitTransform);
			TweenLite.to(self.shape, 0.3, {
				y: curTransform.m42-51
			}, 1.8);

			if(self.beadAbove !== null && self.beadAbove.canMoveUp) {
				self.beadAbove.moveBead();
			}		
		}

	 	self.canMoveUp = !self.canMoveUp;
	}

	this.shape.addEventListener("click", this.moveBead, false);
}

var abacus = function(abacusName, columns, topBeadCount, bottomBeadCount) {
	this.element = document.getElementById(abacusName);
	this.columns = columns;
	this.topBeadCount = topBeadCount;
	this.bottomBeadCount = bottomBeadCount;
	this.topLevelNodeHeads = []; 	//TODO:create some simple SVG shape to represent a bead. For now, using CSS
	this.bottomLevelNodeHeads = [];
	
	//TODO: Update these hard coded values for bead positions on the abacus
	this.beadsXAxis = [500, 430, 357, 283, 210, 140, 65];
	this.beadYAxisSpaceTop = 20;
	this.beadYAxisSpaceBottom = 190;
	this.beadYAxisMovementTop = 71;
	//this.currVal = 0;
}

///InsertBead - Inserting a bead into the head of a doubly-linked list 
// and return itself
abacus.prototype.insertBead = function(headBead, newBead) {
	newBead.beadBelow = headBead;
	headBead.beadAbove = newBead;
	return newBead;
}	

abacus.prototype.fillBeads = function() {
	//Loop through the number of columns the abacus contains
	for(var i=0; i<this.columns; i++)
	{
		var head = null;

		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		for (var j=this.topBeadCount-1; j>-1; j--) 
		{
			var beadWidth = 50;
			var beadHeight = 32;
			var beadShapeOptions = {color: '#61AC27', dotWidth: beadWidth, dotHeight: beadHeight, xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceTop+(j*beadHeight)};

			var value = Math.pow(10, i)*5;
			var newBead = new Bead(value, beadShapeOptions, false);
			this.element.appendChild(newBead.shape);

			if (head === null) {
				head = newBead;
			}
			else {
				var insertedNewBead = this.insertBead(head, newBead);
				head = insertedNewBead;
			}
		}
		this.topLevelNodeHeads.unshift(head);

		//Inserting the top-level beads where the initial position is the two beads aligning to the top
		head = null;

		for (var j=this.bottomBeadCount-1; j>-1; j--) 
		{
			var beadWidth = 50;
			var beadHeight = 32;
			var beadShapeOptions = {color: '#F44336', dotWidth: beadWidth, dotHeight: beadHeight, xPos:this.beadsXAxis[i], yPos:this.beadYAxisSpaceBottom+(j*beadHeight)};

			var value = Math.pow(10, i);
			var newBead = new Bead(value, beadShapeOptions, true);
			this.element.appendChild(newBead.shape);

			if (head === null) {
				head = newBead;
			}
			else {
				var insertedNewBead = this.insertBead(head, newBead);
				head = insertedNewBead;
			}
		}

		this.bottomLevelNodeHeads.unshift(head);
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
	var cnAbacus = new abacus("chineseAbacus", 7, 2, 5);
	cnAbacus.fillBeads();

	var jpAbacus = new abacus("japaneseAbacus", 7, 1, 4);
	jpAbacus.fillBeads();
};

