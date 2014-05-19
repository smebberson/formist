
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

		it('synchronously', function () {

			var form = new formist.Form();

			expect(form.render()).to.equal('<form></form>');

		});

		it('asynchronously', function (done) {

			var form = new formist.Form();

			form.render(function (html) {
				expect(html).to.equal('<form></form>');
				return done()
			});

		});

		it('an empty form', function () {

			var form = new formist.Form({
				attributes: {
					action: '/save',
					method: 'post'
				}
			});

			expect(form.render()).to.equal('<form action="/save" method="post"></form>');

		});

		it('a form with only fields', function () {

			var form = new formist.Form();

			form.add(new formist.Field('input', {
				attributes: {
					type: 'text'
				}
			}));

			form.add(new formist.Field('input', {
				attributes: {
					type: 'email'
				}
			}));

			form.add(new formist.Field('select'));

			expect(form.render()).to.equal('<form><div class="field"><input type="text" /></div><div class="field"><input type="email" /></div><div class="field"><select></select></div></form>');

		})

		describe('fieldsets', function () {

			it('with a default legend', function () {

				var form = new formist.Form({
					attributes: {
						action: '/save',
						method: 'post'
					}
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
					attributes: {
						action: '/save',
						method: 'post'
					}
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

			describe("with help text", function () {

				it("without attributes", function () {

					var form = new formist.Form();

					form.add(new formist.Fieldgroup({
						label: 'A group of fields',
						helpText: 'Help text for the group of fields.'
					}, [

						new formist.Field('input')

					]));

					expect(form.render()).to.equal('<form><div class="field"><label>A group of fields</label><div class="fields"><input type="text" /></div><small class="help-text">Help text for the group of fields.</small></div></form>');

				});

				it("with attributes", function () {

					var form = new formist.Form();

					form.add(new formist.Fieldgroup({
						label: 'A group of fields',
						helpText: {
							text: 'Help text for the group of fields.',
							attributes: {
								'class': 'help'
							}
						}
					}, [

						new formist.Field('input')

					]));

					expect(form.render()).to.equal('<form><div class="field"><label>A group of fields</label><div class="fields"><input type="text" /></div><small class="help">Help text for the group of fields.</small></div></form>');

				});

				it("with an alternative tag", function () {

					var form = new formist.Form();

					form.add(new formist.Fieldgroup({
						label: 'A group of fields',
						helpText: {
							text: 'Help text for the group of fields.',
							tag: 'p'
						}
					}, [

						new formist.Field('input')

					]));

					expect(form.render()).to.equal('<form><div class="field"><label>A group of fields</label><div class="fields"><input type="text" /></div><p class="help-text">Help text for the group of fields.</p></div></form>');

				});

			});

		});


		it('a form with a fieldset, and nested fields', function () {

			var form = new formist.Form({
				attributes: {
					action: '/save',
					method: 'post'
				}
			});

			var fieldset = form.add(new formist.Fieldset({
				legend: 'Personal information',
				attributes: {
					'class': 'personalInformation'
				}
			}));

			fieldset.add(new formist.Field('input', {
				attributes: {
					type: 'datetime'
				}
			}));

			fieldset.add(new formist.Field('button', {
				attributes: {
					value: 'Save'
				}
			}));

			expect(form.render()).to.equal('<form action="/save" method="post"><fieldset class="personalInformation"><legend>Personal information</legend><div class="field"><input type="datetime" /></div><div class="field"><button>Save</button></div></fieldset></form>');

		});

		describe('field groups', function () {

			var form,
				fieldset;

			beforeEach(function () {
				form = new formist.Form();
			});

			it("multiple text inputs", function () {

				form.add(new formist.Fieldgroup({
					label: 'Fields'
				}, [

					new formist.Field('input', {
						attributes: {
							type: 'text'
						}
					}),
					new formist.Field('input', {
						attributes: {
							type: 'text'
						}
					})

				]));

				expect(form.render()).to.equal('<form><div class="field"><label>Fields</label><div class="fields"><input type="text" /><input type="text" /></div></div></form>');
			});

			it("multiple radio buttons", function () {

				form.add(new formist.Fieldgroup({
					label: 'Fields'
				}, [

					new formist.Field('input', {
						label: 'Yes',
						attributes: {
							name: 'f',
							value: 'yes',
							type: 'radio'
						}
					}),
					new formist.Field('input', {
						label: 'No',
						attributes: {
							name: 'f',
							value: 'no',
							type: 'radio'
						}
					})

				]));

				expect(form.render()).to.equal('<form><div class="field"><label>Fields</label><div class="fields"><label><input name="f" value="yes" type="radio" /> Yes</label><label><input name="f" value="no" type="radio" /> No</label></div></div></form>');

			});

			it("multiple checkboxes", function () {

				form.add(new formist.Fieldgroup({
					label: 'Fields'
				}, [

					new formist.Field('input', {
						label: 'Saturday',
						attributes: {
							name: 'day[]',
							value: 'saturday',
							type: 'checkbox'
						}
					}),
					new formist.Field('input', {
						label: 'Sunday',
						attributes: {
							name: 'day[]',
							value: 'sunday',
							type: 'checkbox'
						}
					})

				]));

				expect(form.render()).to.equal('<form><div class="field"><label>Fields</label><div class="fields"><label><input name="day[]" value="saturday" type="checkbox" /> Saturday</label><label><input name="day[]" value="sunday" type="checkbox" /> Sunday</label></div></div></form>');

			});

			it("multiple selects", function () {

				form.add(new formist.Fieldgroup({
					label: 'Fields'
				}, [

					new formist.Field('select', {
						attributes: {
							name: 'month'
						}
					}),
					new formist.Field('select', {
						attributes: {
							name: 'year'
						}
					})

				]));

				expect(form.render()).to.equal('<form><div class="field"><label>Fields</label><div class="fields"><select name="month"></select><select name="year"></select></div></div></form>');
			});

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
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><input type="text" /></div></form>');

				});

				it("with a basic label", function () {

					form.add(new formist.Field('input', {
						label: 'Label',
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Label</label><input type="text" /></div></form>');

				});

				it("with a customised label", function () {

					form.add(new formist.Field('input', {
						label: {
							label: 'Label',
							attributes: {
								'class': 'field-label'
							}
						},
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label class="field-label">Label</label><input type="text" /></div></form>');

				});

			});

			describe("with help text", function () {

				it("without attributes", function () {

					var form = new formist.Form();

					form.add(new formist.Field('input', {
						label: 'Label',
						helpText: 'This is a hint, for a particular field.',
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Label</label><input type="text" /><small class="help-text">This is a hint, for a particular field.</small></div></form>');

				});

				it("with attributes", function () {

					var form = new formist.Form();

					form.add(new formist.Field('input', {
						label: 'Label',
						helpText: {
							text: 'This is a hint, for a particular field.',
							attributes: {
								'class': 'help'
							}
						},
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Label</label><input type="text" /><small class="help">This is a hint, for a particular field.</small></div></form>');

				});

				it("with attributes and an alternative tag", function () {

					var form = new formist.Form();

					form.add(new formist.Field('input', {
						label: 'Label',
						helpText: {
							text: 'This is a hint, for a particular field.',
							tag: 'p',
							attributes: {
								'class': 'help'
							}
						},
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Label</label><input type="text" /><p class="help">This is a hint, for a particular field.</p></div></form>');

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

			describe("field wrapper", function () {

				it("without label", function () {

					var form = new formist.Form({
						theme: {
							field: function (label, content, field) {
								return '<div class="form-group">' + label + content + '</div>';
							}
						}
					});

					form.add(new formist.Field('input', {
						attributes: {
							type: 'email'
						}
					}));

					expect(form.render()).to.equal('<form><div class="form-group"><input type="email" /></div></form>');

				});

				it("with label", function () {

					var form = new formist.Form({
						theme: {
							field: function (label, content, field) {
								return '<div class="form-group">' + label + content + '</div>';
							}
						}
					});

					form.add(new formist.Field('input', {
						label: 'Email',
						attributes: {
							type: 'email'
						}
					}));

					expect(form.render()).to.equal('<form><div class="form-group"><label>Email</label><input type="email" /></div></form>');

				});

			});

			it("control wrapper", function () {

				var form = new formist.Form({
					theme: {
						control: function (content, field) {
							return '<div class="col-sm-8">' + content + '</div>';
						}
					}
				});

				form.add(new formist.Field('input', {
					label: 'Email',
					attributes: {
						type: 'email'
					}
				}));

				expect(form.render()).to.equal('<form><div class="field"><label>Email</label><div class="col-sm-8"><input type="email" /></div></div></form>');

			});

			describe("field group wrapper", function () {

				it("without label", function () {

					var form = new formist.Form();

					form.add(new formist.Fieldgroup({}, [

						new formist.Field('input', {
							label: 'Email',
							attributes: {
								type: 'email'
							}
						}),
						new formist.Field('input', {
							label: 'Text',
							attributes: {
								type: 'text'
							}
						})

					]));

					expect(form.render()).to.equal('<form><div class="field"><div class="fields"><input type="email" /><input type="text" /></div></div></form>');

				});

				it("with label", function () {

					var form = new formist.Form();

					form.add(new formist.Fieldgroup({
						label: 'Field group'
					}, [

						new formist.Field('input', {
							label: 'Email',
							attributes: {
								type: 'email'
							}
						}),
						new formist.Field('input', {
							label: 'Text',
							attributes: {
								type: 'text'
							}
						})

					]));

					expect(form.render()).to.equal('<form><div class="field"><label>Field group</label><div class="fields"><input type="email" /><input type="text" /></div></div></form>');

				});

			});

			it("field group > field wrapper", function () {
				
				var form = new formist.Form();

				form.add(new formist.Fieldgroup({
					label: 'Field group',
					theme: {
						fields: function (content) {
							return '<ul>' + content + '</ul>';
						},
						field: function (label, content, field) {
							return '<li>' + label + content + '</li>';
						}
					}
				}, [

					new formist.Field('input', {
						label: 'Email',
						attributes: {
							id: 'e',
							type: 'email'
						}
					}),
					new formist.Field('input', {
						label: 'Text',
						attributes: {
							id: 't',
							type: 'text'
						}
					})

				]));

				expect(form.render()).to.equal('<form><div class="field"><label>Field group</label><ul><li><label for="e">Email</label><input id="e" type="email" /></li><li><label for="t">Text</label><input id="t" type="text" /></li></ul></div></form>');

			});

			describe("wrapper overrides", function () {

				it("specific to fieldset", function () {

					var form = new formist.Form({
						theme: {
							fieldset: function (content) {
								return '<div class="fieldset-wrapper">' + content + '</div>';
							}
						}
					});

					form.add(new formist.Fieldset({
						legend: 'First fieldset'
					}));

					form.add(new formist.Fieldset({
						legend: 'Second fieldset',
						theme: {
							fieldset: function (content) {
								return '<div class="my-specific-fieldset">' + content + '</div>';
							}
						}
					}));

					form.add(new formist.Fieldset({
						legend: 'Third fieldset'
					}));

					expect(form.render()).to.equal('<form><div class="fieldset-wrapper"><fieldset><legend>First fieldset</legend></fieldset></div><div class="my-specific-fieldset"><fieldset><legend>Second fieldset</legend></fieldset></div><div class="fieldset-wrapper"><fieldset><legend>Third fieldset</legend></fieldset></div></form>');

				});

				describe("specific to fieldgroup", function () {

					it("group", function () {

						var form = new formist.Form({
							theme: {
								fieldgroup: {
									group: function (label, content, elements) {
										return '<div class="inline-field-group">' + label + content + '</div>';
									}
								}
							}
						});

						form.add(new formist.Fieldgroup({
							label: 'First fieldgroup'
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Second fieldgroup',
							theme: {
								group: function (label, content, elements) {
									return '<div class="inline-fields">' + content + '</div>';
								}
							}
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Third fieldgroup',
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						expect(form.render()).to.equal('<form><div class="inline-field-group"><label>First fieldgroup</label><div class="fields"><input type="text" /><input type="text" /></div></div><div class="inline-fields"><div class="fields"><input type="text" /><input type="text" /></div></div><div class="inline-field-group"><label>Third fieldgroup</label><div class="fields"><input type="text" /><input type="text" /></div></div></form>');

					});

					it("fields", function () {

						var form = new formist.Form({
							theme: {
								fieldgroup: {
									fields: function (content, elements) {
										return '<div class="inline-field-group">' + content + '</div>';
									}
								}
							}
						});

						form.add(new formist.Fieldgroup({
							label: 'First fieldgroup'
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Second fieldgroup',
							theme: {
								fields: function (content, elements) {
									return '<div class="hide"></div>';
								}
							}
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Third fieldgroup',
						}, [

							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								attributes: {
									type: 'text'
								}
							})

						]));

						expect(form.render()).to.equal('<form><div class="field"><label>First fieldgroup</label><div class="inline-field-group"><input type="text" /><input type="text" /></div></div><div class="field"><label>Second fieldgroup</label><div class="hide"></div></div><div class="field"><label>Third fieldgroup</label><div class="inline-field-group"><input type="text" /><input type="text" /></div></div></form>');

					});

					it("field", function () {

						var form = new formist.Form({
							theme: {
								fieldgroup: {
									field: function (label, content, field) {
										return '<div class="inline-field">' + content + '</div>';
									}
								}
							}
						});

						form.add(new formist.Fieldgroup({
							label: 'First fieldgroup'
						}, [

							new formist.Field('input', {
								label: 'First fieldgroup, first field',
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								label: 'First fieldgorup, second field',
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Second fieldgroup',
							theme: {
								field: function (label, content, field) {
									return '<div class="inline-field with-label">' + label + content + '</div>';
								}
							}
						}, [

							new formist.Field('input', {
								label: 'Second fieldgroup, first field',
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								label: 'Second fieldgroup, second field',
								attributes: {
									type: 'text'
								}
							})

						]));

						form.add(new formist.Fieldgroup({
							label: 'Third fieldgroup',
						}, [

							new formist.Field('input', {
								label: 'Third fieldgroup, first field',
								attributes: {
									type: 'text'
								}
							}),
							new formist.Field('input', {
								label: 'Third fieldgroup, second field',
								attributes: {
									type: 'text'
								}
							})

						]));

						expect(form.render()).to.equal('<form><div class="field"><label>First fieldgroup</label><div class="fields"><div class="inline-field"><input type="text" /></div><div class="inline-field"><input type="text" /></div></div></div><div class="field"><label>Second fieldgroup</label><div class="fields"><div class="inline-field with-label"><label>Second fieldgroup, first field</label><input type="text" /></div><div class="inline-field with-label"><label>Second fieldgroup, second field</label><input type="text" /></div></div></div><div class="field"><label>Third fieldgroup</label><div class="fields"><div class="inline-field"><input type="text" /></div><div class="inline-field"><input type="text" /></div></div></div></form>');

					});

				});

				it("specific to field", function () {

					var form = new formist.Form({
						theme: {
							field: function (label, content) {
								return '<div class="field-wrapper">' + label + content + '</div>';
							}
						}
					});

					form.add(new formist.Field('input', {
						label: 'First field',
						attributes: {
							type: 'text'
						}
					}));

					form.add(new formist.Field('input', {
						label: 'Second field',
						attributes: {
							type: 'text'
						},
						theme: {
							field: function (label, content) {
								return '<div class="field-wrapper field-without-label">' + content + '</div>';
							}
						}
					}));

					form.add(new formist.Field('input', {
						label: 'Third field',
						attributes: {
							type: 'text'
						}
					}));

					expect(form.render()).to.equal('<form><div class="field-wrapper"><label>First field</label><input type="text" /></div><div class="field-wrapper field-without-label"><input type="text" /></div><div class="field-wrapper"><label>Third field</label><input type="text" /></div></form>');

				});

				it("specific to control", function () {

					var form = new formist.Form();

					form.add(new formist.Field('input', {
						label: 'Email',
						attributes: {
							type: 'email'
						}
					}));

					form.add(new formist.Field('button', {
						attributes: {
							'class': 'btn',
							value: 'Save'
						},
						theme: {
							control: function (content, field) {
								return '<div class="col-sm-offset-2 col-sm-8">' + content + '</div>';
							}
						}
					}));

					expect(form.render()).to.equal('<form><div class="field"><label>Email</label><input type="email" /></div><div class="field"><div class="col-sm-offset-2 col-sm-8"><button class="btn">Save</button></div></div></form>');

				});

			});

		});

	});

	describe("has an API", function () {

		describe("on the Form class, should allow you to", function () {

			it("set an attribute key", function () {

				var form = new formist.Form();

				form.attribute('action', '/save');
				form.attribute('method', 'post');

				expect(form.render()).to.equal('<form action="/save" method="post"></form>');

			});

			it("get an attribute key", function () {

				var form = new formist.Form({
					attributes: {
						action: '/save'
					}
				});

				form.attribute('method', 'post');

				expect(form.attribute('method')).to.equal('post');
				expect(form.attribute('action')).to.equal('/save');

			});

			it("override an attribute key", function () {

				var form = new formist.Form({
					action: '/save'
				});

				form.attribute('action', '/save/id');

				expect(form.render()).to.equal('<form action="/save/id"></form>');

			});

		});

	});

});