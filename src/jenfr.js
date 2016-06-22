function jenfr (target, uri = "", options = {height: 100, width: 100}) {
	let defer = deferred(),
		canvas, ctx, frag, img;

	if (!target instanceof Element) {
		defer.reject(new TypeError("Element required"));
	}

	if (!options instanceof Object) {
		defer.reject(new TypeError("Object required"));
	}

	if (uri) {
		img = document.createElement("img");
		img.setAttribute("src", uri);

		["height", "width"].forEach(i => {
			if (isNaN(options[i])) {
				img.setAttribute(i, img[i]);
				options[i] = img[i];
			} else {
				img.setAttribute(i, options[i]);
			}
		});
	}

	frag = document.createDocumentFragment();
	canvas = document.createElement("canvas");
	frag.appendChild(canvas);

	Object.keys(options).forEach(i => {
		if (attribute.test(i)) {
			canvas.setAttribute(i, options[i]);
		}
	});

	if (canvas.getContext) {
		ctx = canvas.getContext("2d");

		if (options.fillStyle) {
			ctx.fillStyle = options.fillStyle;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		if (img) {
			ctx.drawImage(img, 0, 0, options.width, options.height);
		}
	} else if (img) {
		canvas.appendChild(img);
	}

	window.requestAnimationFrame(() => {
		target.appendChild(frag);
		defer.resolve([canvas, ctx, img]);
	});

	return defer.promise;
}

jenfr.version = "{{VERSION}}";
