
var Tag = require('./tag');

var Fieldset = module.exports = function Fieldset (options, elements) {

	this.options = options || {};

	this.attributes = this.options.attributes || {};

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

Fieldset.prototype.render = function() {

	var content = '',
		tag;

	for (var i = 0; i < this.elements.length; i++) {
		content += this.elements[i].render();
	}

	tag = new Tag('fieldset', this.attributes, content);
	return tag.render();

};

Fieldset.prototype.add = function(elObject) {
	
	this.elements.push(elObject);

	return elObject;

};