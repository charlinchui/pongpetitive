import { Sprite } from "excalibur";

export class Character {
    public paddle: Paddle;
    //public portrait: Sprite;
    public name: String
    public speed: number
    public strength: number
    public powerArea: number;
    constructor(paddle: Paddle, name: String, speed: number, strength: number, powerArea: number){
        this.name = name;
        this.paddle = paddle;
        this.speed = speed;
        this.strength = strength;
        this.powerArea = powerArea;
        //this.portrait = portrait;
    }
}

export class Paddle { 
    public width: number;
    public height: number;
    public angle: number;
    //public sprite: Sprite;
    constructor(witdh: number, height: number, angle: number){
        this.width = witdh;
        this.height = height;
        this.angle = angle;
        //this.sprite = sprite;
    }
}