function jenfr (target, options = defaults, uri = "") {
	let defer = deferred(),
		canvas, ctx, frag, img;

	if (!target instanceof Element) {
		defer.reject(new TypeError("Element required"));
	}

	if (!options instanceof Object) {
		defer.reject(new TypeError("Object required"));
	}

	frag = document.createDocumentFragment();
	canvas = document.createElement("canvas");
	frag.appendChild(canvas);

	Object.keys(defaults).forEach(i => {
		if (attribute.test(i)) {
			canvas.setAttribute(i, defaults[i]);
		}
	});

	if (canvas.getContext) {
		ctx = canvas.getContext("2d");

		if (options.fillStyle) {
			ctx.fillStyle = options.fillStyle;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
	} else if (uri) {
		img = document.createElement("img");
		img.setAttribute("src", uri);
		img.setAttribute("height", options.height);
		img.setAttribute("width", options.width);
		canvas.appendChild(img);
	}

	window.requestAnimationFrame(() => {
		target.appendChild(frag);
		defer.resolve([canvas, ctx, img]);
	});

	return defer.promise;
}

jenfr.version = "{{VERSION}}";
