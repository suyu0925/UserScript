// ==UserScript==
// @name            Menu Command
// @namespace       https://github.com/suyu0925/UserScript
// @description     Add items to the User Script Commands menu. 
// @include         *://*/*
// @version         0.1.0
// @grant           GM_registerMenuCommand
// ==/UserScript==

const hello = () => { alert('Hello, world!') }
GM_registerMenuCommand('Hello, world!', hello, 'h')
