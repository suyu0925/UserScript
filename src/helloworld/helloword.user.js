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
const version = GM.info.version
p.textContent = `hello world from greasemonkey ${version}`
