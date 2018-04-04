import {TileCanvas, TileLayer} from './tilecanvas';
import {TileActor} from './tileactor';
import {TilePosition} from './types';

export class TileAnimator extends TileCanvas {
	/** duration of each frame (ms)
	 * by default, is set to 100ms (10 fps)
	*/
	public duration: number = 100;

	/** Add Layer as Map */
	addLayerActor(actor: TileActor, initialPosition: TilePosition) {
		const layer = this.addLayer(actor.tilename);
		if (layer) {
			layer.onRedraw = actor.onRedraw.bind(actor);
			actor.position = initialPosition;
		}
	}

}