# Orientation

Author: Jasper Palfree (jasper@wellcaffeinated.net)

**Demo** site showing off these modules: http://wellcaffeinated.net/demos/device-orientation

## Requires

* Implementation following the AMD pattern (eg: [require.js](http://requirejs.org))
* jQuery 1.7+

## Overview

Orientation provides Javascript modules (following the AMD pattern) that allow you
to easily monitor device orientation for browsers that support it.

## Usage

### device-orientation module

This module is simply a facade to the deviceorientation implementations of webkit
and mozilla.

Use the `.subscribe(callback)` method to subscribe to events.

Callbacks are provided with 1 parameter (an object) containing:

* lr - Left Right tilt in degrees
* fb - Front Back tilt in degrees
* dir - Compass direction in degrees (support varies)
* grav - Vertical acceleration of device (support varies)

### device-gravity module

This module calculates the normalized projection of gravity along the device.
In other words, if you placed a ball on top of your device and tilted it, this
module would show you the components of acceleration of that ball relative to
the device.

Again, use the `.subscribe(callback)` method to subscribe to events.

Callbacks are provided with 2 parameters. The first containing:

* 	x - Projection of gravity along x axis (left to right is positive)
* 	y - Projection of gravity along y axis (top to bottom is positive)
* 	ang - Radial angle of gravity direction in RADIANS. ang = 0 is along positive x axis increasing towards positive y axis
* 	r - Radial magnitude of gravity. minimum: 0, maximum: 1

The second containing the device-orientation callback data.

### Example

	require(
		['device-gravity'],
		function(gravity){
			
			gravity.subscribe(function( g, dir ){
			
				console.log(g.x, g.y, g.r, g.ang);
				console.log(dir.lr, dir.fb, dir.dir);
			});
		}
	);
