const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//variables

let score;
let highscore;
let player;
let gravity;
let obstracles;
let gameSpeed;
let keys = {};

//Event Listeners

document.addEventListener('keydown', function(event) {
    keys[event.code] = true;

});
document.addEventListener('keyup', function (event) {
    keys[event.code] = false;
});

class Player {
    constructor (x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;


        this.dy = 0;
        this.jumpForce = 15;
        this.originalHeight = h;
        this.grounded = false;
        this.jumpTimer = 0;
    }

    Animate (){
        //Jump 
        if(keys['Space'] || keys['KeyW']){
            this.Jump();
            console.log('jump');
        } else {
            this.jumpTimer = 0;
        }

        if(keys['ShiftLeft'] || keys ['KeyS']){
            this.h = this.originalHeight / 2;
        } else {
            this.h = this.originalHeight;
        }

        this.y+=this.dy;
        //Gravity
        if(this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }
        

        this.Draw();
    }

    Jump () {
        if(this.grounded && this.jumpTimer == 0){
            this.jumpTimer = 1;
            this.dy = -this.jumpForce;
        } else if(this.jumpTimer > 0 && this.jumpTimer < 15) {
            this.jumpTimer++;
            this.dy = -this.jumpForce - (this.jumpTimer / 50);
        }
    }

    Draw() {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    }

}

function Start() {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.font = "20px sans-serif";

    gameSpeed = 3;
    gravity = 1;
    
    score = 0;
    highscore = 0;

    player = new Player(25, canvas.height-150, 50, 50, '#FF5858');

    requestAnimationFrame(Update);
}

function Update () {
    requestAnimationFrame(Update);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.Animate();
    
}

Start();