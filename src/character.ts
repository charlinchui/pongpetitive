import { Sprite } from "excalibur";

export class Character {
    public paddle: Paddle;
    //public portrait: Sprite;
    public name: String
    public speed: number
    constructor(paddle: Paddle, name: String, speed: number){
        this.name = name;
        this.paddle = paddle;
        this.speed = speed;
        //this.portrait = portrait;
    }
}

export class Paddle { 
    public width: number;
    public height: number;
    //public sprite: Sprite;
    constructor(witdh: number, height: number){
        this.width = witdh;
        this.height = height;
        //this.sprite = sprite;
    }
}