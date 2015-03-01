 // Enemies our player must avoid
 //takes 3 variables-x is x position, y is y position,s for img choice
 var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = s;
    this.x=x;
    this.y=y;
    this.direction='r';
}

// Update the enemy's position, required method for game
    
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var collide;
    //moves across width of screen,then restart
    if(this.direction=='r'){//for right moving vehicles
    if (this.x < 505) {
     
     this.x+=this.x*dt/.8*Math.random()*5;
       //checks for collisions
      // console.log(this.x-player.x);
      //                                                                                                                                                                                                                             console.log(this.y-player.y);
      if(Math.abs(this.x-player.x)<30 && Math.abs(this.y-player.y)<42){
       document.getElementById('lose').style.display='block';
       player.collide+=1;
       console.log(player.collide);
       player.x=230;
       player.y=330;
       }

    } else {
        this.x=1*Math.random()*15;
        }}

    //handle left moving vehicles
    if(this.direction=='l'){
      if (this.x > 1) {
       this.x-=this.x*dt/.8*Math.random()*7;
       //checks for collisions
      // console.log(this.x-player.x);
      //                                                                                                                                                                                                                             console.log(this.y-player.y);
       if(Math.abs(this.x-player.x)<30 && Math.abs(this.y-player.y)<42){
       document.getElementById('lose').style.display='block';
       player.collide+=1;
       player.x=230;
       player.y=330;
       }

    } else {
        this.x=500-Math.random()*10;
        document.getElementById('lose').style.display='none';


    }}

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
    this.collide=0;
    this.status="";
    

}
// This class requires an update(), render() and
// a handleInput() method.

// Draw the player on the screen
Player.prototype.render = function() {
   
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);ctx.fillStyle="gray";
    ctx.fillRect(15,60,150,20);
    ctx.fillRect(350,60,140,20);
    ctx.strokeText("Collisions: "+this.collide,40,73);
    ctx.strokeText(this.status,355,75);
    
}


//Update player
//takes 2 variables key pressed & whether to inc/dec
Player.prototype.update = function(r,keyp){
    var r=r;
    var kp=keyp;
    
    
    //moves player 1 block on screen right or left
    if (kp=="right" || kp=="left") {
    if (this.x+90*r>-38 && this.x+90*r<500) {
        this.x+=90*r;

    }
}
   //moves player 1 block  if up or down key pressed
   if (kp=="up" || kp=="down") {
   if (this.y+85*r>-69 && this.y+85*r<500) {
        this.y+=85*r;

    }
}
   //checks if the player won by safely crossing
   if (this.y<=-10) {
    
    this.status="Winner!Space to go again.";
    
    
    if(kp=='space'){
    this.y=330;
    this.x=230;
    player.collide=0;
    this.status="";
   
   }
   
   
  
   
   
   }
}

//Handle input
Player.prototype.handleInput = function(keyp){
    this.status="Crossing...";
    var kp = keyp;
    var result = 0;
    
    switch (kp) {
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
    player.update(result,kp);

}


// Now instantiate your objects.
var image1 = 'images/Beetle-car.png';
var image2 = 'images/cyberscooty-truck.png';
var image3 = 'images/Dumptruck.png';
var p1 = new Player(230,330);
var e1 = new Enemy(7,223,image1);
var e2 = new Enemy(490,135,image2);
var e3 = new Enemy(15,55,image3);
e2.direction='l';
// Place all enemy objects in an array called allEnemies
var allEnemies = [e1,e2,e3];
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
