/* Requires Explorer Canvas (excanvas.js) */
(function($) {
	function checkCanvas(obj, full) {
		var canvas;
		
		/* Create a canvas element if one doesn't exist */
		if (!obj.find('canvas').get(0)) {
			if (full) {
				/* Bind event to change canvas dimensions on window resize */
				obj.css({height: $(window).height()});
				canvasHeight = $(window).height();				
				obj.css({width: $(window).width()});
				canvasWidth = $(window).width();
			} else {
				canvasHeight = obj.css('height');
				canvasWidth = obj.css('width');
			}
			obj.html('<canvas height="' + canvasHeight + '" width="' + canvasWidth + '" style="left: 0; position: absolute; top: 0;"></canvas>').appendTo('body');
		}
		
		/* Set canvas variable with the canvas DOM element */
		canvas = obj.find('canvas').get(0);
	
		/* Check if we're emulating the canvas with ExplorerCanvas and fix 
		the issue with the getContext method not being supported. (via: 
		http://groups.google.com/group/google-excanvas/browse_thread/thread/b73e8820a43344e0#) */
		if (typeof window.G_vmlCanvasManager != 'undefined') 
			canvas = window.G_vmlCanvasManager.initElement(canvas);

		return canvas;
	}

	$.fn.canvas = function(options) {
		/* Default options */
		var defaults = {
			full: 0
		};
		
		/* Extend default options with those provided */
		var opts = $.extend(defaults, options);
		
		/* Iterate over each matched element */
		return this.each(function() {
			var obj = $(this);
			var canvas = checkCanvas(obj, opts.full);
		});
	};
	
	$.fn.fillRect = function(options) {
		/* Default options */
		var defaults = {
			posX: 0, // Horizontal position of start point
			posY: 0, // Vertical position of start point
			width: 50, // Rectangle width
			height: 50, // Rectangle height
			fillStyle: '#000' // Fill colour as a hex, RGB(a) or keyword value
		};
		
		/* Extend default options with those provided */
		var opts = $.extend(defaults, options);

		/* Iterate over each matched element */
		return this.each(function() {		
			var obj = $(this);
			var canvas = checkCanvas(obj);
			
			if (canvas.getContext) {
				/* Store the rendering context in the object */
				var ctx = canvas.getContext('2d');
				
				/* Set the fill colour */	
				ctx.fillStyle = opts.fillStyle;
				
				/* Create rectangle */
				ctx.fillRect(opts.posX, opts.posY, opts.width, opts.height); // fillRect() draws immediately to canvas
			} else {
				/* Canvas unsupported code */
			}
		});
	};
	
	$.fn.fillArc = function(options) {		
		/* Default options */
		var defaults = {
			posX: 0, // Horizontal position of start point
			posY: 0, // Vertical position of start point
			radius: 25, // Radius of arc
			startAngle: 0, // In radians (Use "(Math.PI/180)*degrees")
			endAngle: Math.PI*2, // In radians (Use "(Math.PI/180)*degrees")
			antiClockwise: true, // Direction of drawing
			fillStyle: '#000' // Fill colour as a hex, RGB(a) or keyword value
		};
		
		/* Extend default options with those provided */
		var opts = $.extend(defaults, options);
		
		/* Iterate over each matched element */
		return this.each(function() {
			var obj = $(this);
			var canvas = checkCanvas(obj);	
			
			if (canvas.getContext) {	
				/* Store the rendering context in the object */
				var ctx = canvas.getContext('2d');
					
				/* Set the fill colour */		
				ctx.fillStyle = opts.fillStyle;
	    		
	    		/* Create arc */
	    		ctx.beginPath();
	    		ctx.arc(opts.posX, opts.posY, opts.radius, opts.startAngle, opts.endAngle, opts.anticlockwise);
				ctx.fill(); // Could use ctx.stroke();		
			} else {
				/* Canvas unsupported code */
			}
		});
	};
	
	$.fn.bezierCurveTo = function(options) {
		/* Default options */
		var defaults = {
			posX: 0, // Horizontal position of start point
			posY: 0, // Vertical position of start point
			cp1x: 0,
			cp1y: 0,
			cp2x: 0,
			cp2y: 0,
			endX: 0,
			endY: 0,
			strokeStyle: '#000', // Stroke colour as a hex, RGB(a) or keyword value
		}
			
		/* Extend default options with those provided */
		var opts = $.extend(defaults, options);
		
		/* Iterate over each matched element */
		return this.each(function() {
			var obj = $(this);
			var canvas = checkCanvas(obj);	
			
			if (canvas.getContext) {	
				/* Store the rendering context in the object */
				var ctx = canvas.getContext('2d');
					
				/* Set the fill colour */		
				ctx.strokeStyle = opts.strokeStyle;
	    		
	    		/* Create curve */
	    		ctx.beginPath();
				ctx.moveTo(opts.posX, opts.posY);
				ctx.bezierCurveTo(opts.cp1x, opts.cp1y, opts.cp2x, opts.cp2y, opts.endX, opts.endY);
				ctx.stroke();
			} else {
				/* Canvas unsupported code */
			}
		});
	}
})(jQuery);