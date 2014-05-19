
var Tag = require('../../tag');

module.exports = function fieldgroupFieldWrapper (label, content, helpText, field) {

	var label = '';

	content = content || '';

	// if we're dealing with a radio or checkbox input tag, re-render the input inside the label
	if (field.tag === 'input' && (field.attributes.type === 'radio' || field.attributes.type === 'checkbox') && field.options.label) {

		// we want to append to the attributes, so default if it wasn't passed in
		var attributes = field.options.label.attributes || {};

		// generate the label tag and render it before the field itself
		label = new Tag('label', attributes, content + ' ' + field.options.label.label);

		return label.render();

	}

	// if we're dealing with an input that isn't radio or checbox, just output the actual tag itself
	return content;

};