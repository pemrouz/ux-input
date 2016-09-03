'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uxInput;
function uxInput(node, state) {
  var o = once(node),
      host = node.host || node,
      type = defaults(state, 'type', 'text'),
      value = defaults(state, 'value', ''),
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