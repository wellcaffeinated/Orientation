define(
	// Requirements
    [
		'jquery',
		'./device-orientation',
		'./pubsub'
	],
	// Init
	function( $, orientation, pubsub ) {
		
		var channel = '/device/orientation/gravity'
			,ps = pubsub(channel)
			;
		
		orientation.subscribe( function( dir ){
			
			var y = Math.sin(dir.fb*Math.PI/180)*Math.cos(dir.lr*Math.PI/180)
				,x = Math.sin(dir.lr*Math.PI/180)
				,ang = -Math.atan(x/y) + (y < 0? Math.PI : 0) + Math.PI/2 //from x axis clockwise
				,r = Math.sqrt(x*x+y*y)
				;
			  
			ps.publish({
				
				x: x,
				y: y,
				ang: ang,
				r: r
				
			}, dir);
		});
		
		/**
		 * callbacks are provided with 2 parameters. The first containing:
		 * 	x - Projection of gravity along x axis (left to right is positive)
		 * 	y - Projection of gravity along y axis (top to bottom is positive)
		 * 	ang - Radial angle of gravity direction in RADIANS. ang = 0 is along positive x axis increasing towards positive y axis
		 * 	r - Radial magnitude of gravity. minimum: 0, maximum: 1
		 *
		 * the second containing the orientation callback data
		 */
		
		return $.extend( {
			
			channel: channel
			
		}, ps );
	}
);