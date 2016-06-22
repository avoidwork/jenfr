/**
 * Canvas based image loader
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2016
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/jenfr
 * @version 1.0.0
 */
"use strict";

(function (global) {
	var attribute = /^(className|draggable|height|hidden|id|offsetHeight|offsetWidth|offsetLeft|offsetTop|scrollHeight|scrollLeft|scrollTop|scrollWidth|title|width)$/;

	function deferred() {
		var promise = void 0,
		    resolver = void 0,
		    rejecter = void 0;

		promise = new Promise(function (resolve, reject) {
			resolver = resolve;
			rejecter = reject;
		});

		return { resolve: resolver, reject: rejecter, promise: promise };
	}

	function jenfr(target) {
		var uri = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
		var options = arguments.length <= 2 || arguments[2] === undefined ? { height: 100, width: 100 } : arguments[2];

		var defer = deferred(),
		    canvas = void 0,
		    ctx = void 0,
		    frag = void 0,
		    img = void 0;

		if (!target instanceof Element) {
			defer.reject(new TypeError("Element required"));
		}

		if (!options instanceof Object) {
			defer.reject(new TypeError("Object required"));
		}

		if (uri) {
			img = document.createElement("img");
			img.setAttribute("src", uri);

			["height", "width"].forEach(function (i) {
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

		Object.keys(options).forEach(function (i) {
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

		window.requestAnimationFrame(function () {
			target.appendChild(frag);
			defer.resolve([canvas, ctx, img]);
		});

		return defer.promise;
	}

	jenfr.version = "1.0.0";

	// Node, AMD & window supported
	if (typeof exports !== "undefined") {
		module.exports = jenfr;
	} else if (typeof define === "function" && define.amd) {
		define(function () {
			return jenfr;
		});
	} else {
		global.jenfr = jenfr;
	}
})(typeof window !== "undefined" ? window : global);
