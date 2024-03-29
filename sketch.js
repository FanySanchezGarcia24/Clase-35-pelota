var pelota, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  pelota = createSprite(250,250,10,10);
  pelota.shapeColor = "red";


  var pelotaPosition = database.ref('pelota/position');
  pelotaPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  }
}

function writePosition(x,y){
  database.ref('pelota/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  pelota.x = position.x;
  pelota.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}