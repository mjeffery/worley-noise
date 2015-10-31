(function($) {
	function generatePoints(w, h, numPoints) {
		var points = [];
		for(var i = 0; i < numPoints; i++) {
			points.push(nextPoisson(points, 50));
		}

		return points;
	}

	function nextPoisson(points, minDist, maxRetries) {
		var minDistSq = minDist * minDist;
		if(!maxRetries) maxRestries = 100;

		function notTooClose(x, y) {
			for(var i = 0; i < points.length; i++) {
				var p = points[i];
				if(distSq(x, y, p.x, p.y) < minDistSq)
					return false;
			}

			return true;
		}

		var x, y, tries = 0;
		do {
			x = randInRange(0, w);
			y = randInRange(0, h);
			tries++;
		} while(tries < maxRetries && notTooClose(x, y));

		return { x: x, y: y };
	}

	function randInRange(min, max) {
		var range = max - min;
		return Math.floor(range * Math.random());
	}

	function distSq(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return dx*dx + dy*dy;
	}

	$(window).ready(function() {
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		var img = ctx.getImageData(0, 0, canvas.width, canvas.height);

		$('#reset-points-btn').click(function(event) {
			ctx.fillStyle = 'white';
			ctx.fillRect(0,0, canvas.width, canvas.height);
			ctx.fillStyle = 'black';
			
			var points = generatePoints(canvas.width, canvas.height, 10);
			points.forEach(function(p) {
				ctx.fillRect(p.x, p.y, 1, 1);
			});
		});
		
	});
})(jQuery);
