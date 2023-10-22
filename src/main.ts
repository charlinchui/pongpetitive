import './style.css'
import * as ex from 'excalibur';
import { testCharacter } from './characters/test-character';
import { Jacob } from './characters/test-enemy-character';

const selectedCharacter = testCharacter;
const enemy = Jacob;

const game = new ex.Engine({
  width:800,
  height:450,
  backgroundColor: new ex.Color(42, 42, 42)
});

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
  radius: 5,
  color: ex.Color.White,
});
game.add(ball);
game.add(player);
game.add(enemyActor);


game.input.keyboard.on("hold", (e: ex.KeyEvent)=>{
  if(e.key === ex.Keys.W || e.key === ex.Keys.Up){
    if (player.pos.y>player.height/2) player.pos.y = player.pos.y-selectedCharacter.speed;
  }
  if(e.key === ex.Keys.S || e.key === ex.Keys.Down){
    if(player.pos.y<game.drawHeight - player.height/2) player.pos.y = player.pos.y+selectedCharacter.speed;
  }
})

game.start();