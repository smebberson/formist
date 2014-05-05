
var Tag = require('./tag');

var Form = module.exports = function Form (options) {

	// default the options object
	this.options = options || {};

	// default the attributes object
	this.attributes = this.options.attributes || {};

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

	// <form action="" method=""></form>
	var tag = new Tag('form', this.attributes);
	return tag.render();

};