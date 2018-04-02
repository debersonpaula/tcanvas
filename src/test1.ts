console.log('--- Test 1 -------------');
import {TileLoader} from './tileloader';
import {TileSet} from './tileset';
import {TileAnimator} from './tileanimator';
import {TileCanvas} from './tilecanvas';

// add tilesets to loader
const tl = new TileLoader;
tl.add('char', '/char0.png');
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
    // // load canvas for tiles
    // const tsTiles = new TileSet(tl.images('tiles'), 32, 32, 16, 16);
    // const canvas1: any = document.getElementById('canvas1');
    // const context1: CanvasRenderingContext2D = canvas1.getContext('2d');
    // for (let i = 0; i < tsTiles.count; i++) {
    //   context1.drawImage(tsTiles.tile(i),0,i * 32);
    // }
    // // load canvas for chars
    // const tsChar = new TileAnimator(tl.images('char'), 75, 111, 4, 4);
    // tsChar.addAction('WALK_DOWN', 2000, [1,2,3,4]);
    // const canvas2: any = document.getElementById('canvas2');
    // const context2: CanvasRenderingContext2D = canvas2.getContext('2d');
    // for (let i = 0; i < tsChar.count; i++) {
    //   context2.drawImage(tsChar.tile(i),0,i * 75);
    // }

    // create TileCanvas
    const tcanvas = new TileCanvas;
    // add tile sets
    tcanvas.addTileSet('char', new TileAnimator(tl.images('char'), 75, 111, 4, 4));
    tcanvas.addTileSet('tiles', new TileSet(tl.images('tiles'), 32, 32, 16, 16));
    // define size
    tcanvas.height = 320;
    tcanvas.width = 320;
    // add map
    tcanvas.addLayerMap('tiles',[
      [11,12,12,12,12,13],
      [27,28,28,28,28,29],
      [43,44,44,44,44,45]
    ]);
  });
}