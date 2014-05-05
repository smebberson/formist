
var Tag = require('./tag');

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

};

Form.prototype.render = function () {

	var content = '',
		tag;

	for (var i = 0; i < this.elements.length; i++) {
		content += this.elements[i].render();
	}

	tag = new Tag('form', this.attributes, content);

	return tag.render();

};

Form.prototype.add = function (elObject) {

	this.elements.push(elObject);

	return elObject;

};