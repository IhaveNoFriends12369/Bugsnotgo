var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkey_standing;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  monkey_standing = loadImage("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50, 150, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("standing", monkey_standing);
  monkey.scale = 0.1;
  obstaclesGroup = new Group();

  ground = createSprite(300, 200, 600, 50)
}
score = 0;

function draw() {
  background(230);
  text("Score: " + score, 500, 50);

  if (gameState === "PLAY") {
    spawnObstacles();
    spawnBanan();
    if (keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
      if (obstaclesGroup.isTouching(monkey)) {
        gameState = END;
      }
      if (monkey.isTouching(FoodGroup)) {
        score = score + 1;
      }
    }
    monkey.velocityY = monkey.velocityY + 0.8;

  }

  if (gameState === END) {
    monkey.changeAnimation("standing", monkey_standing);
    if (mousePressedOver(monkey)) {
      reset();
    }


  }
  ground.visible = false;
  monkey.collide(ground);

  console.log(gameState);

  drawSprites();
}

function reset() {
  score = 0;
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  monkey.changeAnimation("running", monkey_running);

}



function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBanan() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(100, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}