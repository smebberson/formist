
var Tag = require('../tag');

function Div () {

};

Div.prototype.render = function(field, content) {

	this.field = field;
	this.content = content || '';
	this.attributes = {
		'class': 'field'
	};

	// wrap our field in a div, with optional attributes
	var tag = new Tag('div', this.attributes, this.content);

	return tag.render();

};

module.exports = new Div;