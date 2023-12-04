//Creating a reference for the canvas for future functions
let backDrop = document.getElementById('mybkgrnd');

let ctx = backDrop.getContext('2d');

let ballRadius = 10;

let x = backDrop.width/2;

let y = backDrop.height - 30

let dx = 2;

let dy = -2;

// Creating the Paddle/Plate/Lineontheground...
let paddleHeight = 12;

let paddleWidth = 72;

//Where the paddle will start
let paddleX = (backDrop.width-paddleWidth)/2;

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

//Syncing paddle movement with the mouse
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

mouseMoveHandler = (e) => {
    var relativeX = e.clientX - backDrop.offsetLeft;
        if(relativeX > 0 && relativeX < backDrop.width) {
            paddleX = relativeX - paddleWidth/2;
        }
}



document.addEventListener('keydown', keyDownHandler, false);

document.addEventListener('keyup', keyUpHandler, false);

document.addEventListener('mousemove', mouseMoveHandler, false);




createBall = () => {
    ctx.beginPath()
    ctx.arc(x,y,ballRadius,0,Math.PI*2);//This is basically saying the ball is initially centered with the radius starting at an angle of 0 an end angle of Math.PI*2 in radians
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}

//This function creates the paddle
createPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddleX, backDrop.height-paddleHeight, paddleWidth, paddleHeight);//Same explanation as the ball's positioning but for the paddle.
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

}

//Creating a function to produce the blocks.

createBlocks = () => {
    for(q = 0; q < blockColumnCount; q++){
        for(l = 0; l < blockRowCount; l++){
            if(blocks[q][l].status === 1){
                let blockA = (q* (blockWidth+blockPadding)) + blockOffsetLeft;
                let blockB = (l* (blockHeight+blockPadding)) + blockOffsetTop;

                blocks[q][l].x = blockA;
                blocks[q][l].y = blockB

                ctx.beginPath();
                ctx.rect(blockA, blockB, blockWidth, blockHeight);
                ctx.fillStyle = 'brown'
                ctx.fill();
                ctx.closePath();
            }
        }
    }
} 

//The scoreboard gotta work AND be pretty

createScore = () => {
    ctx.font = '18px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Score: ' + score, 8, 20);//This positions the scoreboard to 8,20 on the xy axis.
}


//The blocks get hit but nothing happens...FIX IT!!

crashBoomBash = () => {
    for(q = 0; q < blockColumnCount; q++){
        for(l = 0; l < blockRowCount; l++){
            let b = blocks[q][l];
            if(b.status === 1){
                if(x > b.x 
                    && x < b.x + blockWidth 
                    && y > b.y 
                    && y < b.y + blockHeight){
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score === blockRowCount*blockColumnCount){
                            alert('Well, look at you!~ You Win!!');
                            document.location.reload();
                        }
                    }
            }
        }
    }
}



gameuStartu = () => {
    //Each instance of the backdrop will be cleared whenever a new ball is to be created
    ctx.clearRect(0,0, backDrop.width, backDrop.height);
    createScore();
    createBlocks();
    createBall();
    createPaddle();
    crashBoomBash();

    //collision detections for the walls

    //left and right wall
    if(x + dx > backDrop.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    //top wall
    if(y + dy < ballRadius){
        dy = -dy
    }else if(y + dy > backDrop.height-ballRadius){
        //if the paddle hits the ball
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        }//The game will end and restart when the ball hits the bottom of the stage(backDrop)
        else{
            alert('AWWWW, YOU GONNA CRY?');
            document.location.reload();
        }
    }

    //bottom wall
    if(y+dy > backDrop.height - ballRadius || y + dy < ballRadius){
        dy = -dy
    }

    //Hey, the paddle has to move to play the game, you know!

    if(rightPressed && paddleX < backDrop.width-paddleWidth){
        paddleX += 7
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    //What do you mean the ball is stuck in the air? Gravity doesn't work that way!
    
    x += dx;//each frame will update movement on x axis
    y += dy;//each frame will update movemnt on y axis
}
//This is it! The Piece de Resistance!


    setInterval(gameuStartu, 10);
