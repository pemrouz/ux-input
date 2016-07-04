module.exports = {
    "ux-input.css": {
        "name": "ux-input.css",
        "body": ":host {\r\n  height: 3em;\r\n  box-sizing: border-box;\r\n  font-size: inherit;\r\n  font-family: inherit;\r\n  position: relative;\r\n  display: inline-block; \r\n  vertical-align: text-bottom; }\r\n\r\n:host([multiline]) {\r\n  height: 150px; }\r\n\r\n:host * {\r\n  box-sizing: border-box; } \r\n\r\n:host(.is-hidden) {\r\n  display: none; }\r\n\r\n  :host(:not([multiline])) .input {\r\n    white-space: nowrap; }\r\n\r\n  :host([multiline]) .input {\r\n    word-break: break-all; }\r\n\r\n  .input {\r\n    overflow: hidden;\r\n    line-height: 1em;\r\n    background-color: white;\r\n    text-align: left;\r\n    padding: 0.875em .85em;\r\n    height: inherit;\r\n    font-size: 1em;\r\n    font-family: inherit;\r\n    font-weight: inherit;\r\n    outline: none;\r\n    border: 1px solid #dfdfdf;\r\n    width: 100%;\r\n    color: #444;\r\n    display: block;\r\n    border-radius: 3px;\r\n    transition: all 0.2s ease-in-out; }\r\n\r\n  :host(:not(.is-active)) div.input::before {\r\n    position: absolute;\r\n    display: inline-block;\r\n    margin-top: 2px;\r\n    content: attr(placeholder);  \r\n    opacity: 0.6; }\r\n\r\n  .input:focus {\r\n    border-color: #298eea; }\r\n\r\n  :host(.is-active) .input {\r\n    padding: 1.3em 0.85em 0.45em 0.85em; }\r\n\r\n  label {\r\n    position: absolute;\r\n    top: 6px;\r\n    padding: 0;\r\n    left: 1.3em;\r\n    font-size: 0.7em;\r\n    font-weight: 500;\r\n    color: #bbbbbb;\r\n    display: block;\r\n    opacity: 0;\r\n    z-index: 10;\r\n    transition: all 0.2s ease-in-out; }\r\n  \r\n  :host(.is-focused) label {\r\n    color: #298eea; }\r\n\r\n  :host(.is-active) label {\r\n    opacity: 1 }\r\n\r\n  :host(.is-optional)::after {\r\n    position: absolute;\r\n    right: 1.3em;\r\n    top: 6px;\r\n    font-size: 0.7em;\r\n    color: #ccc;\r\n    content: 'optional'; }"
    },
    "ux-input": {
        "name": "ux-input",
        "body": require('./ux-input.js').default || require('./ux-input.js'),
        "headers": {
            "needs": "[css]"
        }
    }
}