export default function uxInput(state) {
  const o = once(this)
      , host        = this.host || this
      , type        = defaults(state, 'type'       , 'text')
      , value       = defaults(state, 'value'      , '')
      , min         = defaults(state, 'min'        , false)
      , max         = defaults(state, 'max'        , false)
      , focused     = defaults(state, 'focused'    , false)
      , optional    = defaults(state, 'optional'   , false)
      , disabled    = defaults(state, 'disabled'   , false)
      , autofocus   = defaults(state, 'autofocus'  , false)
      , required    = defaults(state, 'required'   , false)
      , multiline   = defaults(state, 'multiline'  , false)
      , placeholder = defaults(state, 'placeholder', '')
      , text        = multiline ? 'textContent' : 'value'
      , selector    = multiline
        ? `.input[contenteditable="true"]`
        : `input.input[type="${type}"]`

  o.attr('tabindex', '-1')
    .classed('is-optional', optional)
    .classed('is-focused' , focused)
    .classed('is-active'  , value)
    .property('value'     , value)
    .attr('multiline'     , multiline)
    .on('focus.refocus'   , refocus)

  o(selector, 1)
    .property('value'  , value)
    .attr('min'        , min)
    .attr('max'        , max)
    .attr('disabled'   , disabled)
    .attr('required'   , required)
    .attr('autofocus'  , autofocus)
    .attr('placeholder', placeholder)
    .on(`keyup.value`  , input)
    .on('keydown.value', submit)
    .on('focus.focused', focus)
    .on('blur.focused' , blur)
    .text(value)
  
  o('label', 1)
    .text(placeholder) 

  function refocus() {
    if (state.focused) return
    o('.input').node().focus()
  }

  function focus() {
    if (state.focused) return
    state.focused = true
    o.draw()
  }

  function blur(d, i, el, e) {
    if (!state.focused) return
    if (e.relatedTarget == host) return refocus(state.focused = false)
      // return console.log('refocusing', state.focused, attr('name')(host)), refocus()
    state.focused = false
    o.emit('blur')
     .draw()
  }
  
  function input() {
    o.emit('change', state.value = this[text])
     .draw()
  }

  function submit(d, i, el, e) {
    if (multiline) return
    if (e.key == 'Enter') {
      e.preventDefault()
      o.node()
       .closest('form')
       .emit('submit')
    }
  }
}