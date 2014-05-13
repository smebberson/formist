
var Tag = require('./tag'),
	wrappers = require('./wrappers');

var Fieldgroup = module.exports = function Fieldgroup (options, elements) {

	this.options = options || {};
	this.elements = elements || [];
	this.options.theme = this.options.theme || {};

	// handle the label tag
	if (this.options.label !== undefined && typeof this.options.label === 'string') {
		this.options.label = {
			label: this.options.label
		};
	}

	// handle the helpText
	if (this.options.helpText !== undefined && typeof this.options.helpText === 'string') {
		this.options.helpText = {
			text: this.options.helpText
		}
	}

};

Fieldgroup.prototype.render = function(theme) {
	
	var label,
		small,
		content = '',
		fieldsContent = '',
		_theme = copy(theme);

	// handle the label for the field group
	if (this.options.label) {

		// we want to append to the attributes, so default if it wasn't passed in
		var attributes = this.options.label.attributes || {};

		// generate the label tag and render it before the field itself
		label = new Tag('label', attributes, this.options.label.label);

	}

	// this there some help text?
	if (this.options.helpText) {

		attributes = this.options.helpText.attributes || { 'class': 'help-text' };

		small = new Tag((this.options.helpText.tag || 'small'), attributes, this.options.helpText.text);

	}

	// we want to have a different default theme.field function for nested fields
	_theme.field = this.options.theme.field || theme.fieldgroup.field;

	// loop through each nested Field element, and render it
	for (var i = 0; i < this.elements.length; i++) {

		// each Field, call render
		fieldsContent += this.elements[i].render(_theme);

	}

	// generate the fields content (which is label + elements)
	content = (this.options.theme.fields || theme.fieldgroup.fields)(fieldsContent, this.elements);

	return (this.options.theme.group || theme.fieldgroup.group)((label !== undefined ? label.render() : ''), content, (small !== undefined ? small.render() : ''), this);

};

var copy = function (obj) {

	var newObj = {};

	Object.keys(obj).forEach(function (key) {
		newObj[key] = obj[key];
	});

	return newObj;

};
