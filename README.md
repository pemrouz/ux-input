# `ux-input`

[![image](https://img.shields.io/badge/component-vanilla-green.svg?style=flat-square)](https://github.com/pemrouz/vanilla/#vanilla)

A simple input component implementing [infield top-aligned form labels](http://uxmovement.com/forms/why-infield-top-aligned-form-labels-are-quickest-to-scan/). Labels are displayed as placeholders and subsequently at the top of the field when the component has a value.

<img src="https://raw.githubusercontent.com/vanillacomponents/ux-input/master/demo.gif">

<br>
### Options

* **`label`**: The placeholder text to display (default: `''`)
* **`value`**: The value that will be displayed (default: `''`)
* **`name`**: An optional value for the `name` attribute on the parent (default: `''`)
* **`focused`**: Whether the component is in the focused state or not (default: `false`)
* **`optional`**: If true, an `optional` label will be displayed on the top-right (default: `false`)

<br>
### API

* **`.value`**: The current value of the element

<br>
### Events

* **`.on('input', key => ...)`**: Proxies individual input events with the correct [key identifier](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) set
* **`.on('change', value => ...)`**: Notifies of changes smoothed out (debounced) over a 100ms period to avoid spamming. First parameter is the current value.