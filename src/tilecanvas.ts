import {TileSet} from './tileset';

type TileLayer = {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D | null;
};

export class TileCanvas {
	protected _canvas: HTMLCanvasElement;
	protected _context: CanvasRenderingContext2D | null;
	protected _tilesets: {[key: string]: TileSet} = {};
	protected _layers: TileLayer[] = [];
	/** constructor */
	constructor() {
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('2d');
	}
	/** define width of canvas */
	set width(value: number) {
		this._canvas.width = value;
	}
	/** define height of canvas */
	set height(value: number) {
		this._canvas.height = value;
	}
	/** Add Layer as Map */
	addLayerMap(tilename: string, tilemap: number[][]) {
		const tileset = this._tilesets[tilename];
		if (tileset) {
			const canvas = document.createElement('canvas');
			canvas.width = this._canvas.width;
			canvas.height = this._canvas.height;
			const context = canvas.getContext('2d');
			if (context) {
				for (let i = 0; i < tilemap.length; i++) {
					for (let j = 0; j < tilemap[i].length; j++) {
						context.drawImage(tileset.tile(tilemap[i][j]), i * tileset.tileWidth, j * tileset.tileHeight);
					}
				}
			}
		}
	}
	/** Add Tileset */
	addTileSet(tilename: string, tileset: TileSet) {
		this._tilesets[tilename] = tileset;
	}

	// get onLoad(): Promise<any> {
	// 	return Promise.all(this._imgLoad);
	// }

	/** add image to tileset */
	// addTile(tilename: string, url: string, tileSize: number, tileCount: number) {
	// 	const img = loadImage(url);
	// 	this._imgLoad.push(img);
	// 	img.then(image => {
	// 		const tileset: TileSet = {
	// 			image,
	// 			tileSize,
	// 			tileCount
	// 		};
	// 		tileset.image.src = url;
	// 		this._tiles[tilename] = tileset;
	// 	});
	// }

	/** draw map */
	// drawMap(tilename: string, tilemap: number[][], callback?: Function) {
	// 	const tileset = this._tiles[tilename];
	// 	if (tileset) {
	// 		const {image, tileCount, tileSize} = tileset;
	// 		const layerRows = tilemap.length;
	// 		const layerCols = tilemap.length > 0 ? tilemap[0].length : 0;
	// 		for (var r = 0; r < layerRows; r++) {
	// 			for (var c = 0; c < layerCols; c++) {
	// 				var tile = tilemap[ r ][ c ];
	// 				var tileRow = (tile / tileCount) | 0;
	// 				var tileCol = (tile % tileCount) | 0;
	// 				if (this._context != null) {
	// 					this._context.drawImage(image, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	draw() {
		for (const i in this._layers) {
			
		}
	}

	/** render to another canvas */
	render(dstCanvas: HTMLCanvasElement) {
		var context = dstCanvas.getContext('2d');
		if (context) {
			context.drawImage(this._canvas, 0, 0);
		}
	}
}

// type TileSets = {[key: string]: TileSet};
// type TileSet = {
// 	image: HTMLImageElement;
// 	tileSize: number;
// 	tileCount: number;
// }

// function loadImage(url: string): Promise<any> {
// 	return new Promise<any>((resolve: any, reject: any) => {
// 		try {
// 			var img = new Image();
// 			img.src = url;
// 			img.onload = () => {
// 				resolve(img);
// 			};
// 			img.onerror = (err) => {
// 				reject(err);
// 			};
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// }