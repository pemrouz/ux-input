'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uxInput;
function uxInput(state) {
  var o = once(this);
  var _state$label = state.label;
  var label = _state$label === undefined ? '' : _state$label;
  var _state$value = state.value;
  var value = _state$value === undefined ? '' : _state$value;
  var _state$focused = state.focused;
  var focused = _state$focused === undefined ? false : _state$focused;
  var _state$optional = state.optional;
  var optional = _state$optional === undefined ? false : _state$optional;
  var _state$name = state.name;
  var name = _state$name === undefined ? '' : _state$name;
  var disabled = attr('disabled')(this);

  o.classed('is-optional', optional).classed('is-focused', focused).classed('is-active', value).property('value', value).attr('name', name);

  o('input', 1).property('value', iff(function (d) {
    return is.str(value);
  })(function (d) {
    return value;
  })).attr('disabled', disabled).attr('placeholder', label).on('focus.focused', focus).on('keyup.value', keyup).on('blur.focused', blur);

  o('label', 1).text(label);

  function focus() {
    if (focused) return;
    state.focused = true;
    o.draw();
  }

  function blur() {
    if (!focused) return;
    state.focused = false;
    o.draw();
  }

  function keyup() {
    o.emit('change', state.value = this.value).draw();
  }
}