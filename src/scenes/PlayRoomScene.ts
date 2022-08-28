import { Container, Sprite } from 'pixi.js';
import { Keyboard } from '../Keyboard';
import { IScene, Manager } from '../Manager';

const HERO_STEP_SIZE = 3;
export class PlayRoomScene extends Container implements IScene {
  private hero: Sprite;
  constructor() {
    super();
    this.hero = Sprite.from('Simple cat');

    this.hero.anchor.set(0.5);
    this.hero.x = Manager.width / 2;
    this.hero.y = Manager.height / 2;
    // Scale dynamically later (1/10 background size?)
    this.hero.scale = { x: 0.2, y: 0.2 };
    this.addChild(this.hero);
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
