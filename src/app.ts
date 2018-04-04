import {TileLoader} from './tileloader';
import {TileSet} from './tileset';
import {TileAnimator} from './tileanimator';
// import {TileCanvas} from './tilecanvas';
import {TileActor} from './tileactor';
const canvas1: any = document.getElementById('canvas1');
// add tilesets to loader
const tl = new TileLoader;
tl.add('char', '/people.png');
tl.add('tiles', '/tileset.png');
// load all tilesets
const msg = document.getElementById('loading');
if (msg) {
  msg.innerText = 'Loading...';
  tl.onProgress = (progress) => {
    msg.innerText = 'Loading (' + (progress/2*100) + '%)';
  }
  tl.load().then(()=>{
    msg.innerText = '';
    // create TileCanvas
    const tcanvas = new TileAnimator;
    // add tile sets
    tcanvas.addTileSet('char', new TileSet(tl.images('char'), 32, 32, 8, 12));
    tcanvas.addTileSet('tiles', new TileSet(tl.images('tiles'), 32, 32, 16, 16));
    // define size
    tcanvas.height = 3 * 32;
    tcanvas.width = 6 * 32;
    // add map
    tcanvas.addLayerMap('tiles',[
      [11,12,12,12,12,13],
      [27,28,28,28,28,29],
      [43,44,44,44,44,45]
    ]);
    tcanvas.addLayerMap('tiles', [
      [0,0,0,0,0,0],
      [0,204,0,0,0,0],
      [0,0,0,204,0,0,0]
    ]);
    // create actor
    const tactor = new TileActor('char');
    // create action to walk
    tactor.addAction('WALK_DOWN',{
      frames: [0, 1, 2], moveX: 0, moveY: 6
    });
    // create action to stand face down
    tactor.addAction('FACE_DOWN',{
      frames: [0]
    });
    // attach actor to canvas
    tcanvas.addLayerActor(tactor, {x: 30, y: 0});
    // issue a command
    tactor.command('WALK_DOWN');

    render(tcanvas, 40);
  });
}

async function render(canvas: TileAnimator, interactions: number) {
  for (var i = 0; i < interactions; i++) {
    canvas.redraw();
    canvas.render(canvas1);
    await wait(100);
  }
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve();
    }, ms);
  });
}