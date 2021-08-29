var canvas =document.getElementById("canvas");
var ctx=canvas.getContext("2d"); // store the 2d rendering context tool used to paint on canvas
/* ctx.beginPath();
ctx.rect(20,40 ,100 ,50); //first two top left ke cor then width height
ctx.fillStyle="#FF0000"; //stores a color
ctx.fill(); // to paint the square
ctx.closePath(); */

var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var randomColor ="#0095DD";
function ballColor()
{
    randomColor = Math.floor(Math.random()*16777215).toString(16);
}

var radius=10;

var padleHeight=10;
var padleWidth=75;
var padleX=(canvas.width-padleWidth)/2;


var rightPressed=false;
var leftPressed=false;


var brickRowCount=7;
var brickColumnCount=5;
var brickWidth=75;
var brickHeight=20;
var brickPadding=10;
var brickOffsetTop=30;
var brickOffsetLeft=30;
var bricks=[];


for(var c=0;c<brickColumnCount;c++)
{
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++)
    {
         bricks[c][r]={x:0,y:0,status:1};
    }
}


var score=0;

function drawScore()
{
    ctx.font="16px Arial";
    ctx.fillStyle="#0095DD";
    ctx.fillText("Score: "+score,8,20);
}


function drawBricks()
{
    for(var c=0;c<brickColumnCount;c++)
    {
        for(var r=0;r<brickRowCount;r++)
        {
            if(bricks[c][r].status==1)
            {

            
            var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x=brickX;
            bricks[c][r].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle="#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function collisionDetection()
{
    for(var i=0;i<brickColumnCount;i++)
    {
        for(var j=0;j<brickRowCount;j++)
        {
            var b=bricks[i][j];
            if(b.status==1)
            {

            if(x > b.x && x < b.x+brickWidth && y>b.y && y<b.y+brickHeight)
                {
                    console.log(x);
                    dy=-dy;
                    b.status=0;
                    score++;
                    if(score==brickColumnCount*brickRowCount)
                    {
                        alert("You Win");
                        document.location.reload();
                        clearInterval(interval);//to end game
                    }
                   


                }
            }
        }
    }    
}




function drawBall()
{
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2,true);//cor of centre ,arc radius,start
    ctx.fillStyle="#"+randomColor;
    ctx.fill();
    ctx.closePath();
}
function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(padleX,canvas.height-padleHeight,padleWidth,padleHeight);
    ctx.fillStyle="#0095DD";
    ctx.fill();

    ctx.closePath();
}
function keyDownHandler(e)
{
    if(e.key=='Right' || e.key=="ArrowRight")
    {
        rightPressed=true;

    }
    else if(e.key=="Left" || e.key=="ArrowLeft")
    {
        leftPressed=true;
    }
}
function keyUpHandler(e)
{
    if(e.key=='Right' || e.key=="ArrowRight")
    {
        rightPressed=false;

    }
    else if(e.key=="Left" || e.key=="ArrowLeft")
    {
        leftPressed=false;
    }
}
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);




function draw()
{
    ctx.clearRect(0,0,canvas.width,canvas.height); //clear the canvas
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
    collisionDetection();
     //changes in x and y
    //;
    if(x+dx >= canvas.width-radius) // right
    {
        dx=-dx;
    }

    if(x+dx <=radius) //left
    {
        dx=-dx;
    }

    if(y+dy < radius) //top
    {
        dy=-dy;
    }
    else if(y+dy > canvas.height-radius)//bottom
    {
        if(x>=padleX && x<=padleX+padleWidth)
        {
            ballColor();
            dy=-dy;
        }
        else
        {
            alert("Game Over");
        document.location.reload();
        clearInterval(interval);
        }
    }

   /* if(y + dy > canvas.height-radius) //bottom
    {
        dy=-dy;
    }*/

   
    x+=dx;
    y+=dy;
    if(rightPressed)
    {
        padleX+=5;
        if(padleX+padleWidth > canvas.width)
        {
            padleX=canvas.width-padleWidth;
        }
    }



        else if(leftPressed)
        {
            padleX-=5;
            if(padleX < 0)
            {
                padleX=0;
            }

        }
    

    
    
}
var interval= setInterval(draw,10);




