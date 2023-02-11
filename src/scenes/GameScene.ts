import { Container, Sprite } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { PlayRoomScene } from './PlayRoomScene';

export class GameScene extends Container implements IScene {
  private clampy: Sprite;
  private startButton: Sprite;
  private clampyVelocity: number;
  private backgroundWallpapper: Sprite;
  constructor() {
    super();


    this.clampy = Sprite.from('Chilli in grill');
    this.backgroundWallpapper = Sprite.from('Milky way');
    this.backgroundWallpapper.width = Manager.width;
    this.backgroundWallpapper.height = Manager.height;

    this.clampy.anchor.set(0.5);
    this.clampy.x = Manager.width / 2;
    this.clampy.y = Manager.height / 2;

    this.startButton = Sprite.from('Start Button');
    this.startButton.anchor.set(0.5);
    this.startButton.x = Manager.width / 2;
    this.startButton.y = Manager.height / 4;
    this.startButton.scale = { x: 0.3, y: 0.3 };

    this.startButton.interactive = true;

    this.startButton.on('click', () =>  Manager.changeScene(new PlayRoomScene()));

    this.addChild(this.backgroundWallpapper);
    this.addChild(this.clampy);
    this.addChild(this.startButton);


    this.clampyVelocity = 5;
  }
  private static onStart(): void {
    console.log('should start');
    Manager.changeScene(new PlayRoomScene());
  }
  public update(framesPassed: number): void {
    // Lets move clampy!
    this.clampy.x += this.clampyVelocity * framesPassed;

    if (this.clampy.x > Manager.width) {
      this.clampy.x = Manager.width;
      this.clampyVelocity = -this.clampyVelocity;
    }

    if (this.clampy.x < 0) {
      this.clampy.x = 0;
      this.clampyVelocity = -this.clampyVelocity;
    }
  }
}
