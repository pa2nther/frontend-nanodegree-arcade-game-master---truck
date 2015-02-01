//add text to the 2 divs in index
 document.getElementById('win').style.display='none';
 document.getElementById('lose').style.display='none';
 document.getElementById('timec').style.display='none';
 var d=document.getElementById('win');
 d.innerHTML+='<h1>You Win!Press space to play again.</h1>';
 var l=document.getElementById('lose');
 l.innerHTML+='<h1>You were hit. Try again</h1>';
 // Enemies our player must avoid
//takes 3 variables-x is x position, y is y position,s for img choice
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;

}

// Update the enemy's position, required method for game
    
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //moves across width of screen,then restart
    if (this.x < 505) {
       this.x+=this.x*dt*Math.random()*8;
       //checks for collisions
      // console.log(this.x-player.x);
      //                                                                                                                                                                                                                             console.log(this.y-player.y);
       if(Math.abs(this.x-player.x)<30 && Math.abs(this.y-player.y)<42){
       document.getElementById('lose').style.display='block';
       player.x=230;
       player.y=330;
       }

    } else {
        this.x=1*Math.random()*15;
         document.getElementById('lose').style.display='none';

    }

    }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
//Player-The Star of the game
//can take 3 variables-x is x position, y is y position, s is image choice
var Player = function(x,y,s){
    this.sprite = 'images/char-pink-girl.png';
    this.x=x;
    this.y=y;
    this.timetocross=0;

}
// This class requires an update(), render() and
// a handleInput() method.

// Draw the player on the screen
Player.prototype.render = function() {
   
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}


//Update player
//takes 2 variables key pressed & whether to inc/dec
Player.prototype.update = function(r,i){
    var r=r;
    var i=i;
    
    
    //moves player 1 block on screen right or left
    if (i=="right" || i=="left") {
    if (this.x+90*r>-38 && this.x+90*r<500) {
        this.x+=90*r;

    }
}
   //moves player 1 block  if up or down key pressed
   if (i=="up" || i=="down") {
   if (this.y+85*r>-69 && this.y+85*r<500) {
        this.y+=85*r;

    }
}
   //checks if the player won by safely crossing
   if (this.y<=-10) {
    
    document.getElementById('win').style.display='block';
    
    var t=document.getElementById('timec');
    if(i=='space'){
    this.y=330;
    this.x=230;
   document.getElementById('win').style.display='none';
   }
   
   
  
   
   
   }
}

//Handle input
Player.prototype.handleInput = function(i){
    var i=i;
    var result=0;
    
    switch (i) {
        case "left":
        result=-1;
        break;
        case "down":
        result=1;
        break;
        case "up":
        result=-1;
        break;
        case "right":
        result=1;
        break;
       

    }
    player.update(result,i);

}


// Now instantiate your objects.
var p1 = new Player(230,330);
var e1 = new Enemy(7,223);
var e2 = new Enemy(10,135)
// Place all enemy objects in an array called allEnemies
var allEnemies = [e1,e2];
// Place the player object in a variable called player
var player = p1;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
