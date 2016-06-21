function jenfr (target, options = defaults) {
	if (!target instanceof Element) {
		throw new TypeError("Element required");
	}

	if (!options instanceof Object) {
		throw new TypeError("Object required");
	}

	return true;
}

jenfr.version = "{{VERSION}}";
