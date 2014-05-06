
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

		var attributes = {},
			label;

		if (field.attributes.id) {
			attributes['for'] = field.attributes.id;
		}

		label = new Tag('label', attributes, field.options.label);

		this.content = label.render() + this.content;

	}

	var tag = new Tag('div', this.attributes, this.content);

	return tag.render();

};

module.exports = new Div;