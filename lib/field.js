
var Tag = require('./tag'),
	contentTags = ['button','textarea','select'];

var Field = module.exports = function Field (tag, options) {

	if (tag === undefined || tag === null) {
		throw new Error('You must supply a tag name for the field.');
	}

	this.tag = tag;
	this.options = options || {};
	this.attributes = this.options.attributes || {};
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

	// append the type to attributes, if not supplied, and if not a contentTag
	if (contentTags.indexOf(this.tag) <= 0) {
		this.attributes.type = this.attributes.type || 'text';
	}

	// handle select options
	if (this.tag === 'select' && this.options.options) {

		this.value = this.options.value || undefined;

		for (var i = 0; i < this.options.options.length; i++) {

			// turn ['uk','us'] into [{label:'uk'},{label:'us'}]
			if (typeof this.options.options[i] === 'string') {
				this.options.options[i] = {
					label: this.options.options[i]
				};
			}

			// default the attributes object
			this.options.options[i].attributes = this.options.options[i].attributes || {};

			// attach value if it was passed in
			if (this.options.options[i].value !== undefined) {
				this.options.options[i].attributes.value = this.options.options[i].value;
			}

		}

	}

};

Field.prototype.render = function(theme) {

	var tag,
		label,
		small,
		content = '',
		attributes;

	// certain tags (contentTags) have content not values, such as textarea and button
	if (contentTags.indexOf(this.tag) >= 0) {
		content = this.attributes.value || '';
		delete this.attributes.value;
		delete this.attributes.type;
	}

	// is this a select box?
	if (this.tag === 'select' && this.options.options) {

		for (var i = 0; i < this.options.options.length; i++) {

			var optionTag,
				attr = this.options.options[i].attributes;

			// determine if this option is selected
			if ((this.value || '').indexOf(this.options.options[i].value || this.options.options[i].label) >= 0) {
				attr.selected = true;
			}

			optionTag = new Tag('option', attr, this.options.options[i].label);
			content = content + optionTag.render();

		}

	}

	// is there a label?
	if (this.options.label) {

		// we want to append to the attributes, so default if it wasn't passed in
		attributes = this.options.label.attributes || {};

		// if the field has an id, create a for attribute unless pre-defined
		if (this.attributes.id && attributes['for'] === undefined) {
			attributes['for'] = this.attributes.id;
		}

		// generate the label tag and render it before the field itself
		label = new Tag('label', attributes, this.options.label.label);

	}

	// this there some help text?
	if (this.options.helpText) {

		attributes = this.options.helpText.attributes || { 'class': 'help-text' };

		small = new Tag((this.options.helpText.tag || 'small'), attributes, this.options.helpText.text);

	}

	// the tag to render, containing the content
	tag = new Tag(this.tag, this.attributes, content);

	// wrap the rendered field, using the themes field wrapper
	return (this.options.theme.field || theme.field)(label !== undefined ? label.render() : '', (this.options.theme.control || theme.control)(tag.render(), this), (small !== undefined ? small.render() : ''), this);

};

Field.prototype.attribute = function (key, value) {
	
	if (value === undefined) {
		return this.attributes[key];
	}

	this.attributes[key] = value;

	// for chaining
	return this;

};