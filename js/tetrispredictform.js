var PredictFormObj = (function () {
	var PredictFormObj = function (gridcontainer,board,x,y) {
		this.gridcontainer = gridcontainer;
		this.board = board;
		this.x = x;
		this.formy = y;
		this.y = [];
		this.init();
	}

	PredictFormObj.prototype.init = function() {
		this.countY();
		this.createPredictForm();
	}

	PredictFormObj.prototype.createPredictForm = function() {
		$(".predictform-cell").remove();
		var gridcontainer = this.gridcontainer;
		this.countY();
		for (var i = 0; i < 4; i++) {
			gridcontainer.append('<div class="predictform-cell" id="predictform-cell-'+i+'">');
			var predictformcell = $("#predictform-cell-"+i);
			predictformcell.css({
				top: tetrissupports.getTop(this.y[i], this.x[i]),
				left: tetrissupports.getLeft(this.y[i], this.x[i]),
				borderColor: tetrissupports.getBorderColor[7],
				backgroundColor : tetrissupports.getBackgroundColor[7]
			});
		}
	}
	PredictFormObj.prototype.updateView = function(x,y) {
		this.x = x;
		this.formy = y;
		this.countY();
		for (var i = 0; i < 4; i++) {
			var predictformcell = $("#predictform-cell-"+i);
			predictformcell.css({
				top: tetrissupports.getTop(this.y[i], this.x[i]),
				left: tetrissupports.getLeft(this.y[i], this.x[i])
			});
		}
	}

	PredictFormObj.prototype.countY = function() {
		var deta = predictdeta(this.x,this.formy,this.board);
		for (var i = 0; i < 4; i++) {
			this.y[i] = this.formy[i] +deta;
		}
	}

	function predictdeta(x,y,board) {
		for (var i = 1; i < 20; i++) {
			for (var j = 0; j < 4; j++) {
				var h = y[j] + i;
				if (h > 19 || board[h][x[j]] != 0) {
					return i - 1;
				}
			}
		}
	}

	return PredictFormObj;
})();