const { test } = require('tap')
    , { spawn } = require('spawn-client')

test('should set placeholder', spawn('<ux-input id="el">', async () => {
  el.state = { placeholder: 'foo' }
  await el.render()

  same(el, `
    <ux-input id="el" stylesheet="3224305191" tabindex="0">
      <input type="text" class="textfield" tabindex="-1" placeholder="foo">
      <label>foo</label>
    </ux-input>
  `)
}))

test('should set value', spawn('<ux-input id="el">', async () => {
  el.state = { value: 'foo' }
  await el.render()

  same(el.firstElementChild.value, 'foo')
}))

test('should set optional indicator', spawn('<ux-input id="el">', async () => {
  el.state = { optional: true }
  await el.render()

  same(el.className.includes('is-optional'), true)
}))

test('should change focus/blur view', spawn('<ux-input id="el">', async () => {
  const delay = await require('utilise/delay')

  el.state = { focused: false }
  await el.render()

  same(el.className, '')
  same(style(el.get('label')).color, 'rgb(187, 187, 187)')

  el.state = { focused: true }
  await el.render()
  await delay(200)
  same(el.className, 'is-focused')
  same(style(el.get('label')).color, 'rgb(41, 142, 234)')
}))

test('should emit focus/blur event', spawn('<ux-input id="el">', async () => {
  await el.render()
  const input = el.get('input')

  await page('focus', 'input')
  same(el.className, 'is-focused')

  await page('click', 'body')
  same(el.className, '')
}))

test('should emit input event', spawn('<ux-input id="el">', async () => {
  await el.render()
  const input = el.get('input')
      , change = el.once('change')

  await page('type', 'input', 'foo')

  same(el.state.value, 'foo')
  same(el.value, 'foo')
  return change
}))
