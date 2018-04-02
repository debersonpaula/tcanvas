export function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve: any, reject: any) => {
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