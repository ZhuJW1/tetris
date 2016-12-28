(function () {
	var score;
	var board = [];
	var gridcell = [];
	var pain,form,predictform,nextform;
	var gridcontainer;
	var detatime,lasttime;
	var speed,timer;
	var count1,count2;

	$(document).ready(function(event) {
		$("#newgamebutton").click(function() {
			newgame();
		});
	});
	$(document).keydown(function(event) {
		switch(event.keyCode){
			case 37:
				form.moveLeft();
				predictform.updateView(form.x,form.y);
				break;
			case 39:
				form.moveRight();
				predictform.updateView(form.x,form.y);
				break;
			case 32:
				form.rotate();
				predictform.updateView(form.x,form.y);
				break;
			case 40:
				form.speedchange(30);
				break;
			default:break;
		}
	});

	function newgame () {
		init();
		detatime = 0;
		lasttime = new Date();
		gameloop();
	}

	function init () {
		score = 0;
		gridcontainer = $("#grid-container");
		speed = 1000;
		timer = 0;
		count1 = 19;
		count2 = 0;
		for (var i = 0; i < 20; i++) {
			board[i] = [];
			gridcell[i] = [];
			for (var j = 0; j < 10; j++) {
				board[i][j] = 0;
				gridcell[i][j] = $("#grid-cell-"+i+"-"+j);
			}
		}
		var ran1 = Math.floor(Math.random()*7);
		var ran2 = Math.ceil(Math.random()*6);
		pain = new Pain(gridcell);
		form = new FormObj(gridcontainer,board,speed,ran1,ran2);
		predictform = new PredictFormObj(gridcontainer,board,form.x,form.y);
		nextform = new NextFormObj();
	}

	function gameloop(){
		

		var now = new Date();
		detatime = now - lasttime;
		lasttime = now; 

		timer += detatime;
	    if (timer > 60 * 1000) {
	    	if (speed > 200)
	    		speed -= 100;
	    	
			timer %= 60 * 1000;
		}

		form.move(detatime);
		if(isGameOver()){
			if (gameOver()) {
				return;
			}
		}else{
			if (!form.alive) {
				board = form.board;
				delateline();
				pain.updateView(board);
				form = new FormObj(gridcontainer,board,speed,nextform.formtype,nextform.value);
				predictform = new PredictFormObj(gridcontainer,board,form.x,form.y)
				nextform = new NextFormObj();
			}
		}
		requestAnimFrame(gameloop);
	}

	function delateline () {
	var line = 0;
	for (var i = 0; i < 20; i++) {
		var number = 0;
		for (var j = 0; j < 10; j++) 
			if (board[i][j] != 0) 
				number++

		if (number == 10) {
			line ++;
			for (var k = i; k > 0; k--) {
				for (var l = 0; l < 10; l++) {
					board[k][l] = board[k-1][l];
				}
			}
			gridcontainer.append('<div class="linedelate" id="linedelate-'+line+'">');
			$("#linedelate-"+line).css({
				top: tetrissupports.getTop(i,1)
			});
		}
		
	}
	setTimeout(function () {
		$(".linedelate").remove();
	},100);
	score += tetrissupports.scoreCount[line];
	$("#score").text(score);
	}

	function isGameOver () {
		for (var i = 0; i < 10; i++) {
			if (board[0][i]!= 0) {
				return true;
			}
		}

		return false;
	}

	function gameOver () {
		var ran = Math.ceil(Math.random()*6);
		gridcell[count1][count2].css({
			borderColor: tetrissupports.getBorderColor[ran],
			backgroundColor: tetrissupports.getBackgroundColor[ran]
		});
		if (count2 ==9) {
			if (count1 == 0)
				return true;
			count2 = 0;
			count1 --;
		}else{
			count2++;
		}
	}
})();