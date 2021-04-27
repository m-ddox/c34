var ball;
var database;
var ballPosition;
var boxPosition;

function setup(){
    createCanvas(500,500);

    //create a database inside the 'database' --> firebase.database()
    database = firebase.database();

    //make the ballPosition variable refer to the database --> database.ref('whatorefer)
    ballPosition = database.ref('box/position');           //box/position

    //create a listener to the variable to listen to the changes happeneing --> variableName.on("value",function1,function2)
    ballPosition.on("value",readPosition,showError);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //refer to the database--> database.ref() and update--> .update({})/ .set({}) the x and y fields
   database.ref('box/position').set({
       //set the 'x' and 'y' fields in the database to the box's x and y position
       'x':boxPosition.x + x,
       'y':boxPosition.y + y
   })
   
   
    // ball.x = ball.x + x;
    //ball.y = ball.y + y;
}

function readPosition(data){
//store the listened value inside the 'boxPosition' variable --> data.val()
boxPosition = data.val();

//store the ball's x,y position to box's x,y position
ball.x = boxPosition.x;
ball.y = boxPosition.y;
}

function showError(){
    console.log("There is an error")
}