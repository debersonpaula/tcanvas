import {TileAnimator} from './tileanimator';

console.log('Test 3');

const ts = new TileAnimator('/char0.png', 75, 111, 4, 4);
ts.addAction('WALK_DOWN', 2000, [1,2,3,4]);

ts.imgLoad.then(()=>{
	var canvas: any = document.getElementById('main');
	var context: CanvasRenderingContext2D = canvas.getContext('2d');

	for (let i = 0; i < ts.count; i++) {
		context.drawImage(ts.tile(i),0,i * 75);
	}
});