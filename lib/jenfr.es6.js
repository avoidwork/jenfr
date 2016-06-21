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

function jenfr (target, options = defaults) {
	let defer = deferred();

	if (!target instanceof Element) {
		defer.reject(new TypeError("Element required"));
	}

	if (!options instanceof Object) {
		defer.reject(new TypeError("Object required"));
	}

	defer.resolve();

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
