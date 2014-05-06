
var Tag = require('../tag');

function Div () {

};

Div.prototype.render = function(field, content) {

	this.field = field;
	this.content = content || '';
	this.attributes = {
		'class': 'field'
	};

	// is there a label?
	if (field.options.label) {

		// we want to append to the attributes, so default if it wasn't passed in
		var attributes = field.options.label.attributes || {},
			label;

		// if the field has an id, create a for attribute unless pre-defined
		if (field.attributes.id && attributes['for'] === undefined) {
			attributes['for'] = field.attributes.id;
		}

		// generate the label tag and render it before the field itself
		label = new Tag('label', attributes, field.options.label.label);
		this.content = label.render() + this.content;

	}

	// wrap our field in a div, with optional attributes
	var tag = new Tag('div', this.attributes, this.content);

	return tag.render();

};

module.exports = new Div;