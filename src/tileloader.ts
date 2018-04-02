import * as helpers from './helpers';

export class TileLoader {
  /** File List name */
  protected _files: TFileList = {};
  /** Image List */
  protected _images: TImageList = {};
  /** Loading progress indicating the file during the load action */
  protected _progress: number = 0;
  /** Event on Progress triggered when image was loaded */
  public onProgress?: (progress: number) => void;

  /** Add image to queue */
  add(imageName:string, url: string) {
    this._files[imageName] = url;
  }

  /** Loading queue */
  load(): Promise<any> {
    // initialize progress
    this._progress = 0;
    // create promise
    return new Promise(async (resolve, reject)=>{
      try {
        for (var i in this._files) {
          await helpers.loadImage(this._files[i]).then(data => {
            this._images[i] = data;
            this._doProgress();
          });
        }
        resolve();
      } catch(e) {
        reject(e);
      }
    });
  }

  /** Get Images */
  images(name: string): HTMLImageElement {
    return this._images[name];
  }

  /** Do Progress */
  private _doProgress() {
    this._progress++;
    this.onProgress && this.onProgress(this._progress);
  }
}

type TFileList = {[key: string]: string};
type TImageList = {[key: string]: HTMLImageElement};