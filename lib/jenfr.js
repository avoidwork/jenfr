/**
 * Canvas based image loader
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2016
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/jenfr
 * @version 1.0.4
 */
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (global) {
	var preset = /^(drawImage|height|scale|width)$/;

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
		var options = arguments.length <= 2 || arguments[2] === undefined ? { height: 100, width: 100, scale: true } : arguments[2];

		var defer = deferred(),
		    offset = { left: 0, top: 0 },
		    ratio = { height: 0, width: 0 },
		    scale = 1,
		    map = { width: "left", height: "top" },
		    invalid = false,
		    canvas = void 0,
		    ctx = void 0,
		    frag = void 0,
		    img = void 0;

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

		function next() {
			if (img) {
				if (options.scale && options.height && options.width && (img.height > options.height || img.width > options.width)) {
					ratio.height = options.height / img.height;
					ratio.width = options.width / img.width;
					scale = ratio.height < ratio.width ? ratio.height : ratio.width;
				}

				["height", "width"].forEach(function (i) {
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

				[canvas, ctx].forEach(function (obj, odx) {
					Object.keys(options).forEach(function (i) {
						if (!preset.test(i)) {
							if (odx === 0 && obj.hasAttribute(i)) {
								obj.setAttribute(i, options[i]);
							} else if (typeof obj[i] === "function") {
								obj[i].apply(obj, _toConsumableArray(options[i]));
							}
						}
					});
				});
			} else if (img) {
				canvas.appendChild(img);
			}

			window.requestAnimationFrame(function () {
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

	jenfr.version = "1.0.4";

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
