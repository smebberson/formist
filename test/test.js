
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

		it('a form with only fields', function () {

			var form = new formist.Form();

			form.add(new formist.Field('input', {
				type: 'text'
			}));

			form.add(new formist.Field('input', {
				type: 'email'
			}));

			form.add(new formist.Field('select'));

			expect(form.render()).to.equal('<form><div class="field"><input type="text" /></div><div class="field"><input type="email" /></div><div class="field"><select></select></div></form>');

		})

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
				type: 'datetime'
			}));

			fieldset.add(new formist.Field('button', {
				value: 'Save'
			}));

			expect(form.render()).to.equal('<form action="/save" method="post"><fieldset class="personalInformation"><legend>Personal information</legend><div class="field"><input type="datetime" /></div><div class="field"><button>Save</button></div></fieldset></form>');

		});

		describe('fields', function () {

			var form,
				fieldset;

			beforeEach(function () {
				form = new formist.Form();
			});

			describe("input:text", function () {

				it("without attributes", function () {

					form.add(new formist.Field('input'));
					expect(form.render()).to.equal('<form><div class="field"><input type="text" /></div></form>');

				});

				it("with any attributes", function () {

					form.add(new formist.Field('input', {
						attributes: {
							'class': 'input',
							'data-validation': 'required'
						}
					}));
					expect(form.render()).to.equal('<form><div class="field"><input class="input" data-validation="required" type="text" /></div></form>');

				});

			});

			describe("select", function () {

				it("without options or attributes", function () {

					form.add(new formist.Field('select'));
					expect(form.render()).to.equal('<form><div class="field"><select></select></div></form>');

				});

				it("without options, but any attributes", function () {

					form.add(new formist.Field('select', {
						attributes: {
							'class': 'select',
							'data-validation': 'required'
						}
					}));
					expect(form.render()).to.equal('<form><div class="field"><select class="select" data-validation="required"></select></div></form>');

				});

				describe("with options", function () {

					it("as an array of strings", function () {

						form.add(new formist.Field('select', {
							options: ['Australia','UK','US']
						}));
						expect(form.render()).to.equal('<form><div class="field"><select><option>Australia</option><option>UK</option><option>US</option></select></div></form>');

					});

					it("as an array of objects (label only)", function () {

						form.add(new formist.Field('select', {
							options: [{label:'Australia'},{label:'UK'},{label:'US'}]
						}));
						expect(form.render()).to.equal('<form><div class="field"><select><option>Australia</option><option>UK</option><option>US</option></select></div></form>');

					});

					it("as an array of objects (label and value)", function () {

						form.add(new formist.Field('select', {
							options: [{label:'Australia',value:'a'},{label:'UK',value:'uk'},{label:'US',value:'us'}]
						}));
						expect(form.render()).to.equal('<form><div class="field"><select><option value="a">Australia</option><option value="uk">UK</option><option value="us">US</option></select></div></form>');

					});

					it("as an array of objects with attributes", function () {

						form.add(new formist.Field('select', {
							options: [{label:'Australia',value:'a',attributes:{selected:true}},{label:'UK',value:'uk'},{label:'US',value:'us',attributes:{disabled:true}}]
						}));
						expect(form.render()).to.equal('<form><div class="field"><select><option selected value="a">Australia</option><option value="uk">UK</option><option disabled value="us">US</option></select></div></form>');

					});

				});

			});

			describe("labels", function () {

				beforeEach(function () {
					form = new formist.Form();
				});

				it("without a label", function () {

					form.add(new formist.Field('input', {
						type: 'text'
					}));

					expect(form.render()).to.equal('<form><div class="field"><input type="text" /></div></form>');

				});

				it("with a basic label", function () {

					form.add(new formist.Field('input', {
						type: 'text',
						label: 'Label'
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Label</label><input type="text" /></div></form>');

				});

				it("with a customised label", function () {

					form.add(new formist.Field('input', {
						type: 'text',
						label: {
							label: 'Label',
							attributes: {
								'class': 'field-label'
							}
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label class="field-label">Label</label><input type="text" /></div></form>');

				});

			});

		});

		describe("with a theme", function () {

			it("form wrapper", function () {

				var form = new formist.Form({
					theme: {
						form: function (content) {
							return '<div class="myform">' + content + '</div>';
						}
					}
				});

				expect(form.render()).to.equal('<div class="myform"><form></form></div>');

			});

			it("fieldset wrapper", function () {

				var form = new formist.Form({
					theme: {
						fieldset: function (content, fieldset) {
							return '<div class="fieldset">' + content + '</div>';
						}
					}
				});

				form.add(new formist.Fieldset({
					legend: 'My fieldset'
				}));

				expect(form.render()).to.equal('<form><div class="fieldset"><fieldset><legend>My fieldset</legend></fieldset></div></form>');

			});

			it("field wrapper", function () {

				var form = new formist.Form({
					theme: {
						field: function (content, field) {
							return '<div class="form-group">' + content + '</div>';
						}
					}
				});

				form.add(new formist.Field('input', {
					type: 'email',
					label: 'Email'
				}));

				expect(form.render()).to.equal('<form><div class="form-group"><label>Email</label><input type="email" /></div></form>');

			});



			it("input wrapper", function () {

				var form = new formist.Form({
					theme: {
						field: function (content, field) {
							return '<div class="form-group">' + content + '</div>';
						},
						input: function (content, field) {
							return '<div class="col-sm-8">' + content + '</div>';
						}
					}
				});

				form.add(new formist.Field('input', {
					type: 'email',
					label: 'Email'
				}));

				expect(form.render()).to.equal('<form><div class="form-group"><label>Email</label><div class="col-sm-8"><input type="email" /></div></div></form>');

			});

		});

	});

});