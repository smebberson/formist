
var expect = require('chai').expect,
	formist = require('../'),
	Tag = require('../lib/tag');

describe('formist', function () {

	describe('has a tag class, which', function () {

		it('should render a simple opening and closing tag', function () {

			var tag = new Tag('form');
			expect(tag.render()).to.equal('<form></form>');

		});

		it('should render a simple self closing tag', function () {

			var tag = new Tag('hr');
			expect(tag.render()).to.equal('<hr />');

		});

		it('should render tag attributes', function () {

			var tag = new Tag('form', {
				action: '/save',
				method: 'post'
			});
			expect(tag.render()).to.equal('<form action="/save" method="post"></form>');

		});

		it('should render tag attributes in order', function () {

			var tag = new Tag('form', {
				method: 'post',
				action: '/save'
			});
			expect(tag.render()).to.equal('<form method="post" action="/save"></form>');

		});

		it('should render \'data-\' attributes', function () {

			var tag = new Tag('form', {
				method: 'post',
				action: '/save',
				'data-validation': 'true'
			});
			expect(tag.render()).to.equal('<form method="post" action="/save" data-validation="true"></form>');

		});

		it('should render non-value attributes', function () {

			var tag = new Tag('input', {
				type: 'text',
				disabled: true
			});
			expect(tag.render()).to.equal('<input type="text" disabled />');

		});

		it('should render style attributes', function () {

			var tag = new Tag('input', {
				type: 'text',
				disabled: true,
				style: 'text-decoration: underline;'
			});
			expect(tag.render()).to.equal('<input type="text" disabled style="text-decoration: underline;" />');

		});

	});

	describe('should render', function () {

		it('an empty form', function () {

			var form = new formist.Form({
				action: '/save',
				method: 'post'
			});

			expect(form.render()).to.equal('<form action="/save" method="post"></form>');

		});

	});

});