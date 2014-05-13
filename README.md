formist
=======

Formist is a node.js forms library.

The key difference between Formist and other node.js forms libraries, is that its DSL more closely matches that of HTML form tags, providing much more flexibility. No widgets.

It was designed to be:

- highly flexible
- easy to manipulate output for styling (using themes)

## To do

It is still in early stages of development, and has to date been focused on output generation. The following needs to make its way into the library:

- form binding
- server-side validation handling
- error handling
- form + error rendering

## Installing

`npm install formist --save`

### Requiring formist

`var formist = require('formist');`

## Examples

The best way to learn is by example. There are a number of examples in the [formist-example](https://github.com/smebberson/formist-example) repository.

## Creating forms

The following breaks down Formist forms technology.

### Form

A `Form` is a standard HTML form. A `Form` can contain multiple:

- `Fieldset`
- `Field`
- `Fieldgroup`

#### To create a form

```js
var form = new formist.Form(options, elements);
```

`formist.Form` will take an options object (`options`), with the following:

- `action`, `String`: the action for the form. This is optional.
- `method`, `String`: the method for the form. This is optional.
- `theme`, `Object`: a key-function object defining theming overrides. This is optional.
- `attributes`, `Object`: a key-value object defining any HTML tags. This is optional.

`formist.Form` will take an array of `Fieldset`, `Field` or `Fieldgroup` objects (`elements`).

#### To add form elements

```js
form.add(element);
```

`formist.Form.add` will take a `Fieldset`, `Field`, or `Fieldgroup`.

### Fieldset

A `Fieldset` represents a standard HTML fieldset. A `Fieldset` can contain multiple:

- `Fieldgroup`
- `Field`

#### To create a fieldset

```js
var fieldset = form.add(formist.Fieldset(options, elements));
```

`formist.Fieldset` will take an options object (`options`), with the following:

- `legend`, `String`: a string value for the HTML `legend` tag. This is optional.
- `theme`, `Object`: a key-function object defining theming overrides. This is optional.
- `attributes`, `Object`: a key-value object defining any HTML tags. This is optional.

`formist.Fieldset` will take an `Array`, `elements` of `Fieldset`, `Field` or `Fieldgroup` objects.

#### To add form elements

```js
fieldset.add(element);
```

`formist.Form.add` will take a `Field`, or `Fieldgroup`.

### Field

A field presents a label, and HTML form control (i.e. `input`, `select`, `button`, `textarea`). A field can not contain anything.

#### To create a field

```js
form.add(formist.Field(tag, options));
```

`formist.Field` will take a `String`, `tag` representing the name of the HTML tag to produce (i.e. input, select, button, textarea).

`formist.Field` will take an `Object`, `options`, with the following:

- `label`, `Object`: an object with a label key, and an attributes object representing key-value attributes to apply to the `label` tag. **For brevity, this can be a string, if non attributes are required.** This is optional.
- `helpText`, `Object`: an object with a `text` key, `tag` key (defaulting to 'small), and an attributes object representing key-value attributes to apply to the `small` tag. **For brevity, this can be a string, if no attributes or tag changes are required.** This is optional.
- `theme`, `Object`: a key-function object defining theming overrides. This is optional.
- `attributes`, `Object`: a key-value object defining any HTML tags. This is optional.

### Control

A control represents a HTML form control (i.e. `input`, `select`, `button`, `textarea`). You don't define controls specifically, you can only wrap them.

### Fieldgroup

A fieldgroup represents a group of fields (i.e. Field). A field group can be passed multiple:

- `Field`

#### To create a fieldgroup

```js
form.add(formist.Fieldgroup(options, elements));
```

`formist.Fieldgroup` will take an `Object`, `options`, with the following:

- `label`, `Object`: an object with a label key, and an attributes object representing key-value attributes to apply to the `label` tag. **For brevity, this can be a string, if non attributes are required.** This is optional.
- `helpText`, `Object`: an object with a `text` key, `tag` key (defaulting to 'small), and an attributes object representing key-value attributes to apply to the `small` tag. **For brevity, this can be a string, if no attributes or tag changes are required.** This is optional.
- `theme`, `Object`: a key-function object defining theming overrides. This is optional.
- `attributes`, `Object`: a key-value object defining any HTML tags. This is optional.

`formist.Fieldgroup` will take an `Array`, `elements` of `Field`.

## Theming

Formist has advanced support for theming. To define a theme, you can pass a theme object, with the following functions and signatures.

```js
theme: {
	form: function (content, form) {
	},
	fieldset: function (content, fieldset) {
	},
	fieldgroup: {
		group: function (label, content, fieldgroup) {
		},
		fields: function (content, fields) {
		},
		field: function (label, content, field) {
		}
	},
	field: function (label, content, field) {
	},
	control: function (content) {
	}
}
```
