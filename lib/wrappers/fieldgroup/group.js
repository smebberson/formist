
var Tag = require('../../tag');

module.exports = function fieldgroupGroupWrapper (label, content, fieldgroup) {

	label = label || '';
	content = content || '';
	
	var tag,
		attributes = {
			'class': 'field'
		};

	// wrap our field in a div, with optional attributes
	tag = new Tag('div', attributes, label + content);

	return tag.render();

};