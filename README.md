# `ux-input`

[![image](https://img.shields.io/badge/component-vanilla-green.svg?style=flat-square)](https://github.com/pemrouz/vanilla/#vanilla)
[![Build Status](https://travis-ci.org/vanillacomponents/ux-input.svg)](https://travis-ci.org/vanillacomponents/ux-input)
[![Coverage Status](https://coveralls.io/repos/vanillacomponents/ux-input/badge.svg?branch=master&service=github)](https://coveralls.io/github/vanillacomponents/ux-input?branch=master)
<br>[![Browser Results](https://saucelabs.com/browser-matrix/ux-input.svg)](https://saucelabs.com/u/ux-input)


A simple input component implementing [infield top-aligned form labels](http://uxmovement.com/forms/why-infield-top-aligned-form-labels-are-quickest-to-scan/). Labels are displayed as placeholders and subsequently at the top of the field when the component has a value.

<img src="https://raw.githubusercontent.com/vanillacomponents/ux-input/master/demo.gif">

<br>
### [Usage](https://github.com/pemrouz/vanilla/#using)

<br>
### State

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
