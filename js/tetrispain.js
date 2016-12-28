var Pain = (function () {
	var Pain = function(gridcell){
		this.gridcell = gridcell;
		this.init();
	}

	Pain.prototype.init = function() {
		var gridcell = this.gridcell;
		for (var i = 0,lengthi = gridcell.length; i < lengthi; i++)
			for (var j = 0,lengthj = gridcell[i].length; j < lengthj; j++){
				gridcell[i][j].css({
					top: tetrissupports.getTop(i,j),
					left: tetrissupports.getLeft(i,j),
					borderColor: tetrissupports.getBorderColor[0],
					backgroundColor: tetrissupports.getBackgroundColor[0]
				});
			}
				
	}

	Pain.prototype.updateView = function(board) {
		var gridcell = this.gridcell;
		for (var i = 0,lengthi = gridcell.length; i < lengthi; i++)
			for (var j = 0,lengthj = gridcell[i].length; j < lengthj; j++)
					gridcell[i][j].css({
						borderColor: tetrissupports.getBorderColor[board[i][j]],
						backgroundColor: tetrissupports.getBackgroundColor[board[i][j]]
					});
				
	};

	return Pain;
})();