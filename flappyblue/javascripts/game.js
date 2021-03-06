(function() {
	highScore = 0;
	var Game = window.Game = function(canvas) {
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext("2d");
		this.canvas = canvas;
		this.ctx.font = "40px Arial";
	}

	Game.prototype = {
		start: function(){

			this.level = new Level(canvas);
			this.bird = new Bird((this.width/2 - 40), (this.height/2) - 40, 60, 50);
			var that = this;
			setTimeout(function() {
				that.level.drawBackground();
				that.ctx.beginPath();
				that.ctx.fillStyle = "black";
				that.ctx.rect(200, 200, 250, 80);
				that.ctx.fill();

				that.ctx.fillStyle = "red";
				that.ctx.fillText("Get Ready!", 225, 250)

			}, 150);

			setTimeout(function(){
				that.play();}, 2000);
				this.canvas.addEventListener("mousedown", this.bird.flap.bind(this.bird));
			},

				drawGameOver: function(){
					this.ctx.beginPath();
					this.ctx.fillStyle = "black";
					this.ctx.rect(160, 200, 320, 80);
					this.ctx.fill();

					this.ctx.fillStyle = "yellow";
					this.ctx.fillText("GAME OVER", 200, 250)
				},
				drawScore: function(){
					this.ctx.strokeStyle="black";
					this.ctx.lineWidth = 2;
					this.ctx.fillStyle = "yellow";
					this.ctx.fillText("Top score: " + highScore, 390, 40);
					this.ctx.strokeText("Top score: " + highScore, 390, 40);
					this.ctx.fillText("Score: " + this.level.score, 390, 80);
					this.ctx.strokeText("Score: " + this.level.score, 390, 80);
				},
				tick: function() {
					this.level.tick();
					this.bird.tick(this.ctx);
					this.level.checkScore(this.bird.getBounds());
					this.drawScore();

					var birdCoords = this.bird.getBounds();
					if (this.level.collidesWith(birdCoords)) {
						this.drawGameOver();
						clearInterval(this.gameInterval);

					}
				},
				play: function() {
					this.gameInterval = setInterval(this.tick.bind(this), (1000/60));
				}
			}
		})();
