// ==UserScript==
// @name            Hello World
// @namespace       https://github.com/suyu0925/UserScript
// @description     My first user script
// @include         *://*/*
// @version         1.0
// ==/UserScript==

// prepend a paragraph element
const p = document.createElement('p')
document.body.prepend(p)

// set text content
p.textContent = `Hello World from ${GM.info.scriptHandler} ${GM.info.version}`
