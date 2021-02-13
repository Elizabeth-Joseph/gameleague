//HEARTY WELCOME TO MY GAME MASTER LEAGUE PROJECT , HOPE YOU WILL ENJOY IT

//declaring the variables(global variables)
  var cyclist,cyclistImg;
  var ground,groundImg;
  var invisibleGround;
  var precaution,precaution1,precaution2,precaution3,precaution4,precaution5,precaution6,precaution7;
  var sound;
  var score=0;
  var START=2;
  var PLAY=0;
  var END=1;
  var gameState=PLAY;


function preload(){
  
//preloading the images
  cyclistImg= loadAnimation("cyclist.gif");
  obstacle1= loadImage("bombblast.png");
  obstacle2= loadImage("burningfossils.png");
  obstacle3= loadImage("burninggarbage.png");
  obstacle4= loadImage("cuttingtrees.png");
  obstacle5= loadImage("industrialemissions.png");
  obstacle6= loadImage("tobacco.png");
  obstacle7= loadImage("useac.png");
  obstacle8= loadImage("vehicleemisssions.png");
  precaution1= loadImage("3rs.png");
  precaution2= loadImage("avoidplastic.png");
  precaution3= loadImage("carpool.png");
  precaution4= loadImage("planttrees.png");
  precaution5= loadImage("publictransport.png");
  precaution6= loadImage("turnoff.png");
  precaution7= loadImage("nocrackers.png");
  groundImg=loadImage("gamebackgrd.jpeg")
  gameOverImg=loadImage("gameoverimg.jpg");
  restartImg=loadImage("play_again_button.png");
  playImg=loadImage("play.png");
  
  
  }


function setup() {
  createCanvas(600,275);
  
   
//creating the ground
  ground= createSprite(200,120,600,400);
  ground.addImage("ground",groundImg);
  ground.scale=0.07;
  ground.x=ground.width/2;
  
//creating the invisible ground
  invisibleGround=createSprite(390,270,900,10);
  invisibleGround.visible=false;
  
//creating the cyclist
  cyclist= createSprite(35,50,20,50);
  cyclist.addAnimation("running",cyclistImg);
  cyclist.scale = 0.2;
  //runner.debug=true;
  cyclist.setCollider("rectangle",0,0,15,cyclist.width);
  
//creating gameover and restart
  gameOver = createSprite(259,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
  play=createSprite(200,200);
  play.addImage(playImg);
  
  starting=createSprite(200,120,600,400);
  //starting.addImage();
  
  restart = createSprite(100,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  
//creating group for obstacles and precautions
  obstaclesGroup= createGroup();
  precautionsGroup= createGroup();
     
}

function draw() {
    background("lightblue");

//textSettings
    fill("black");
    textFont("Comic Sans MS");
    textSize(15);
  
  //making the cyclist jump when the space is pressed
 if(keyCode===32){
  cyclist.velocityY= -10;
}
  
//making the functions to be excecuted when gameState is PLAY
  if(gameState===PLAY) {
    
    
    
//making gameover,play,starting and restart invisible
    gameOver.visible=false;
    restart.visible=false;
    play.visible=false;
    starting.visible=false;
    
// adding velocity to the ground
    ground.velocityX=-3;
  
// moving the ground
    if(ground.x < 160){
        ground.x =ground.width/2;
      }
  

  
  //spawning the obstacles
  spawnObstacles();
  
    //spawning the precautions
  spawnPrecaution();
    
    //making the score system
    if(precautionsGroup.isTouching(cyclist)){
      score=score+1;
      precautionsGroup.destroyEach();
    }
    
    //changing the gamestate to end when the runner touches any obstacles
    if(obstaclesGroup.isTouching(cyclist)){
      gameState=END;
    }
   
    
  }
  
  //making the functions to be excecuted when gameState is END
  if(gameState===END){
    
    //making the gameover,play,starting and restart visible
    gameOver.visible=true;
    restart.visible=true;
     play.visible=false;
    starting.visible=false;
    
    // making ground invisible
    ground.visible=false;
    
    //changing the background color
    background("black");
    
    //stopping the movements
    ground.velocityX=0;
    cyclist.velocityX=0;
    
    //destroying the groups
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
     //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    precautionsGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    precautionsGroup.setVelocityXEach(0);
    
    //executing the reset function when mouse is pressed over restart
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  //adding gravity
  cyclist.velocityY=cyclist.velocityY+0.8;
  
  //colliding the runner with the invisibleGround
  cyclist.collide(invisibleGround);
  
  //textSettings
  fill("black");
  textFont("Comic Sans MS");
  textSize(15);
  
  drawSprites();
  
  //displaying the score
  text("Score : "+ score,100,30);
 
}

//reset function
function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  ground.visible=true;
  
 //destroying the previous obstacles and precautions
  obstaclesGroup.destroyEach();
  precautionsGroup.destroyEach();
  
  //change score to 0
  score=0;
}

    
//spawnObstacles function
function spawnObstacles(){
if(frameCount%222===0){
   obstacle= createSprite(450,150,40,10);
   obstacle.y=Math.round(random(10,180));
   obstacle.scale = 0.09;
   obstacle.velocityX = -5;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
   
   // displaying various images using switch statement
       var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break;
      case 8: obstacle.addImage(obstacle8);
              break;
      default: break;
   
    }

   } 
}

//spawnPrecautions function
function spawnPrecaution(){
  
 if(frameCount%100===0){
   precaution= createSprite(450,150,40,10);
   precaution.y=Math.round(random(10,180));
   precaution.scale = 0.09;
   precaution.velocityX = -5;
   
   //adding precaution to the group
   precautionsGroup.add(precaution);
   
   // displaying various images using switch statement
       var rand = Math.round(random(1,7));
    switch(rand) {
      case 1: precaution.addImage(precaution1);
              break;
      case 2: precaution.addImage(precaution2);
              break;
      case 3: precaution.addImage(precaution3);
              break;
      case 4: precaution.addImage(precaution4);
              break;
      case 5: precaution.addImage(precaution5);
              break;
      case 6: precaution.addImage(precaution6);
              break;
      case 7: precaution.addImage(precaution7);
              break;
      default: break;
   
    }

   } 

  
}
//THANK YOU