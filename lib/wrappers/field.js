
var Tag = require('../tag');

module.exports = function fieldWrapper (label, content, helpText, field) {

	label = label || '';
	content = content || '';
	
	var tag,
		attributes = {
			'class': 'field'
		};

	// wrap our field in a div, with optional attributes
	tag = new Tag('div', attributes, label + content + helpText);

	return tag.render();

};