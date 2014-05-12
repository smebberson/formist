
var Tag = require('./tag'),
	wrappers = require('./wrappers');

var Form = module.exports = function Form (options, elements) {

	// default the options object
	this.options = options || {};

	// default the attributes object
	this.attributes = this.options.attributes || {};

	// default the elements object
	this.elements = elements || [];

	// mixin action to attributes if existing
	if (this.options.action !== undefined) {
		this.attributes.action = this.options.action;
	}

	// mixin method to attributes if existing
	if (this.options.method !== undefined) {
		this.attributes.method = this.options.method;
	}

	// default the theme object
	this.options.theme = this.options.theme || {};

	// default the form wrapper to no-op
	this.options.theme.form = this.options.theme.form || wrappers.noop;

	// default the fieldset wrapper to no-op
	this.options.theme.fieldset = this.options.theme.fieldset || wrappers.noop;

	// default the fieldgroup wrapper to div
	this.options.theme.fieldgroup = this.options.theme.fieldgroup || {};

	this.options.theme.fieldgroup.group = this.options.theme.fieldgroup.group || wrappers.fieldgroup.group;

	this.options.theme.fieldgroup.fields = this.options.theme.fieldgroup.fields || wrappers.fieldgroup.fields;

	this.options.theme.fieldgroup.field = this.options.theme.fieldgroup.field || wrappers.fieldgroup.field;

	// default the field wrapper to div
	this.options.theme.field = this.options.theme.field || wrappers.field;

	// default the input wrapper to no-op
	this.options.theme.control = this.options.theme.control || wrappers.noop;

};

Form.prototype.render = function () {

	var content = '',
		tag;

	for (var i = 0; i < this.elements.length; i++) {
		content += this.elements[i].render(this.options.theme);
	}

	tag = new Tag('form', this.attributes, content);

	return this.options.theme.form(tag.render(), this);

};

Form.prototype.add = function (elObject) {

	this.elements.push(elObject);

	return elObject;

};