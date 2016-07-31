'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <ux-input tabindex="-1">\n      <input type="text" class="input" placeholder="foo">\n      <label>foo</label>\n    </ux-input>\n  '], ['\n    <ux-input tabindex="-1">\n      <input type="text" class="input" placeholder="foo">\n      <label>foo</label>\n    </ux-input>\n  ']);

require('utilise');

require('browserenv');

var _cssscope = require('cssscope');

var _cssscope2 = _interopRequireDefault(_cssscope);

var _uxInput = require('./ux-input');

var _uxInput2 = _interopRequireDefault(_uxInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var style = window.getComputedStyle,
    o = once(document.body)('.container', 1),
    test = require('tap').test;

once(document.head)('style', 1).html((0, _cssscope2.default)(file('./dist/resources/ux-input.css'), 'ux-input'));

test('should set placeholder', function (t) {
  t.plan(1);
  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { placeholder: 'foo' });
  t.equal(host.outerHTML, stripws(_templateObject), 'basic structure');
  o.html('');
});

test('should set value', function (t) {
  t.plan(1);
  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { value: 'foo' });
  t.equal(raw('input', host).value, 'foo', 'input value');
  o.html('');
});

test('should set optional indicator', function (t) {
  t.plan(1);
  var host = o('ux-input', 1).node();
  _uxInput2.default.call(host, { optional: true });
  t.ok(includes('is-optional')(host.className), 'optional attr');
  o.html('');
});

test('should change focus/blur view', function (t) {
  t.plan(4);
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
    return o.html('');
  });
});

test('should emit focus/blur event', function (t) {
  t.plan(2);
  var host = tdraw(o('ux-input', 1), _uxInput2.default),
      el = host('input');

  time(0, function (d) {
    return el.emit('focus');
  });
  time(50, function (d) {
    return t.equal(host.node().className, 'is-focused', 'focus event');
  });

  time(100, function (d) {
    return el.emit('blur');
  });
  time(150, function (d) {
    return t.equal(host.node().className, '', 'blur event');
  });

  time(200, function (d) {
    return o.html('');
  });
});

test('should emit on input event', function (t) {
  t.plan(3);

  var host = tdraw(o('ux-input', 1), _uxInput2.default),
      el = host('input');

  host.on('change', function (d) {
    return t.ok(d, 'change event');
  });

  el.property('value', 'foo').emit('input');

  t.equal(host.node().state.value, 'foo', 'host value');
  t.equal(el.node().value, 'foo', 'input value');

  o.html('');
});