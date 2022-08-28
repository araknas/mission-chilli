export class Keyboard {
  public static readonly state: Map<string, boolean> = new Map<string, boolean>();
  public static initialize() {
    // The `.bind(this)` here isn't necesary as these functions won't use `this`!
    document.addEventListener('keydown', Keyboard.keyDown);
    document.addEventListener('keyup', Keyboard.keyUp);
  }
  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true);
  }
  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false);
  }

  public static arrowUp(): boolean {
    return this.state.get('38') ?? this.state.get('ArrowUp') ?? false;
  }

  public static arrowDown(): boolean {
    return this.state.get('40') ?? this.state.get('ArrowDown') ?? false;
  }

  public static arrowLeft(): boolean {
    return this.state.get('37') ?? this.state.get('ArrowLeft') ?? false;
  }

  public static arrowRight(): boolean {
    return this.state.get('39') ?? this.state.get('ArrowRight') ?? false;
  }
}
