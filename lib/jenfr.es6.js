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

function jenfr (target, options = defaults) {
	if (!target instanceof Element) {
		throw new TypeError("Element required");
	}

	if (!options instanceof Object) {
		throw new TypeError("Object required");
	}

	return true;
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
