import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Keyboard } from '../Keyboard';
import { IScene, Manager } from '../Manager';

const HERO_STEP_SIZE = 3;
export class PlayRoomScene extends Container implements IScene {
  private hero: Sprite;
  private toys: Sprite[] = [];
  constructor() {
    super();
    this.hero = Sprite.from('Simple cat');

    this.hero.anchor.set(0.5);
    this.hero.x = Manager.width / 2;
    this.hero.y = Manager.height / 2;
    // Scale dynamically later (1/10 background size?)
    this.hero.scale = { x: 0.2, y: 0.2 };
    this.addChild(this.hero);
    this.generateToys();
  }

  private generateToys(): void {
    const toy1 = this.generateRedBall();
    const toy2 = this.generateRedBall();
    const toy3 = this.generateRedBall();
    const toy4 = this.generateRedBall();

    this.dropInRandomLocation(toy1);
    this.dropInRandomLocation(toy2);
    this.dropInRandomLocation(toy3);
    this.dropInRandomLocation(toy4);

    this.addChild(toy1);
    this.addChild(toy2);
    this.addChild(toy3);
    this.addChild(toy4);
  }

  private dropInRandomLocation(object: DisplayObject): void {
    const minX = Manager.width / 2 + 20;
    const maxX = Manager.width - 20;
    const minY = Manager.height + 20;
    const maxY = -20;

    const randomX = this.randomIntFromInterval(minX, maxX);
    const randomY = this.randomIntFromInterval(minY, maxY);
    object.x = randomX;
    object.y = randomY;
  }

  private randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private generateRedBall(): DisplayObject {
    const toy = Sprite.from('Red ball');
    // Scale dynamically later (1/30 background size?)
    toy.scale = { x: 0.05, y: 0.05 };
    return toy;
  }

  public update(framesPassed: number): void {
    if (Keyboard.arrowUp() && this.hero.y > 0) {
      console.debug('Hero should go up');
      this.hero.y -= HERO_STEP_SIZE;
    }
    if (Keyboard.arrowDown() && this.hero.y < Manager.height) {
      console.debug('Hero should go down');
      this.hero.y += HERO_STEP_SIZE;
    }
    if (Keyboard.arrowLeft() && this.hero.x > 0) {
      console.debug('Hero should go left');
      this.hero.x -= HERO_STEP_SIZE;
    }
    if (Keyboard.arrowRight() && this.hero.x < Manager.width) {
      console.debug('Hero should go right');
      this.hero.x += HERO_STEP_SIZE;
    }
  }
}
