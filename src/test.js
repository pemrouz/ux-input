import 'utilise'
import 'browserenv'
import test from 'tape'
import scope from 'cssscope'
import input from './ux-input'

const style = window.getComputedStyle
    , o = once(document.body)('.container', 1)

once(document.head)
  ('style', 1)
    .html(scope(file('dist/ux-input.css'), 'ux-input'))

test('unit test - label', t => {
  t.plan(1)

  const host = o('ux-input', 1).node()
  input.call(host, { label: 'foo' })

  t.equal(host.outerHTML, stripws`
    <ux-input>
      <input placeholder="foo">
      <label>foo</label>
    </ux-input>
  `, 'basic structure')

  o.html('')
})

test('unit test - value', t => {
  t.plan(2)

  const host = o('ux-input', 1).node()
  input.call(host, { value: 'foo' })

  t.equal(host.outerHTML, stripws`
    <ux-input class="is-active">
      <input>
      <label></label>
    </ux-input>
  `, 'basic structure')

  t.equal(raw('input', host).value, 'foo', 'input value')

  o.html('')
})

test('unit test - value', t => {
  t.plan(2)

  const host = o('ux-input', 1).node()
  input.call(host, { value: 'foo' })

  t.equal(host.outerHTML, stripws`
    <ux-input class="is-active">
      <input>
      <label></label>
    </ux-input>
  `, 'basic structure')

  t.equal(raw('input', host).value, 'foo', 'input value')

  o.html('')
})

test('unit test - should not reset value', t => {
  t.plan(2)

  const host = o('ux-input', 1).node()
  input.call(host, { value: 'foo' })
  input.call(host, { value: undefined })
  t.equal(raw('input', host).value, 'foo', 'reset input value')
  t.equal(style(raw('label', host)).opacity, '1', 'reset label visible')
  o.html('')
})

test('unit test - name', t => {
  t.plan(1)

  const host = o('ux-input', 1).node()
  input.call(host, { name: 'foo' })

  t.ok(includes('<ux-input name="foo">')(host.outerHTML), 'name attr')

  o.html('')
})

test('unit test - optional', t => {
  t.plan(1)

  const host = o('ux-input', 1).node()
  input.call(host, { optional: true })

  t.ok(includes('<ux-input class="is-optional">')(host.outerHTML), 'optional attr')

  o.html('')
})

test('unit test - focused', t => {
  const host = o('ux-input', 1).node()
  
  time(  0, d => input.call(host, { focused: false }))
  time( 50, d => t.equal(host.className, '', 'blur class'))
  time(100, d => t.equal(style(raw('label', host)).color, 'rgb(187, 187, 187)', 'blur style'))
  
  time(150, d => input.call(host, { focused: true }))
  time(200, d => t.equal(host.className, 'is-focused', 'focus class'))
  time(400, d => t.equal(style(raw('label', host)).color, 'rgb(41, 142, 234)', 'focus style'))
  
  time(450, d => { o.html(''), t.end() })
})

test('event test - focus/blur event', t => {
  const host = tdraw(o('ux-input', 1), input)
      , el = host('input')

  time(  0, d => el.emit('focus'))
  time( 50, d => t.equal(host.node().className, 'is-focused', 'focus event'))
  
  time(100, d => el.emit('blur'))
  time(150, d => t.equal(host.node().className, '', 'blur event'))
  
  time(200, d => { o.html(''), t.end() })
})

test('event test - keyup event', t => {
  t.plan(3)

  const host = tdraw(o('ux-input', 1), input)
      , el = host('input')

  host.on('change', value => t.equal(value, 'foo', 'change event'))

  el.property('value', 'foo')
    .emit('keyup')

  t.equal(host.node().value, 'foo', 'host value')
  t.equal(el.node().value, 'foo', 'input value')

  o.html('')
})