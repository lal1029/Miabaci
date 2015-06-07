var dancingDotsTest = function() {
	//var parent = document.getElementById('scene1'),
	var parent = document.body,
		element = this.element = document.createElement('div'),
		//colors = ['#61AC27', '#FF6600', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#FF5722'],
		colors = ['#FF6600', '#F44336'],
		i = 10,
		animationOffset = 0,
		rotationIncrement = 360/i,

		createDot = function() {
			var dot = document.createElement('div');
			element.appendChild(dot);
			TweenLite.set(dot, {
				width: dotSize-5,
				height: dotSize-5,
				x:radius,
				//backgroundColor: color,
				borderRadius: '50%',
				force3D: true,
				position: 'absolute'
			});
			return dot;
		},
		dots = [],
		
		animation = new TimelineLite(),

		openingDots = new TimelineMax({
			//paused: true
			repeat: -1,
			//repeatDeplay: 0.01
		}),
		dot, j, dotSize, radius, tl, closingDots;

		// Adding the empty child element to the body
		parent.appendChild(element);
		TweenLite.set(element, {
			top: '50%',
			left: '50%',
			position: 'fixed',
			overflow: 'visible',
			perspective: 600,
		});

		dotSize = 26;
		radius = 26;
		var xAxis = Math.ceil($(window).width()/2.0);
		var yAxis = Math.ceil($(window).height()/2.0);
		var yPos = yAxis-dotSize/2;

		for(yPos; yPos > -yAxis; yPos-=dotSize)
		{
			var xPos = -xAxis+dotSize/2;
			for(xPos; xPos < xAxis; xPos+=dotSize)
			{
				dot = createDot();
				dots.unshift(dot);
				var colorIndex = Math.floor(Math.random()*(colors.length));

				TweenLite.set(dot, {
					x: xPos,
					y: -yPos,
					backgroundColor : colors[colorIndex],
					opacity: Math.random()
				});
			}
		}

		openingDots.to(dots, 4, {
					skewY: "-=360",
					ease: Power2.easeInOut,
				}, animationOffset
			)

		//four dots circling around each other
/*		while(--i > -1) {
			dotSize = 32;
			radius = dotSize/2;

			var colorIndex = Math.floor(Math.random()*(colors.length));
			dot = createDot();
			dots.unshift(dot);

			TweenLite.set(dot, {
				transformOrigin: (-(radius+150-(dotSize/2))+'px 50%'),
				x: radius+150,
				rotation: i*rotationIncrement,
				backgroundColor: colors[colorIndex],
				opacity: 0.5
			});

			openingDots.to(dot, 2.5, {
				rotation: "+=360",
				ease: Power2.easeInOut
			}, animationOffset).to(
				dot, 1, {
					skewX: "+=360",
					ease: Power2.easeInOut
				}, animationOffset+2.5
			)
		}
		animation.add(openingDots);*/
		

		//Removing the initial dots 
		/*closingDots = new TimelineLite({
		});
		closingDots.set(dots, {
			opacity: 0}, 1);
		animation.add(closingDots);*/

		animationOffset = 1;
		i = 6;

		// Animating dots emerging from opposite sides 
		/*
		while (--i > -1) {
			//dotSize = Math.floor(Math.random()*(22)+10);
			dotSize = 80;
			//radius = Math.floor(Math.random()*(32));
			radius = dotSize/2;

			tl = new TimelineMax({
				repeat: -1
			});

			for(j=0; j<2; j++)
			{
				var colorIndex = Math.floor(Math.random()*(colors.length));
				dot = createDot();
				dots.unshift(dot); //Adding the dot to the beginning of the array

				var startPos = 80;
				var endPos = radius;
				var transformx = -(radius-(dotSize/2));
				if(j%2) {
					startPos = -80;
					endPos = -radius;
					transformx = dotSize+(radius-(dotSize/2));
				}

				tl.fromTo(dot, 1, {
					scale: 0.005,
					opacity: 0,
					ease: Power2.easeOut,
					x:startPos, 
					backgroundColor: colors[colorIndex]}, {
					scale: 1,
					opacity: 0.5,
					x: endPos}, 
					6*animationOffset).to(dot, 2, {
					transformOrigin: (transformx+"px 50%"),
					rotation: 180
					}, 6*animationOffset+1).to(dot, 1, {
					x:-startPos,
					ease: Power2.easeOut,
					scale: 0.05,
					opacity:0,
					backgroundColor: colors[j]
					}, 6*animationOffset+3);
			}
			animationOffset += 0.25;
			animation.add(tl, j*0.07);
			
		}
		*/
		if (TweenLite.render) {
			TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
		}
};