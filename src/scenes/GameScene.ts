import { Container, Sprite } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { PlayRoomScene } from './PlayRoomScene';

export class GameScene extends Container implements IScene {
  private hero: Sprite;
  private startButton: Sprite;
  private heroVelocity: number;
  private backgroundWallpapper: Sprite;
  constructor() {
    super();

    this.hero = Sprite.from('Chilli in grill');
    this.backgroundWallpapper = Sprite.from('Milky way');
    this.backgroundWallpapper.width = Manager.width;
    this.backgroundWallpapper.height = Manager.height;

    this.hero.anchor.set(0.5);
    this.hero.x = Manager.width / 2;
    this.hero.y = Manager.height / 2;

    this.startButton = Sprite.from('Start Button');
    this.startButton.anchor.set(0.5);
    this.startButton.x = Manager.width / 2;
    this.startButton.y = Manager.height / 4;
    this.startButton.scale = { x: 0.3, y: 0.3 };

    this.startButton.interactive = true;

    this.startButton.on('click', () =>  Manager.changeScene(new PlayRoomScene()));

    this.addChild(this.backgroundWallpapper);
    this.addChild(this.hero);
    //Uncomment on showcase
    //this.addChild(this.startButton);

    this.heroVelocity = 5;
  }

  public update(framesPassed: number): void {
    // Lets move hero!
    this.hero.x += this.heroVelocity * framesPassed;

    if (this.hero.x > Manager.width) {
      this.hero.x = Manager.width;
      this.heroVelocity = -this.heroVelocity;
    }

    if (this.hero.x < 0) {
      this.hero.x = 0;
      this.heroVelocity = -this.heroVelocity;
    }
  }
}
