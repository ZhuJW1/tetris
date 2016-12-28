var NextFormObj = (function () {
	var NextForm = function  () {
		this.x = [];
		this.y = [];
		this.formtype;
		this.value;
		this.init();
	}

	NextForm.prototype.init = function() {
		this.formtype = Math.floor(Math.random()*7);
		var nextform = tetrissupports.nextformType[this.formtype];
		for (var i = 0; i < 4; i++) {
		 	this.x[i] = nextform[i].x;
		 	this.y[i] = nextform[i].y;
		 }

		this.value = Math.ceil(Math.random()*6);
		this.createNextForm();
	}

	NextForm.prototype.createNextForm = function() {
		for (var i = 0; i < 5; i++) 
			for (var j = 0; j < 5; j++) 
				$("#nextgrid-cell-"+i+"-"+j).css({
					top: tetrissupports.getTop(i,j),
					left: tetrissupports.getLeft(i,j),
					borderColor: tetrissupports.getBorderColor[0],
					backgroundColor : tetrissupports.getBackgroundColor[0]
				});
		
		for (var i = 0; i < 4; i++) {
			$("#nextgrid-cell-"+this.y[i]+"-"+this.x[i]).css({
			borderColor: tetrissupports.getBorderColor[this.value],
			backgroundColor : tetrissupports.getBackgroundColor[this.value]
			});
		}
	}

	return NextForm;
})();