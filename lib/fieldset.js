
var Tag = require('./tag');

var Fieldset = module.exports = function Fieldset (options, elements) {

	// options is optional
	if (Array.isArray(options)) {
		elements = options;
		options = {};
	}

	this.options = options || {};

	this.attributes = this.options.attributes || {};

	this.options.theme = this.options.theme || {};

	this.elements = elements || [];

	// handle the legend tag
	if (this.options.legend !== undefined && typeof this.options.legend === 'string') {
		this.options.legend = {
			label: this.options.legend,
			attributes: {}
		};
	}

	if (this.options.legend) {
		this.elements.unshift(new Tag('legend', this.options.legend.attributes, this.options.legend.label));
	}

};

Fieldset.prototype.render = function(theme) {

	var content = '',
		tag;

	for (var i = 0; i < this.elements.length; i++) {
		content += this.elements[i].render(theme);
	}

	tag = new Tag('fieldset', this.attributes, content);

	return (this.options.theme.fieldset || theme.fieldset)(tag.render(), this);

};

Fieldset.prototype.add = function(elObject) {

	this.elements.push(elObject);

	return elObject;

};

Fieldset.prototype.attribute = function (key, value) {

	if (value === undefined) {
		return this.attributes[key];
	}

	this.attributes[key] = value;

	// for chaining
	return this;

};
