import {TileSet} from './tileset';

export class TileAnimator extends TileSet {
	protected _actions: TActions = {};

	/** Create TileAnimator */
	constructor(image: HTMLImageElement, tileWidth: number, tileHeight: number, rows: number, cols: number) {
		super(image, tileWidth, tileHeight, rows, cols);
	}

	/** Add Sequence of Frames */
	addAction(name: string, duration: number, frames: number[]) {
		this._actions[name] = {duration, frames};
	}
}

type TAction = {
	/** Sequence of tiles to be a frameset */
	frames: number[];
	/** Duration of entire sequence in ms */
	duration: number;
};

type TActions = {[action: string]: TAction};