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
