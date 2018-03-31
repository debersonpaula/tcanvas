import {TileSet} from './tileset';

console.log('Test 2');

const ts = new TileSet('/tileset.png', 32, 32, 16, 16);

ts.imgLoad.then(()=>{
	var canvas: any = document.getElementById('main');
	var context: CanvasRenderingContext2D = canvas.getContext('2d');

	for (let i = 0; i < ts.count; i++) {
		context.drawImage(ts.tile(i),0,i * 32);
	}
});