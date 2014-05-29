
var toEscape = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	}

module.exports = function escape (value) {

	return value.replace(/["'&]/g, function (char) {
		return toEscape[char];
	});

};