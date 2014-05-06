
var Tag = require('./tag'),
	wrappers = require('./wrappers'),
	contentTags = ['button','textarea','select'];

var Field = module.exports = function Field (tag, options, wrap) {

	if (tag === undefined || tag === null) {
		throw new Error('You must supply a tag name for the field.');
	}

	this.tag = tag;
	this.options = options || {};
	this.attributes = this.options.attributes || {};
	this.wrap = wrap || wrappers.div;

	// append the type to attributes, if not supplied, and if not a contentTag
	if (contentTags.indexOf(this.tag) <= 0 && this.attributes.type === undefined) {
		this.attributes.type = this.options.type || 'text';
	}

};

Field.prototype.render = function() {

	var tag,
		content = '';

	// certain tags (contentTags) have content not values, such as textarea and button
	if (contentTags.indexOf(this.tag) >= 0) {
		content = this.options.value || '';
		delete this.attributes.value;
		delete this.attributes.type;
	}

	var tag = new Tag(this.tag, this.attributes, content);
	return this.wrap.render(this, tag.render());

};