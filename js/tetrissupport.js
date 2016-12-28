window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

var tetrissupports = {
	getTop:function (i,j) {
				return i*32 + 'px';
			},

	getLeft:function (i,j) {
				return j*32 + 'px';
			},
	getBorderColor:['#223','#108f0a','#9f2402','#02877c','#a51728','#7a4170','#737301','#535252'],

	getBackgroundColor:['#223','#0f610b','#5d1502','#01443e','#510e16','#492743','#333301','#686767'],

	formType:[[{x:5,y:0},{x:5,y:1},{x:5,y:2},{x:5,y:3}],
			  [{x:5,y:0},{x:4,y:1},{x:5,y:1},{x:6,y:1}],
			  [{x:5,y:0},{x:6,y:0},{x:5,y:1},{x:6,y:1}],
			  [{x:5,y:0},{x:5,y:1},{x:5,y:2},{x:6,y:2}],
			  [{x:6,y:0},{x:6,y:1},{x:6,y:2},{x:5,y:2}],
			  [{x:5,y:0},{x:6,y:0},{x:6,y:1},{x:7,y:1}],
			  [{x:5,y:0},{x:6,y:0},{x:4,y:1},{x:5,y:1}]],

	nextformType:[[{x:3,y:0},{x:3,y:1},{x:3,y:2},{x:3,y:3}],
				  [{x:3,y:1},{x:2,y:2},{x:3,y:2},{x:4,y:2}],
				  [{x:2,y:1},{x:3,y:1},{x:2,y:2},{x:3,y:2}],
				  [{x:3,y:1},{x:3,y:2},{x:3,y:3},{x:4,y:3}],
				  [{x:3,y:1},{x:3,y:2},{x:3,y:3},{x:2,y:3}],
				  [{x:2,y:1},{x:3,y:1},{x:3,y:2},{x:4,y:2}],
				  [{x:3,y:1},{x:4,y:1},{x:2,y:2},{x:3,y:2}]],

	scoreCount:[0,4,12,36,108]
}