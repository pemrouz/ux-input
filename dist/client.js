(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
ripple(require('./'))

},{"./":2}],2:[function(require,module,exports){
module.exports = {
    "ux-input.css": {
        "name": "ux-input.css",
        "body": ":host {\r\n  outline: none;\r\n  height: 3em;\r\n  box-sizing: border-box;\r\n  font-size: inherit;\r\n  font-family: inherit;\r\n  position: relative;\r\n  display: inline-block; \r\n  vertical-align: text-bottom; }\r\n\r\n:host * {\r\n  box-sizing: border-box; } \r\n\r\n:host(.is-multiline) {\r\n  height: 150px; }\r\n\r\n:host(.is-hidden) {\r\n  display: none; }\r\n\r\n:host(.is-disabled) {\r\n  cursor: not-allowed; }\r\n\r\n  .textfield {\r\n    overflow: hidden;\r\n    line-height: 1em;\r\n    background-color: white;\r\n    text-align: left;\r\n    padding: 0.875em .85em;\r\n    height: inherit;\r\n    font-size: 1em;\r\n    font-family: inherit;\r\n    font-weight: inherit;\r\n    outline: none;\r\n    border: 1px solid #dfdfdf;\r\n    width: 100%;\r\n    color: #444;\r\n    display: block;\r\n    cursor: inherit;\r\n    border-radius: 3px;\r\n    transition: all 0.2s ease-in-out; }\r\n\r\n  .textfield:focus {\r\n    border-color: var(--ux-input-primary, #298eea); }\r\n\r\n  :host(.is-disabled) .textfield {\r\n    background: rgb(235, 235, 228); }\r\n\r\n  :host(:not(.is-multiline)) .textfield {\r\n    white-space: nowrap; }\r\n\r\n  :host(.is-multiline) .textfield {\r\n    word-break: break-all; }\r\n\r\n  :host(.is-active) .textfield {\r\n    padding: 1.3em 0.85em 0.45em 0.85em; }\r\n\r\n  :host(:not(.is-active)) div.textfield::before {\r\n    position: absolute;\r\n    display: inline-block;\r\n    margin-top: 2px;\r\n    content: attr(placeholder);  \r\n    opacity: 0.6; }\r\n\r\n  label {\r\n    position: absolute;\r\n    top: 6px;\r\n    padding: 0;\r\n    left: 1.3em;\r\n    font-size: 0.7em;\r\n    font-weight: 500;\r\n    color: #bbbbbb;\r\n    display: block;\r\n    opacity: 0;\r\n    /*z-index: 10;*/\r\n    cursor: inherit;\r\n    transition: all 0.2s ease-in-out; }\r\n  \r\n  :host(.is-focused) label {\r\n    color: #298eea; }\r\n\r\n  :host(.is-active) label {\r\n    opacity: 1 }\r\n\r\n  :host(.is-optional)::after {\r\n    position: absolute;\r\n    right: 1em;\r\n    top: 0.3em;\r\n    font-size: 0.6em;\r\n    color: #ccc;\r\n    content: 'optional'; }"
    },
    "ux-input": {
        "name": "ux-input",
        "body": require('./ux-input.js').default || require('./ux-input.js'),
        "headers": {
            "needs": "[css]"
        }
    }
}
},{"./ux-input.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uxInput;
function uxInput(node, state) {
  var o = once(node),
      host = node.host || node,
      type = defaults(state, 'type', 'text'),
      value = defaults(state, 'value', state.default || ''),
      min = defaults(state, 'min', false),
      max = defaults(state, 'max', false),
      focused = defaults(state, 'focused', false),
      optional = defaults(state, 'optional', false),
      disabled = defaults(state, 'disabled', false),
      autofocus = defaults(state, 'autofocus', false),
      required = defaults(state, 'required', false),
      multiline = defaults(state, 'multiline', false),
      placeholder = defaults(state, 'placeholder', ''),
      text = multiline ? 'textContent' : 'value',
      selector = multiline ? '.textfield[contenteditable="true"]' : 'input.textfield[type="' + type + '"]';

  o.attr('tabindex', '0').classed('is-optional', optional).classed('is-focused', focused).classed('is-disabled', disabled).classed('is-multiline', multiline).classed('is-active', value).property('value', value).on('focus.refocus', refocus);

  o(selector, 1).property('value', value).attr('tabindex', -1).attr('min', min).attr('max', max).attr('disabled', disabled).attr('required', required).attr('autofocus', autofocus).attr('placeholder', placeholder).on('input.value', input).on('keydown.submit', submit).on('focus.focused', focus).on('blur.focused', blur).text(value);

  o('label', 1).text(placeholder);

  function refocus() {
    if (state.focused) return;
    o('.textfield').node().focus();
  }

  function focus() {
    if (state.focused) return;
    state.focused = true;
    o.draw();
  }

  function blur(d, i, el, e) {
    if (!state.focused) return;
    if (e.relatedTarget == host) return refocus(state.focused = false);
    state.focused = false;
    o.emit('blur').draw();
  }

  function input() {
    o.emit('change', state.value = this[text]).draw();
  }

  function submit(d, i, el, e) {
    if (multiline) return;
    if (e.key == 'Enter') {
      e.preventDefault();
      o.closest('form').emit('submit');
    }
  }
}
},{}]},{},[1]);
