let xBall = 300;
let yBall = 200;
let diameterBall = 22.5;

let speedXBall = 6;
let speedYBall = 6;
let radius = diameterBall / 2;

let xRacket = 5;
let yRacket = 150;
let widthRacket = 10;
let heightRacket = 90;

let xOpponentRacket = 585;
let yOpponentRacket = 150;
let speedXOpponent;
let speedYOpponent;

let myPoints = 0;
let oppponentPoints = 0;

let hit = false;

function preload(){
  score = loadSound('score.mp3');
  touch = loadSound('touch.mp3');
  soundtrack = loadSound('soundtrack.mp3');
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  
  showBall();
  moveBall();
  handleBallColision();
  
  showRacket(xRacket, yRacket);
  moveRacket();
  //handleRacketColision();
  racketColision(xRacket, yRacket);
  
  showRacket(xOpponentRacket, yOpponentRacket);  
  moveOpponentRacket();
  racketColision(xOpponentRacket, yOpponentRacket);
  
  insertScoreboard();
  scorePoint();
}

function showBall(){
  circle(xBall, yBall, diameterBall);
}

function moveBall(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function handleBallColision(){
  if(xBall + radius > width || xBall - radius < 0){
    speedXBall = speedXBall * -1;
  }
  if(yBall + radius > height || yBall - radius < 0){
    speedYBall = speedYBall * -1;
  }
}

function showRacket(x, y){
  rect(x, y, widthRacket, heightRacket);
}

function moveRacket(){
  if(keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}

function handleRacketColision(){
  if(xBall - radius < xRacket + widthRacket && 
     yBall - radius < yRacket + heightRacket &&
     yBall + radius > yRacket){
    speedXBall = speedXBall * -1;
    touch.play();
  }
}

function racketColision(x, y){
  hit = collideRectCircle(x, y, widthRacket, heightRacket, xBall, yBall, radius);
  if(hit){
    speedXBall = speedXBall * -1;
    touch.play();
  }
}

function moveOpponentRacket(){
  speedYOpponent = yBall - yOpponentRacket - widthRacket / 2 - 30;
  yOpponentRacket += speedYOpponent;
}

function insertScoreboard(){
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(oppponentPoints, 470, 26);
}

function scorePoint(){
  if(xBall > 593){
    myPoints += 1;
    score.play();
  }
  if(xBall < 7){
    oppponentPoints += 1;
    score.play();
  }
}