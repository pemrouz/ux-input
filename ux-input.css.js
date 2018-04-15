module.exports = `
:host {
  outline: none;
  height: 3em;
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  position: relative;
  display: inline-block; 
  vertical-align: text-bottom; }

:host * {
  box-sizing: border-box; } 

:host(.is-multiline) {
  height: 150px; }

:host(.is-hidden) {
  display: none; }

:host(.is-disabled) {
  cursor: not-allowed; }

  .textfield {
    overflow: hidden;
    line-height: 1em;
    background-color: white;
    text-align: left;
    padding: 0.875em .85em;
    height: inherit;
    font-size: 1em;
    font-family: inherit;
    font-weight: inherit;
    outline: none;
    border: 1px solid #dfdfdf;
    width: 100%;
    color: #444;
    display: block;
    cursor: inherit;
    border-radius: 3px;
    transition: all 0.2s ease-in-out; }

  .textfield:focus {
    border-color: var(--ux-input-primary, #298eea); }

  :host(.is-disabled) .textfield {
    background: rgb(235, 235, 228); }

  :host(:not(.is-multiline)) .textfield {
    white-space: nowrap; }

  :host(.is-multiline) .textfield {
    word-break: break-all; }

  :host(.is-active) .textfield {
    padding: 1.3em 0.85em 0.45em 0.85em; }

  :host(:not(.is-active)) div.textfield::before {
    position: absolute;
    display: inline-block;
    margin-top: 2px;
    content: attr(placeholder);  
    opacity: 0.6; }

  label {
    position: absolute;
    top: 6px;
    padding: 0;
    left: 1.3em;
    font-size: 0.7em;
    font-weight: 500;
    color: #bbbbbb;
    display: block;
    opacity: 0;
    /*z-index: 10;*/
    cursor: inherit;
    transition: all 0.2s ease-in-out; }
  
  :host(.is-focused) label {
    color: #298eea; }

  :host(.is-active) label {
    opacity: 1 }

  :host(.is-optional)::after {
    position: absolute;
    right: 1em;
    top: 0.3em;
    font-size: 0.6em;
    color: #ccc;
    content: 'optional'; }
`