/**
 * Photo library
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2016
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/jenfr
 * @version 1.0.0
 */
"use strict";

(function (global) {
const attribute = /^(className|draggable|height|hidden|id|offsetHeight|offsetWidth|offsetLeft|offsetTop|scrollHeight|scrollLeft|scrollTop|scrollWidth|title|width)$/;

const defaults = {
	height: 50,
	width: 50,
	title: "",
	description: "",
	copyright: ""
};

function deferred () {
	let promise, resolver, rejecter;

	promise = new Promise(function (resolve, reject) {
		resolver = resolve;
		rejecter = reject;
	});

	return {resolve: resolver, reject: rejecter, promise: promise};
}

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

jenfr.version = "1.0.0";

// Node, AMD & window supported
if (typeof exports !== "undefined") {
	module.exports = jenfr;
} else if (typeof define === "function" && define.amd) {
	define(() => {
		return jenfr;
	});
} else {
	global.jenfr = jenfr;
}}(typeof window !== "undefined" ? window : global));
