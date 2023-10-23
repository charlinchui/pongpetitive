import './style.css'
import * as ex from 'excalibur';
import { testCharacter } from './characters/test-character';
import { Jacob } from './characters/test-enemy-character';

const selectedCharacter = testCharacter;
const enemy = Jacob;

function calculateBounceAngle(ball:any, paddle:any) {
  const paddleCenterY = paddle.pos.y;
  const relativeIntersectY = ball.pos.y - paddleCenterY;
  const normalizedRelativeIntersectY = relativeIntersectY / (paddle.height / 2);
  const bounceAngle = normalizedRelativeIntersectY * 50; // Adjust 45 for desired bounce angle range
  return bounceAngle;
}

let score = [0,0]
let canScore : boolean = true;
let scores = new ex.Text({
  text: `${score[0]} - ${score[1]}`,
  font: new ex.Font({size: 30, color: ex.Color.White})
});

const game = new ex.Engine({
  width:1600,
  height:800,
  backgroundColor: new ex.Color(42, 42, 42),
  displayMode: ex.DisplayMode.FitScreen
});

const scoresActor = new ex.Actor({
  x: game.drawWidth / 2,
  y: 60
});

scoresActor.graphics.use(scores);

const player = new ex.Actor({
  x: 30,
  y: game.drawHeight /2,
  width: selectedCharacter.paddle.width,
  height: selectedCharacter.paddle.height,
  color: ex.Color.Green
});

const enemyActor = new ex.Actor({
  x: game.drawWidth - 30,
  y: game.drawHeight /2,
  width: enemy.paddle.width,
  height: enemy.paddle.height,
  color: ex.Color.Blue
});

const ball = new ex.Actor({
  x: game.drawWidth / 2,
  y: game.drawHeight / 2,
  radius: 10,
  color: ex.Color.White
});

const middleBar = new ex.Actor({
  x: (game.drawWidth/2) - 1,
  y: game.drawHeight/2,
  width: 5,
  height: game.drawHeight,
  color: ex.Color.Orange
});

let vel = {
  x:(Math.random() < 0.5 ? 2 : -2),
  y:(Math.random() < 0.5 ? 2 : -2)
}

setInterval(()=>{
  scores.text = `${score[0]} - ${score[1]}`
  ball.pos.x = ball.pos.x + vel.x;
  ball.pos.y = ball.pos.y + vel.y;
  if(ball.pos.y <= ball.height){
    vel.y = vel.y *-1; 
  }else if(ball.pos.y >= game.drawHeight - ball.height){
    vel.y = vel.y *-1;
  }
  if (ball.pos.y >= (player.pos.y - player.height / 2) +1 && ball.pos.y <= (player.pos.y + player.height / 2)-1) {
    if (ball.pos.x <= player.pos.x + player.width && ball.pos.x >= player.pos.x) {
      if(!(ball.pos.y >= (player.pos.y - selectedCharacter.powerArea) && ball.pos.y <= (player.pos.y + selectedCharacter.powerArea))){
        const bounceAngle = calculateBounceAngle(ball, player);
        const newSpeed = selectedCharacter.strength * Math.cos((bounceAngle * Math.PI) / 180);
        vel.x = newSpeed;
        vel.y = newSpeed * Math.sin((bounceAngle * Math.PI) / 180);
      } else {
        vel.x = selectedCharacter.strength * selectedCharacter.strength * 2;
        vel.y = 0;
      }
    }
  }
  
  if (ball.pos.y >= (enemyActor.pos.y - enemyActor.height / 2)+1 && ball.pos.y <= (enemyActor.pos.y + enemyActor.height / 2)-1) {
    if (ball.pos.x >= enemyActor.pos.x - enemyActor.width && ball.pos.x <= enemyActor.pos.x) {
      if(!(ball.pos.y >= (enemyActor.pos.y - enemy.powerArea) && ball.pos.y <= (enemyActor.pos.y + enemy.powerArea))){
        const bounceAngle = calculateBounceAngle(ball, enemyActor);
        const newSpeed = enemy.strength * Math.cos((bounceAngle * Math.PI) / 180);
        vel.x = -newSpeed;
        vel.y = (newSpeed * Math.sin((bounceAngle * Math.PI) / 180));
      }else{
        vel.x = -enemy.strength * enemy.strength * 2;
        vel.y = 0;
      }
    }
  }
  if(ball.pos.x <= 0){
    if(canScore){
      score[1]++;
      canScore = false;  
    }
    setTimeout(()=>{
      ball.pos = ex.vec(game.drawWidth/2,game.drawHeight/2);
      vel = {
        x:(Math.random() < 0.5 ? 2 : -2),
        y:(Math.random() < 0.5 ? 2 : -2)
      } 
      canScore=true;
    }, 3000);
  }else if (ball.pos.x >= game.drawWidth){
    if(canScore) {
      score[0]++;
      canScore = false;
    }
    setTimeout(()=>{
      ball.pos = ex.vec(game.drawWidth/2,game.drawHeight/2);
      vel = {
        x:(Math.random() < 0.5 ? 2 : -2),
        y:(Math.random() < 0.5 ? 2 : -2)
      } 
      canScore=true;
    }, 3000);
  }
}, 1);

game.add(middleBar);
game.add(ball);
game.add(player);
game.add(enemyActor);
game.add(scoresActor);


game.input.keyboard.on("hold", (e: ex.KeyEvent)=>{
  if(e.key === ex.Keys.W || e.key === ex.Keys.Up){
    if (player.pos.y>player.height/2) player.pos.y = player.pos.y-selectedCharacter.speed;
    if (enemyActor.pos.y>enemyActor.height/2) enemyActor.pos.y = enemyActor.pos.y-enemy.speed;
  }
  if(e.key === ex.Keys.S || e.key === ex.Keys.Down){
    if(player.pos.y<game.drawHeight - player.height/2) player.pos.y = player.pos.y+selectedCharacter.speed;
    if(enemyActor.pos.y<game.drawHeight - enemyActor.height/2) enemyActor.pos.y = enemyActor.pos.y+enemy.speed;
  }
});

game.start();