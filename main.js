//Creating a reference for the canvas for future functions
let canvas = document.getElementById('mycanvas');

let ctx = canvas.getContext('2d');

let ballRadius = 10;

let x = canvas.width/2;

let y = canvas.height - 30

let dx = 2;

let dy = -2;

// Creating the Paddle/Plate/Lineontheground...
let paddleHeight = 12;

let paddleWidth = 72;

//Where the paddle will start
let paddleX = (canvas.width-paddleWidth)/2;

//References for players using the controls
let rightPressed=false;

let leftPressed=false;

//The amount of blocks on screen to break
let blockRowCount = 4;

let blockColumnCount = 7;

let blockWidth = 72;

let blockHeight = 24;

let blockPadding = 12;

let blockOffsetTop = 32;

let blockOffsetLeft = 32;

//ScoreBoard
let score = 0;

//The Blocks are gonna be stored in arrays
let blocks = []
for (q = 0; q < blockColumnCount; q++){
        blocks[q] = [];
            for(l = 0; l < blockRowCount; l++){
            //Positioning of the Blocks
                 blocks[q][l] = {x: 0, y: 0, status: 1};
            }
}

document.addEventListener('keydown', keyDownHandler, false);

document.addEventListener('keyup', keyUpHandler, false);

document.addEventListener('mousemove', mouseMoveHandler, false);

//Syncing paddle movement with the mouse
mouseMoveHandler = (e) => {
    var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
}

keyDownHandler = (e) => {
    if(e.keyCode === 39){
        rightPressed = true;
    }
        else if (e.keyCode === 37){
            leftPressed = true;
        }
}

keyUpHandler = (e) => {
    if(e.keyCode === 39){
        rightPressed = false;
    }
            else if (e.keyCode === 37){
                leftPressed = false;
            }
}

drawBall = () => {
    ctx.beginPath()
    ctx.arc(x,y,ballRadius,0,Math.PI*2);//This is basically saying the ball is c=initially centered with the radius startimg at an angle of 0 an end angle ofMath.PI*2 in radians
    ctx.fillStyle = 'red';
    ctx.fill()
    ctx.closePath();
}

//This function creates the paddle
drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);//Same explanation as the ball's positioning but for the paddle.
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

}

//Creating a function to produce the blocks.





