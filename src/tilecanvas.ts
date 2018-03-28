export class TileCanvas {
	private _tiles: TileSets;
	private _canvas: HTMLCanvasElement;
	private _context: CanvasRenderingContext2D | null;
	private _imgLoad: Promise<any>[];

	/** constructor */
	constructor() {
		this._tiles = {};
		this._canvas = document.createElement('canvas');
		this._context = this._canvas.getContext('2d');
		this._imgLoad = [];
	}

	/** define width of canvas */
	set width(value: number) {
		this._canvas.width = value;
	}

	/** define height of canvas */
	set height(value: number) {
		this._canvas.height = value;
	}

	get onLoad(): Promise<any> {
		return Promise.all(this._imgLoad);
	}

	/** add image to tileset */
	addTile(tilename: string, url: string, tileSize: number, tileCount: number) {
		const img = loadImage(url);
		this._imgLoad.push(img);
		img.then(image => {
			const tileset: TileSet = {
				image,
				tileSize,
				tileCount
			};
			tileset.image.src = url;
			this._tiles[tilename] = tileset;
		});

		// let imgLoaded = false;

		// tileset.image.onload = () => {
		// 	imgLoaded = true;
		// }
		// tileset.image.onerror = () => {
		// 	imgLoaded = true;
		// }
		// while(1)
		// 	if (imgLoaded)
		// 		break;

		// const timeOut = 5*1000; //ms - waiting for max 5s to laoad
		// const start = new Date().getTime();
		// while(1)
		// 	if(tileset.image.complete || tileset.image.naturalWidth || new Date().getTime()-start>timeOut)
		// 		break;
	}

	/** draw map */
	drawMap(tilename: string, tilemap: number[][], callback?: Function) {
		const tileset = this._tiles[tilename];
		if (tileset) {
			const {image, tileCount, tileSize} = tileset;
			// image.onload = () => {
				const layerRows = tilemap.length;
				const layerCols = tilemap.length > 0 ? tilemap[0].length : 0;
				for (var r = 0; r < layerRows; r++) {
					for (var c = 0; c < layerCols; c++) {
						var tile = tilemap[ r ][ c ];
						var tileRow = (tile / tileCount) | 0;
						var tileCol = (tile % tileCount) | 0;
						if (this._context != null) {
							this._context.drawImage(image, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
						}
					}
				}
				// callback && callback();
			// }
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

type TileSets = {[key: string]: TileSet};
type TileSet = {
	image: HTMLImageElement;
	tileSize: number;
	tileCount: number;
}

function loadImage(url: string): Promise<any> {
	return new Promise<any>((resolve: any, reject: any) => {
		try {
			var img = new Image();
			img.src = url;
			img.onload = () => {
				resolve(img);
			};
			img.onerror = (err) => {
				reject(err);
			};
		} catch (e) {
			reject(e);
		}
	});
}