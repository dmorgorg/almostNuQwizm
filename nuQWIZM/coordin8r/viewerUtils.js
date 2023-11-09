var eduk8r = eduk8r || {};
eduk8r.sprites = eduk8r.sprites || {};
eduk8r.sprites.viewer = eduk8r.sprites.viewer || {};

eduk8r.sprites.viewer.utils = (function() {

	"use strict";

	// set inputs to defaults
	function setDefaults(defaults, prefix) {
		$.each(defaults, function(key, defaultValue) {
			$("#" + prefix + key).val(defaultValue);
		});
	}

	function clean(defaults, props) {
		var str = '';
		// if a model property value has been returned to its default value, we
		// don't need it in the arguments of the sprite constructor call
		$.each(props, function(key, value) {
			if (value === defaults[key]) {
				delete props[key];
			}
		});
		$.each(props, function(key, value) {
			str += key + ' ';
		});
		return str;
	}

	return {
		setDefaults : setDefaults,
		clean : clean
	};

}());