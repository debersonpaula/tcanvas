import * as helpers from './helpers';

export class TileSet {
	// protected _img: HTMLImageElement | undefined;
	protected _imgPromise: Promise<HTMLImageElement>;
	protected _tiles: HTMLCanvasElement[];

	constructor(url: string, tileWidth: number, tileHeight: number, rows: number, cols: number) {
		// initializes tiles
		this._tiles = [];
		// load image
		this._imgPromise = helpers.loadImage(url);
		this._imgPromise.then(value => {
			// assign image element
			const img: HTMLImageElement = value;
			// crop tiles
			for (let r = 0; r < rows; r++) {
			 	for (let c = 0; c < cols; c++) {
					this._tiles.push(
						cropImageToCanvas(img, c * tileWidth, r * tileHeight, tileWidth, tileHeight)
					);
			 	}
			}
		});
	}

	get imgLoad() {
		return this._imgPromise;
	}

	tile(index: number): HTMLCanvasElement {
		return this._tiles[index];
	}

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