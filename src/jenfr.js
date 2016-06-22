function jenfr (target, uri = "", options = {height: 100, width: 100, scale: true}) {
	let defer = deferred(),
		offset = {left: 0, top: 0},
		ratio = {height: 0, width: 0},
		scale = 1,
		map = {width: "left", height: "top"},
		invalid = false,
		canvas, ctx, frag, img;

	if (!target instanceof Element) {
		invalid = true;
		defer.reject(new TypeError("`target` must be an Element"));
	}

	if (!invalid && typeof uri !== "string") {
		invalid = true;
		defer.reject(new TypeError("`uri` must be a String"));
	}

	if (!invalid && !options instanceof Object) {
		invalid = true;
		defer.reject(new TypeError("`options` must be an Object"));
	}

	function next () {
		if (img) {
			if (options.scale && options.height && options.width && (img.height > options.height || img.width > options.width)) {
				ratio.height = options.height / img.height;
				ratio.width = options.width / img.width;
				scale = ratio.height < ratio.width ? ratio.height : ratio.width;
			}

			["height", "width"].forEach(i => {
				if (isNaN(options[i])) {
					options[i] = img[i];
				} else if (options.scale) {
					img.setAttribute(i, img[i] * scale);
					offset[map[i]] = Math.floor((options[i] - img[i]) / 2);
				} else {
					img.setAttribute(i, options[i]);
				}
			});
		}

		frag = document.createDocumentFragment();
		canvas = document.createElement("canvas");
		frag.appendChild(canvas);
		canvas.setAttribute("height", options.height);
		canvas.setAttribute("width", options.width);

		if (canvas.getContext) {
			ctx = canvas.getContext("2d");

			if (img) {
				ctx.drawImage(img, offset.left, offset.top, img.width, img.height);
			}

			[canvas, ctx].forEach((obj, odx) => {
				Object.keys(options).forEach(i => {
					if (!preset.test(i)) {
						if (odx === 0 && obj.hasAttribute(i)) {
							obj.setAttribute(i, options[i]);
						} else if (typeof obj[i] === "function") {
							obj[i](...options[i]);
						}
					}
				});
			});
		} else if (img) {
			canvas.appendChild(img);
		}

		window.requestAnimationFrame(() => {
			target.appendChild(frag);
			defer.resolve([canvas, ctx, img]);
		});
	}

	if (!invalid) {
		if (uri) {
			img = document.createElement("img");
			img.onload = next;
			img.onerror = defer.reject;
			img.setAttribute("src", uri);
		} else {
			next();
		}
	}

	return defer.promise;
}

jenfr.version = "{{VERSION}}";
