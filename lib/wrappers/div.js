
var Tag = require('../tag');

module.exports = function div (content, field) {

	content = content || '';
	
	var tag,
		attributes = {
			'class': 'field'
		};

	// wrap our field in a div, with optional attributes
	tag = new Tag('div', attributes, content);

	return tag.render();

};