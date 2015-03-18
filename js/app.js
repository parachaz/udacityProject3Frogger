/*
 * Returns a random number between p1 and p2
 * @param {type} p1
 * @param {type} p2
 * @returns {Number}
 */

var generateRandomNumber = function (p1, p2) {
    return Math.floor(Math.random() * (p1 - p2) + p2);

};

// Enemies our player must avoid
var Enemy = function (id) {
    //Give each enemey a radom starting x-axis position 
    this.x = generateRandomNumber(50, 5);
    this.id = id;
    this.row = id;
    //We will use 75 as a multipler to give y-axis spacing among the enemies
    var spacing = id * 75;

    //Assign a radom y-axis value to the enemy
    this.y = generateRandomNumber(spacing, spacing - 20);
    if (id === 1) {
        this.y = 61;

    }
    else if (id === 2) {
        this.y = 145;
    } else if (id === 3) {
        this.y = 228;
    }
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var movement = generateRandomNumber(100, 10);
    this.x += dt * movement;

    //Reset enemy's positon if goes too far on the right.
    if (this.x > 550) {
        this.resetPosition();
    }

    if (Math.abs(this.x - player.x) < 16 && Math.abs(this.y - player.y) < 16) {
        player.x = 215;
        player.y = 435;
        player.lives--;
    }


};
/*
 * Resets Enemy's x-axis position to a random value. 
 *
 */
Enemy.prototype.resetPosition = function () {
    this.x = generateRandomNumber(this.id * 75, this.id * 5);

};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
 * Player class represents the player
 * @param {type} x : Starting X-axis value
 * @param {type} y : Starting Y-axis value
 * @returns {Player}
 */

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0; //initialize the score to 0
    this.lives = 3;//intialize to lives to maximum of 3
    this.row = 0;
};

/*
 * Updates Player's position
 */
Player.prototype.update = function () {
    if (this.x > 442) {
        this.x = 5;
        this.y = this.y + 5;
    }
    if (this.x < 0) {
        this.x = 440;
    }
    //Add 1000 points to the score if the player has reached the water
    if (this.y < 0) {
        this.score = this.score + 1000;

    }
    if (this.y > 400 || this.y < 0) {

        this.y = 400;
    }
};
/*
 * Renders player on the canvas
 */
Player.prototype.render = function () {
    ctx.font = "20px Georgia";
    ctx.clearRect(450, 10, 250, 25);
    ctx.fillText(this.score, 450, 30, 250);
    var imageObj = new Image();
    imageObj.src = 'images/Heart.png';
    ctx.clearRect(0, 0, 170, 50);

    for (i = 0; i < this.lives; i++) {

        ctx.drawImage(imageObj, (i) * 45, 0, 50, 50);
    }

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.lives < 1) {
        this.x = 3 * 101;
        this.y = 5 * 83;
        this.die();
    }

};
/*
 * Stop the game and display Game over message.
 */
Player.prototype.die = function () {
    ctx.font = "40px Verdana";
    ctx.fillStyle = '#f00';

    ctx.fillText("Game Over!", 150, 295);
    ctx.drawImage(Resources.get('images/grass-block.png'), 3 * 101, 5 * 83);
};

Player.prototype.handleInput = function (keyCode) {
    if (this.lives < 1) {
        return;
    }
    /*
     Reposition the player with each of following key presses.
     Up key will move the player upward on y-axis
     Down key will move the player downwards
     Right key will move the player to the right on x-axis
     Left key will move the player to the left on x-axis
     */
    var yDelta = 83; //Player's distance on y-axis with each key press.
    var xDelta = 101; //Player's distance on x-axis with each key press.
    if (keyCode === 'left') {
        this.x -= xDelta;
        //if the player moved too far to the left
        //make is appear on the other side of the game board
        if (this.x < 3) {
            this.x = 405;
        }
    } else if (keyCode === 'right') {
        this.x += xDelta;
        //if the player moved too far to the right
        //make is appear on the other side of the game board
        if (this.x > 415) {
            this.x = 3;
        }
    } else if (keyCode === 'down') {
        this.y += yDelta;

    } else if (keyCode === 'up') {
        this.y -= yDelta;

    }
    if (this.y < 317 && this.y > 68) {
        this.row = (this.y - 83) % 3;
    } else if (this.y === 68) {
        this.row = 3;
    } else {
        this.row = 0;
    }
    this.update();
};

//Instantiate enemies and player objects.
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
var player = new Player(205, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
