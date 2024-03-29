import { Container, DisplayObject, Sprite, Texture, Text, TextStyle } from 'pixi.js';
import { Keyboard } from '../Keyboard';
import { IScene, Manager } from '../Manager';

const HERO_STEP_SIZE = 5;
const HERO_FACING_LEFT_ASSET = 'Simple cat facing left';
const HERO_FACING_RIGHT_ASSET = 'Simple cat facing right';
const HERO_WITH_TOY_FACING_LEFT_ASSET = 'Simple cat with toy facing left';
const HERO_WITH_TOY_FACING_RIGHT_ASSET = 'Simple cat with toy facing right';
enum HeroState {
  READY_TO_HUNT,
  FETCHING,
  WON,
}
enum ToyState {
  HUNTED = 'hunted',
}

export class PlayRoomScene extends Container implements IScene {
  private backgroundWallpapper: Sprite;
  private hero: Sprite;
  private stars = Sprite.from('Stars');
  private landingZone: Sprite;
  private victoryMessage: Text;

  private toys: DisplayObject[] = [];
  private toysState: Map<DisplayObject, string> = new Map<DisplayObject, string>();
  private heroState: HeroState;

  constructor() {
    super();
    this.backgroundWallpapper = Sprite.from('Floor_wooden_1');
    this.backgroundWallpapper.width = Manager.width;
    this.backgroundWallpapper.height = Manager.height;
    this.addChild(this.backgroundWallpapper);



    this.hero = Sprite.from(HERO_FACING_RIGHT_ASSET);
    this.hero.anchor.set(0.5);
    this.hero.x = Manager.width / 2;
    this.hero.y = Manager.height / 2;
    // Scale dynamically later (1/10 background size?)
    this.hero.scale = { x: 0.2, y: 0.2 };
    this.heroState = HeroState.READY_TO_HUNT;

    this.landingZone = Sprite.from('Blue bed');
    this.landingZone.x = 10;
    this.landingZone.y = Manager.height / 4;
    // Scale dynamically later (1/10 background size?)
    this.landingZone.scale = { x: 0.5, y: 0.5 };

    this.stars.visible = false;
    this.stars.x = -4;
    this.stars.y = Manager.height / 20;
    this.stars.scale = { x: 0.5, y: 0.5 };


    this.addChild(this.landingZone);
    this.addChild(this.stars);
    this.addChild(this.hero);
    this.generateToys(7);

    this.victoryMessage = this.prepareVicotryMessage();
    this.victoryMessage.x = Manager.width / 2;
    this.victoryMessage.y = Manager.height / 2;
    this.victoryMessage.anchor.set(0.5);
    this.victoryMessage.visible = false;

    this.addChild(this.victoryMessage);
  }

  private prepareVicotryMessage() {
    const style = new TextStyle({
      dropShadow: true,
      dropShadowBlur: 4,
      fill: '#dabb4e',
      fontFamily: 'Impact, Charcoal, sans-serif',
      fontSize: 59,
    });
    return new Text('You won!', style);
  }

  private generateToys(count: number): void {
    for (let i = 0; i < count; i++) {
      const toy = this.generateRedBall();
      this.toys.push(toy);
      this.dropInRandomLocation(toy);
      this.addChild(toy);
    }
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

  private collide(objA: DisplayObject, objB: DisplayObject): boolean {
    const a = objA.getBounds();
    const b = objB.getBounds();

    const rightmostLeft = a.left < b.left ? b.left : a.left;
    const leftmostRight = a.right > b.right ? b.right : a.right;

    if (leftmostRight <= rightmostLeft) {
      return false;
    }

    const bottommostTop = a.top < b.top ? b.top : a.top;
    const topmostBottom = a.bottom > b.bottom ? b.bottom : a.bottom;

    return topmostBottom > bottommostTop;
  }

  public update(framesPassed: number): void {
    this.updateHeroLocation();
    this.handleToyCatch();
    this.handleToyFetch();
  }

  private updateHeroLocation() {

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

      if (this.heroState === HeroState.FETCHING) {
        this.hero.texture = Texture.from(HERO_WITH_TOY_FACING_LEFT_ASSET);
      } else {
        this.hero.texture = Texture.from(HERO_FACING_LEFT_ASSET);
      }
    }
    if (Keyboard.arrowRight() && this.hero.x < Manager.width) {
      this.stars.visible = false;

      console.debug('Hero should go right');
      this.hero.texture = Texture.from(HERO_FACING_RIGHT_ASSET);
      this.hero.x += HERO_STEP_SIZE;

      if (this.heroState === HeroState.FETCHING) {
        this.hero.texture = Texture.from(HERO_WITH_TOY_FACING_RIGHT_ASSET);
      } else {
        this.hero.texture = Texture.from(HERO_FACING_RIGHT_ASSET);
      }
    }
  }

  private handleToyCatch() {
    if (this.heroState === HeroState.FETCHING) {
      return;
    }
    this.toys.forEach((toy) => {
      const toyState = this.toysState.get(toy);
      if (this.collide(this.hero, toy) && toyState !== ToyState.HUNTED) {
        console.log('Toy is hunted!');
        this.hero.texture = Texture.from(HERO_WITH_TOY_FACING_RIGHT_ASSET);
        this.toysState.set(toy, ToyState.HUNTED);
        this.removeChild(toy);
        this.heroState = HeroState.FETCHING;
        return;
      }
    });
  }

  private allHunted() {
    let victory = true;
    this.toys.forEach((toy) => {
      const toyState = this.toysState.get(toy);
      if (toyState !== ToyState.HUNTED) {
        victory = false;
      }
    });
    return victory;
  }

  private handleToyFetch() {
    if (this.heroState === HeroState.READY_TO_HUNT) {
      return;
    }
    if (this.collide(this.hero, this.landingZone)) {
      console.log('Toy is fetched!');
      this.stars.visible = true;

      this.hero.texture = Texture.from(HERO_FACING_RIGHT_ASSET);
      this.heroState = HeroState.READY_TO_HUNT;
      if (this.allHunted()) {
        console.log('Victory!');
        this.victoryMessage.visible = true;
      }
    }
  }
}
