
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

	// handle the label tag
	if (this.options.label !== undefined && typeof this.options.label === 'string') {
		this.options.label = {
			label: this.options.label
		};
	}

	// append the type to attributes, if not supplied, and if not a contentTag
	if (contentTags.indexOf(this.tag) <= 0 && this.attributes.type === undefined) {
		this.attributes.type = this.options.type || 'text';
	}

	// handle select options
	if (this.tag === 'select' && this.options.options) {

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

Field.prototype.render = function() {

	var tag,
		content = '';

	// certain tags (contentTags) have content not values, such as textarea and button
	if (contentTags.indexOf(this.tag) >= 0) {
		content = this.options.value || '';
		delete this.attributes.value;
		delete this.attributes.type;
	}

	// is this a select box?
	if (this.tag === 'select' && this.options.options) {

		for (var i = 0; i < this.options.options.length; i++) {

			var tag = new Tag('option', this.options.options[i].attributes, this.options.options[i].label);
			content = content + tag.render();

		}

	}

	var tag = new Tag(this.tag, this.attributes, content);
	return this.wrap.render(this, tag.render());

};