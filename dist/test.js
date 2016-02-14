'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <ux-input>\n      <input placeholder="foo">\n      <label>foo</label>\n    </ux-input>\n  '], ['\n    <ux-input>\n      <input placeholder="foo">\n      <label>foo</label>\n    </ux-input>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <ux-input class="is-active">\n      <input>\n      <label></label>\n    </ux-input>\n  '], ['\n    <ux-input class="is-active">\n      <input>\n      <label></label>\n    </ux-input>\n  ']);

require('utilise');

require('browserenv');

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _cssscope = require('cssscope');

var _cssscope2 = _interopRequireDefault(_cssscope);

var _uxInput = require('./ux-input');

var _uxInput2 = _interopRequireDefault(_uxInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = window.getComputedStyle,
    o = once(document.body)('.container', 1);

once(document.head)('style', 1).html((0, _cssscope2.default)(file('dist/ux-input.css'), 'ux-input'));

(0, _tape2.default)('unit test - label', function (t) {
  t.plan(1);

  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { label: 'foo' });

  t.equal(host.outerHTML, stripws(_templateObject), 'basic structure');

  o.html('');
});

(0, _tape2.default)('unit test - value', function (t) {
  t.plan(2);

  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { value: 'foo' });

  t.equal(host.outerHTML, stripws(_templateObject2), 'basic structure');

  t.equal(raw('input', host).value, 'foo', 'input value');

  o.html('');
});

(0, _tape2.default)('unit test - value', function (t) {
  t.plan(2);

  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { value: 'foo' });

  t.equal(host.outerHTML, stripws(_templateObject2), 'basic structure');

  t.equal(raw('input', host).value, 'foo', 'input value');

  o.html('');
});

(0, _tape2.default)('unit test - name', function (t) {
  t.plan(1);

  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { name: 'foo' });

  t.ok(includes('<ux-input name="foo">')(host.outerHTML), 'name attr');

  o.html('');
});

(0, _tape2.default)('unit test - optional', function (t) {
  t.plan(1);

  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { optional: true });

  t.ok(includes('<ux-input class="is-optional">')(host.outerHTML), 'optional attr');

  o.html('');
});

(0, _tape2.default)('unit test - focused', function (t) {
  var host = o('ux-input', 1).node();

  time(0, function (d) {
    return _uxInput2.default.call(host, { focused: false });
  });
  time(50, function (d) {
    return t.equal(host.className, '', 'blur class');
  });
  time(100, function (d) {
    return t.equal(style(raw('label', host)).color, 'rgb(187, 187, 187)', 'blur style');
  });

  time(150, function (d) {
    return _uxInput2.default.call(host, { focused: true });
  });
  time(200, function (d) {
    return t.equal(host.className, 'is-focused', 'focus class');
  });
  time(400, function (d) {
    return t.equal(style(raw('label', host)).color, 'rgb(41, 142, 234)', 'focus style');
  });

  time(450, function (d) {
    o.html(''), t.end();
  });
});

(0, _tape2.default)('event test - focus/blur event', function (t) {
  var host = tdraw(o('ux-input', 1).node(), _uxInput2.default, {}),
      el = o(host)('input');

  time(0, function (d) {
    return el.emit('focus');
  });
  time(50, function (d) {
    return t.equal(host.className, 'is-focused', 'focus event');
  });

  time(100, function (d) {
    return el.emit('blur');
  });
  time(150, function (d) {
    return t.equal(host.className, '', 'blur event');
  });

  time(200, function (d) {
    o.html(''), t.end();
  });
});

(0, _tape2.default)('event test - keyup event', function (t) {
  t.plan(2);

  var host = tdraw(o('ux-input', 1).node(), _uxInput2.default, {}),
      el = o(host)('input');

  el.property('value', 'foo').emit('keyup');

  t.equal(host.value, 'foo', 'host value');
  t.equal(el.node().value, 'foo', 'input value');
});