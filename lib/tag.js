
var escape = require('./escape'),
	voidElements = ['area','base','br','col','embed','hr','img','input','keygen','link','meta','param','source','track','wbr'];

var Tag = module.exports = function Tag (name, attributes, content) {

	if (name === undefined || name === null) {
		throw new Error('You must supply a name for the tag.');
	}

	this.attributes = attributes || {};
	this.content = content || '';
	this.name = name;

};

Tag.prototype.render = function () {

	var renderedAttributes = '',
		opening = '',
		closing = '';

	// <form action="" method=""></form>
	// <hr />
	return this.renderOpening() + this.renderContent() + this.renderClosing();

};

Tag.prototype.renderOpening = function () {

	var selfClosing = (voidElements.indexOf(this.name) >= 0)
		? ' /'
		: '';

	return '<' + this.name + '' + this.renderAttributes() + selfClosing + '>';

};

Tag.prototype.renderClosing = function () {

	return (voidElements.indexOf(this.name) >= 0)
		? ''
		: '</' + this.name + '>';

};

Tag.prototype.renderContent = function () {

	return (this.content)
		? this.content
		: '';

};

Tag.prototype.renderAttributes = function () {

	var _this = this,
		keys = Object.keys(this.attributes),
		attributes = [];

	if (!keys.length) {
		return '';
	}

	keys.forEach(function (key) {
		attributes.push(_this.renderAttribute(key, _this.attributes[key]));
	});

	return ' ' + attributes.join(' ');

};

Tag.prototype.renderAttribute = function (name, value) {

	// handle non-value attributes such as disabled
	if (value === true) {
		return name;
	}

	return name + '="' + escape(value) + '"';

};