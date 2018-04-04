import {TileCanvas, TileLayer} from './tilecanvas';
import {TilePosition} from './types';

export class TileActor {
	// protected _canvas: TileCanvas;
	protected _actions: TActions = {};
	protected _tilename: string = '';
	protected _command: string = '';
	protected _position: TilePosition = {x:0, y:0};
	/** Currently action index */
	protected _actionIndex: number = 0;

	constructor(tilename: string) {
		// this._canvas = canvas;
		this._tilename = tilename;
	}

	/** Add Sequence of Frames */
	addAction(name: string, action: TAction) {
		this._actions[name] = action;
	}

	get tilename(): string {
		return this._tilename;
	}

	onRedraw(layer: TileLayer) {
		if (layer.context && this._command) {
			// clear canvas
			layer.context.clearRect(0,0, layer.canvas.width, layer.canvas.height);
			// get action
			const action = this._actions[this._command];
			// get tile based on action frames
			const tile = layer.tileset.tile(action.frames[this._actionIndex]);
			// draw to layer canvas
			layer.context.drawImage(tile, this._position.x, this._position.y);
			// set next action
			if (this._actionIndex < action.frames.length - 1) {
				this._actionIndex++;
			} else {
				this._actionIndex = 0;
			}
			// set next position
			this._position.x += action.moveX ? action.moveX : 0;
			this._position.y += action.moveY ? action.moveY : 0;
		}
	}

	/** Issue a command to actor */
	command(action: string) {
		this._command = action;
		this._actionIndex = 0;
	}

	set position(pos: TilePosition) {
		this._position = pos;
	}
}

interface TAction {
	/** Sequence of tiles to be a frameset */
	frames: number[];
	/** Duration of entire sequence in ms */
	// duration: number;
	moveX?: number;
	moveY?: number;
};

type TActions = {[action: string]: TAction};