var FormObj = (function () {
	var FormObj = function (gridcontainer,board,speed,formtype,value) {
		this.gridcontainer = gridcontainer;
		this.board = board;
		this.speed = speed;
		this.formtype = formtype;
		this.value = value;
		this.x = [];
		this.y = [];
		this.cx;
		this.cy;
		this.timer;
		this.alive;
		this.init();
	}

	FormObj.prototype.init = function() {
		var form = tetrissupports.formType[this.formtype];
		for (var i = 0; i < 4; i++) {
			this.x[i] = form[i].x;
			this.y[i] = form[i].y;
		}

		this.cx = Math.ceil(this.x.reduce(function (a,b) {return a+b})*0.25) - 0.5;
		this.cy = Math.ceil(this.y.reduce(function (a,b) {return a+b})*0.25) - 0.5;

		this.creatForm();
		this.timer = 0;
		this.alive = true;
	}

	FormObj.prototype.creatForm = function() {
		$(".form-cell").css({
			borderColor: '#f4cd64',
			backgroundColor : '#f4cd64'
		});

		var x = [];
		var y = [];
		var value = this.value;
		for (var i = 0; i < 4; i++) {
			x[i] = this.x[i];
			y[i] = this.y[i];
		};
		var gridcontainer = this.gridcontainer;

		setTimeout(function () {
			$(".form-cell").remove();
			for (var i = 0; i < 4; i++) {
				gridcontainer.append('<div class="form-cell" id="form-cell-'+i+'">')
				var form = document.getElementById('form-cell-' + i);
				var formcell = $("#form-cell-"+i);
				formcell.css({
					top: tetrissupports.getTop(y[i],x[i]),
					left: tetrissupports.getLeft(y[i],x[i]),
					borderColor: tetrissupports.getBorderColor[value],
					backgroundColor: tetrissupports.getBackgroundColor[value]
				})
			}
		},100);
	}

	FormObj.prototype.updateView = function() {
		for (var i = 0; i < 4; i++) {
			var formcell = $("#form-cell-"+i);
			formcell.css({
				top: tetrissupports.getTop(this.y[i],this.x[i]),
				left: tetrissupports.getLeft(this.y[i],this.x[i])
			})
		}
	};

	FormObj.prototype.move = function(detatime) {
		var board = this.board;
		this.timer += detatime;
		if (this.timer > this.speed) {
			if(canMove(this.x,this.y,board)){
				for (var i = 0; i < 4; i++)
					this.y[i]++;
				
				this.cy++;
			}
			else{
				for (var i = 0; i < 4; i++)
					board[this.y[i]][this.x[i]] = this.value;
				this.alive = false;
			}
			this.timer = this.timer % this.speed; 
			this.updateView();
		}
	}

	FormObj.prototype.moveLeft = function() {
		if(canMoveLeft(this.x , this.y,this.board)){
			for (var i = 0; i < 4; i++)
				this.x[i]--;
			
			this.cx--;

			this.updateView();
		}
	}

	FormObj.prototype.moveRight = function() {
		if(canMoveRight(this.x , this.y, this.board)){
			for (var i = 0; i < 4; i++)
				this.x[i]++;
				
			this.cx++;

			this.updateView();		}
	}

	FormObj.prototype.speedchange = function(speed) {
		this.speed = speed;
	}

	FormObj.prototype.rotate = function() {
		var x = [];
		var y = [];
		for (var i = 0; i < 4; i++) {
			x[i] = this.x[i];
			y[i] = this.y[i];
		}
		for (var i = 0; i < 4; i++) {
			x[i] = this.cx + this.cy - this.y[i];
			y[i] = this.cy - this.cx + this.x[i];
			if (x[i] < 0 ||
				x[i] > 9 ||
				y[i] < 0 ||
				y[i] > 19 ||
				this.board[y[i]][x[i]] != 0) {
				return false;
			}
		}

		this.x = x;
		this.y = y;
		this.updateView();
	}

	function canMove (inputx,inputy,board) {
		var x = [],
			y = [];
		for (var i = 0; i < 4; i++) {
			x[i] = inputx[i];
			y[i] = inputy[i];
		};
		for (var i = 0; i < 4; i++) 
			if (y[i] == 19 || board[y[i] + 1][x[i]] != 0){
				return false;
				break;
			}

		return true;
	}
	function canMoveLeft (x , y, board) {
		for (var i = 0; i < 4; i++) 
				if (x[i] == 0 || board[y[i]][x[i] - 1] != 0)
					return false;

		return true;
	}

	function canMoveRight (x , y , board) {
		for (var i = 0; i < 4; i++) 
				if (x[i] == 9 || board[y[i]][x[i] + 1] != 0)
					return false;
			
		return true;
	}

	return FormObj;
})();