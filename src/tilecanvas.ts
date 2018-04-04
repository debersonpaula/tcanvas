import {TileSet} from './tileset';

export type TileLayer = {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	tileset: TileSet;
	onRedraw?: (layer: TileLayer) => void;
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
	/** Add Layer */
	addLayer(tilename: string): TileLayer | undefined {
		const tileset = this._tilesets[tilename];
		if (tileset) {
			const canvas = document.createElement('canvas');
			canvas.width = this._canvas.width;
			canvas.height = this._canvas.height;
			const context = canvas.getContext('2d');
			if (context) {
				const layer: TileLayer = {canvas, context, tileset};
				this._layers.push(layer);
				return layer;
			}
		}
		return undefined;
	}
	/** Add Layer as Map */
	addLayerMap(tilename: string, tilemap: number[][]) {
		const layer = this.addLayer(tilename);
		if (layer) {
			for (let r = 0; r < tilemap.length; r++) {
				for (let c = 0; c < tilemap[r].length; c++) {
					layer.context.drawImage(
						layer.tileset.tile(tilemap[r][c]),
						c * layer.tileset.tileWidth,
						r * layer.tileset.tileHeight
					);
				}
			}
		}
	}
	/** Add Tileset */
	addTileSet(tilename: string, tileset: TileSet) {
		this._tilesets[tilename] = tileset;
	}

	/** Repaint the canvas with latest layers */
	redraw() {
		if (this._context) {
			this._context.clearRect(0,0, this._canvas.width, this._canvas.height);
			for (const i in this._layers) {
				const layer = this._layers[i];
				layer.onRedraw && layer.onRedraw(layer);
				this._context.drawImage(layer.canvas,0,0);
			}
		}
	}

	/** render to another canvas */
	render(dstCanvas: HTMLCanvasElement) {
		var context = dstCanvas.getContext('2d');
		if (context) {
			context.drawImage(this._canvas, 0, 0);
		}
	}

	/** Get TileSet By Name */
	tileset(tilename: string): TileSet {
		return this._tilesets[tilename];
	}
}