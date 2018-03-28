import {TileCanvas} from './tilecanvas';
// create TileCanvas
const tcanvas = new TileCanvas;
// add tileset
tcanvas.addTile('forest', '/tileset.png', 32, 16);
// get canvas
var canvas: any = document.getElementById('main');
// get context
if (canvas) {
	tcanvas.width = canvas.width;
	tcanvas.height = canvas.height;

	// layers
	const layer0 = [
		[11,12,13],
		[27,28,29],
		[43,44,45]
	];
	const layer1 = [
		[0,0,0],
		[0,204,0],
		[0,0,0]
	];

	tcanvas.onLoad.then(()=>{
		console.log('starting redenring...');
		tcanvas.drawMap('forest', layer0);
		tcanvas.drawMap('forest', layer1);
		tcanvas.render(canvas);
	});
}
