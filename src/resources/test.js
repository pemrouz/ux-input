import 'utilise'
import 'browserenv'
import test from 'tape'
import scope from 'cssscope'
import input from './ux-input'

const style = window.getComputedStyle
    , o = once(document.body)('.container', 1)

once(document.head)
  ('style', 1)
    .html(scope(file('./dist/resources/ux-input.css'), 'ux-input'))

test('should set placeholder', t => {
  t.plan(1)
  const host = o('ux-input', 1).node()
  input.call(host, { placeholder: 'foo' })
  t.equal(host.outerHTML, stripws`
    <ux-input tabindex="-1">
      <input type="text" class="input" placeholder="foo">
      <label>foo</label>
    </ux-input>
  `, 'basic structure')
  o.html('')
})

test('should set value', t => {
  t.plan(1)
  const host = o('ux-input', 1).node()
  input.call(host, { value: 'foo' })
  t.equal(raw('input', host).value, 'foo', 'input value')
  o.html('')
})

test('should set optional indicator', t => {
  t.plan(1)
  const host = o('ux-input', 1).node()
  input.call(host, { optional: true })
  t.ok(includes('is-optional')(host.className), 'optional attr')
  o.html('')
})

test('should change focus/blur view', t => {
  t.plan(4)
  const host = o('ux-input', 1).node()
  
  time(  0, d => input.call(host, { focused: false }))
  time( 50, d => t.equal(host.className, '', 'blur class'))
  time(100, d => t.equal(style(raw('label', host)).color, 'rgb(187, 187, 187)', 'blur style'))
  
  time(150, d => input.call(host, { focused: true }))
  time(200, d => t.equal(host.className, 'is-focused', 'focus class'))
  time(400, d => t.equal(style(raw('label', host)).color, 'rgb(41, 142, 234)', 'focus style'))
  
  time(450, d => o.html(''))
})

test('should emit focus/blur event', t => {
  t.plan(2)
  const host = tdraw(o('ux-input', 1), input)
      , el = host('input')

  time(  0, d => el.emit('focus'))
  time( 50, d => t.equal(host.node().className, 'is-focused', 'focus event'))
  
  time(100, d => el.emit('blur'))
  time(150, d => t.equal(host.node().className, '', 'blur event'))
  
  time(200, d => o.html(''))
})

test('should emit keyup event', t => {
  t.plan(3)

  const host = tdraw(o('ux-input', 1), input)
      , el = host('input')

  host.on('change', d => t.ok(value, 'change event'))

  el.property('value', 'foo')
    .emit('keyup')

  t.equal(host.node().value, 'foo', 'host value')
  t.equal(el.node().value, 'foo', 'input value')

  o.html('')
})