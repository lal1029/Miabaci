'use strict';

window.onload = function() {
	var parent = document.getElementById('scene1'),
	//var parent = document.body,
		element = this.element = document.createElement('div'),
		colors = ['#61AC27', '#FF6600', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#FF5722'],
		i = 10,
		animationOffset = 0,

		createDot = function() {
			var dot = document.createElement('div');
			element.appendChild(dot);
			TweenLite.set(dot, {
				width: dotSize,
				height: dotSize,
				x:radius,
				//backgroundColor: color,
				borderRadius: '50%',
				force3D: true,
				position: 'absolute'
			});
			return dot;
		},
		dots = [],
		tl = new TimelineMax({
			//paused: true
			repeat: 2,
			//repeatDeplay: 0.01
		}),
		dot, j, dotSize, radius;

		parent.appendChild(element);
		TweenLite.set(element, {
			top: '40%',
			left: '42%',
			position: 'relative',
			overflow: 'visible',
			perspective: 600
		});

		while (--i > -1) {
			//dotSize = Math.floor(Math.random()*(22)+10);
			dotSize = 24;
			//radius = Math.floor(Math.random()*(32));
			radius = dotSize/2;
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
		}

		if (TweenLite.render) {
			TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
		}
};
