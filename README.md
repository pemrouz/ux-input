# `ux-input`

[![image](https://img.shields.io/badge/component-vanilla-green.svg?style=flat-square)](https://github.com/pemrouz/vanilla/#vanilla)

A simple input component implementing [infield top-aligned form labels](http://uxmovement.com/forms/why-infield-top-aligned-form-labels-are-quickest-to-scan/). Labels are displayed as placeholders and subsequently at the top of the field when the component has a value.

<img src="https://raw.githubusercontent.com/vanillacomponents/ux-input/master/demo.gif">

<br>
### Usage

This module exports:

* `ux-input`
* `ux-input.css`

You can require the resources individually and [use them directly](https://github.com/pemrouz/vanilla/#vanilla) or register them with [ripple](https://github.com/rijs/minimal#minimal) and use them as custom elements. See[`demo.html`](https://rawgithub.com/vanillacomponents/ux-input/master/demo.html) for a quick example.

<br>
### API

These are all the options you can pass to the component:

**`value = ''`**

The value of the element

**`placeholder = ''`**

The placeholder text to display

**`multiline = false`**

Allows using this component like a `textarea` 

**`focused = false`**

Whether the component is in the focused state or not

**`optional = false`**

If true, an `optional` label will be displayed on the 
top-right

**`type = 'text'`**

The type attribute to use on the underlying input element 

The following will also be set on the underlying input element if specified: `min`, `max`, `disabled`, `autofocus`, `required`

<br>
### Events

**`change`**

Notifies of changes to the value.
