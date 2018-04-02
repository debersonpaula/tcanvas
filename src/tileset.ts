import * as helpers from './helpers';

export class TileSet {
	protected _tiles: HTMLCanvasElement[];
	public tileWidth: number = 0;
	public tileHeight: number = 0;
	/** Create TileSet */
	constructor(image: HTMLImageElement, tileWidth: number, tileHeight: number, rows: number, cols: number) {
		this._tiles = [];
		this.tileHeight = tileHeight;
		this.tileWidth = tileWidth;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				this._tiles.push(
					cropImageToCanvas(image, c * tileWidth, r * tileHeight, tileWidth, tileHeight)
				);
			}
		}
	}
	/** Get Tile by index number */
	tile(index: number): HTMLCanvasElement {
		return this._tiles[index];
	}
	/** Count of tiles */
	get count() {
		return this._tiles.length;
	}
}

function cropImageToCanvas(img: HTMLImageElement, left: number, top: number, width: number, height: number): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
	if (context) {
		context.drawImage(img, left, top, width, height, 0, 0, width, height);
	}
	return canvas;
}