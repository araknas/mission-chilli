import { Manager } from './Manager';
import { LoaderScene } from './scenes/LoaderScene';

Manager.initialize(740, 580, 0xb3bb79);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);
