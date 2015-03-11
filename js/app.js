var generateRandomNumber =  function (p1, p2){
    var randomNum =  Math.floor(Math.random() * (p1) + p2);
    //console.log("Random randomNum =" + randomNum);
    return randomNum;
};
// Enemies our player must avoid
var Enemy = function (id, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    /*x = Math.floor(Math.random() * (20) + 5);
    y = Math.floor(Math.random() * (80) + 5);*/
    x = generateRandomNumber (20, 5);
    y = generateRandomNumber (id*90, 30);
    this.id = id;
    this.x = x ;//* id;
    this.y = y;//y * id;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var movement = generateRandomNumber(100, 10);
    this.x +=  dt * movement;
    if (this.y===0 || this.x > 550 || this.x<1) {
        this.resetPosition();
    }
    if (Math.abs(this.x - player.x) < 16 && Math.abs(this.y - player.y) < 16) {
        player.x = 215;
        player.y = 435;
        player.lives--;
        player.render();
    }
    this.render();

};
Enemy.prototype.resetPosition = function () {
    /*this.x = Math.floor(Math.random() * (20) + 0);
    this.y = Math.floor(Math.random() * (250) + 5);*/
    this.x = generateRandomNumber(20,0);
    this.y = generateRandomNumber(250,5);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 3;
};

Player.prototype.update = function () {
    console.log(this.y);
    if (this.x > 442) {
        this.x = 5;
        this.y = this.y + 5;
    }
    if (this.x < 0) {
        this.x = 440;
    }
    if (this.y < 0) {
        this.score = this.score + 1000;

    }
    if (this.y > 435 || this.y < 0) {

        this.y = 435;
    }

    this.render();
};

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

    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.lives < 1) {
        this.x = 3 * 101;
        this.y = 5 * 83;
        this.die();
    }

};
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
    /*move the player by 15 unit on each key press.
    Up key will move the player upward on y-axis
    Down key will move the player downwards
    Right key will move the player to the right on x-axis
    Left key will move the player to the left on x-axis
    */
    var delta = 15;
    if (keyCode === 'left') {
        this.x -=  delta;
    } else if (keyCode === 'right') {
        this.x +=  delta;
    } else if (keyCode === 'down') {
        this.y += this.y;
    } else if (keyCode === 'up') {
        //this.score=this.score+10;
        this.y -= delta;

    }
    this.update();
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy(1, 1, 65);
allEnemies[0] = enemy1;
var enemy2 = new Enemy(2, 5, 100);
allEnemies[1] = enemy2;
var enemy3 = new Enemy(3, 75, 200);
allEnemies[2] = enemy3;
var player = new Player(225, 435);

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
