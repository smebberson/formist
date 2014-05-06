
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

		it('should render content within a tag', function () {

			var tag = new Tag('form', {}, '{{content}}');
			expect(tag.render()).to.equal('<form>{{content}}</form>');

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

		describe('a form with fieldsets', function () {

			it('with a default legend', function () {

				var form = new formist.Form({
					action: '/save',
					method: 'post'
				});

				form.add(new formist.Fieldset({
					legend: 'Personal information',
					attributes: {
						'class': 'personalInformation'
					}
				}));

				expect(form.render()).to.equal('<form action="/save" method="post"><fieldset class="personalInformation"><legend>Personal information</legend></fieldset></form>');

			});

			it('with a customised legend', function () {

				var form = new formist.Form({
					action: '/save',
					method: 'post'
				});

				form.add(new formist.Fieldset({
					legend: {
						label: 'Personal information',
						attributes: {
							'class': 'personal'
						}
					},
					attributes: {
						'class': 'personalInformation'
					}
				}));

				expect(form.render()).to.equal('<form action="/save" method="post"><fieldset class="personalInformation"><legend class="personal">Personal information</legend></fieldset></form>');

			});

		});


		it('a form with a fieldset, and nested fields', function () {

			var form = new formist.Form({
				action: '/save',
				method: 'post'
			});

			var fieldset = form.add(new formist.Fieldset({
				legend: 'Personal information',
				attributes: {
					'class': 'personalInformation'
				}
			}));

			fieldset.add(new formist.Field('input', {
				type: 'text'
			}));

			fieldset.add(new formist.Field('button', {
				value: 'Save'
			}));

			expect(form.render()).to.equal('<form action="/save" method="post"><fieldset class="personalInformation"><legend>Personal information</legend><div class="field"><input type="text" /></div><div class="field"><button>Save</button></div></fieldset></form>');

		});

	});

});