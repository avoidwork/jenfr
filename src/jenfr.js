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

jenfr.version = "{{VERSION}}";
