
var Tag = require('./tag'),
	contentTags = ['button','textarea'];

var Field = module.exports = function Field (type, options) {

	if (type === undefined || type === null) {
		throw new Error('You must supply a type for the field.');
	}

	this.type = type;
	this.options = options || {};

};

Field.prototype.render = function() {

	var tag,
		content = '';

	// certain tags (contentTags) have content not values, such as textarea and button
	if (contentTags.indexOf(this.type) <= 0) {
		content = this.options.value || '';
		delete this.options.value;
	}

	var tag = new Tag(this.type, this.options, content);
	return tag.render();

};