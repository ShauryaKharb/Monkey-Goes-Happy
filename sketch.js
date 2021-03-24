var backImage,backgr;
var player, player_running;
var ground,ground_img;

var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){

  backImage=loadImage("Images/jungle.jpg");
  player_running = loadAnimation("Images/Monkey_01.png","Images/Monkey_02.png","Images/Monkey_03.png","Images/Monkey_04.png","Images/Monkey_05.png","Images/Monkey_06.png","Images/Monkey_07.png","Images/Monkey_08.png","Images/Monkey_09.png","Images/Monkey_10.png");
  rock_img = loadImage("Images/stone.png");
  banana_img = loadImage("Images/banana.png");
  over_img = loadImage("Images/gameOver.png");
  player_pause = loadAnimation("Images/Monkey_01.png")

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  
  player = createSprite(175,340,20,50);
  player.addAnimation("pause",player_pause);
  player.addAnimation("Running",player_running);
  player.scale = 0.15;
  // player.debug = true;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  over = createSprite(400,200,20,20);
  over.addImage("over",over_img);

  bananaG = new Group();
  rockG = new Group();
  
}

function draw() { 
  background(0);

  player.collide(ground);

  spawnRocks();
  spawnfruit();

  if(gameState===PLAY){

    over.visible = false;

    backgr.velocityX=-4;

    rockG.setVelocityXEach(backgr.velocityX);
    bananaG.setVelocityXEach(backgr.velocityX);

    player.changeAnimation("Running",player_running);
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  console.log(player.y);
  
    if(keyWentDown("space") && player.y >= 301 ) {
      player.velocityY = -18;
    }
    player.velocityY = player.velocityY + 0.8;
  
    if(player.isTouching(bananaG)){
      score+=1;
      bananaG.destroyEach();
    }

    if(player.isTouching(rockG)){
      gameState=END;
    }

  }else if (gameState===END){
      over.visible = true;
      score = 0;
      player.velocityX = 0;
      player.velocityY = 0;
      bananaG.setVelocityXEach(0);
      rockG.setVelocityXEach(0);
      player.changeAnimation("pause",player_pause);
      backgr.velocityX = 0;
      if(mousePressedOver(over) || keyDown("r")){
          reset();
      }
    }

  drawSprites();

  fill("#3ddfff");
  textSize(50);
  text("Unfair Game",250,50);

  fill("white");
  textSize(30);
  text ("Score : " + score , 50,50);
}

function reset(){
  gameState=PLAY;
  bananaG.destroyEach();
  rockG.destroyEach();
  over.visibile = false;
}

function spawnRocks(){
  // var rand = Math.round(random(120,150))
  if(frameCount % 120 === 0){
    rock = createSprite(850,320,20,50);
    rock.addImage("stone",rock_img);
    rock.scale = 0.2;
    // rock.debug = true;
    rock.setCollider("rectangle",0,20,200,400,45)
    rockG.add(rock);
  }
}

function spawnfruit(){
  // var rand = Math.round(random(120,150))
  if(frameCount % 160 === 0){
    var rand = Math.round(random(100,250))
    banana = createSprite(850,rand,20,50);
    banana.addImage("banana",banana_img);
    banana.scale = 0.05;
    banana.velocityX =  backgr.velocityX;
    bananaG.add(banana);
  }
}