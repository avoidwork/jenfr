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

	var defaults = {
		height: 50,
		width: 50,
		title: "",
		description: "",
		copyright: ""
	};

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
		var options = arguments.length <= 1 || arguments[1] === undefined ? defaults : arguments[1];

		var defer = deferred();

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
		define(function () {
			return jenfr;
		});
	} else {
		global.jenfr = jenfr;
	}
})(typeof window !== "undefined" ? window : global);
