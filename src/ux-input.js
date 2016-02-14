export default function uxInput(state) {
  var o = once(this)
    , { label = '', value = '', focused = false, optional = false, name = '' } = state
    , disabled = attr('disabled')(this)

  o.classed('is-optional', optional)
    .classed('is-focused', focused)
    .classed('is-active' , value)
    .property('value', value)
    .attr('name', name)

  o('input', 1)
    .property('value', iff(d => is.str(value))(d => value))
    .attr('disabled'   , disabled)
    .attr('placeholder', label)
    .on('focus.focused', focus)
    .on('keyup.value'  , keyup)
    .on('blur.focused' , blur)

  o('label', 1)
    .text(label) 

  function focus() {
    if (focused) return
    state.focused = true
    o.draw()
  }

  function blur() {
    if (!focused) return
    state.focused = false
    o.draw()    
  }
  
  function keyup() {
    o.emit('change', state.value = this.value)
     .draw()
  }

}