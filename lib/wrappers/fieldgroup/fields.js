
var Tag = require('../../tag');

module.exports = function fieldgroupFieldsWrapper (content, elements) {

	content = content || '';
	
	var tag,
		attributes = {
			'class': 'fields'
		};

	// wrap our field in a div, with optional attributes
	tag = new Tag('div', attributes, content);

	return tag.render();

};