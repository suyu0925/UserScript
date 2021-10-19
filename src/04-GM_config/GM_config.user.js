// ==UserScript==
// @name            GM_config
// @namespace       https://github.com/suyu0925/UserScript
// @description     Test GM_config.
// @include         *://*/*
// @version         0.0.1
// @grant           GM_registerMenuCommand
// @require         https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

// prepend a paragraph element
const p = document.createElement('p')
document.body.prepend(p)

const refresh = () => {
  p.textContent = `Greetings from ${GM_config.get('Name')}`
}

GM_config.init(
  {
    'id': 'MyConfig', // The id used for this instance of GM_config
    'fields': // Fields object
    {
      'Name': // This is the id of the field
      {
        'label': 'Name', // Appears next to field
        'type': 'text', // Makes this setting a text field
        'default': 'Sizzle McTwizzle' // Default value if user doesn't change it
      }
    },
    events: {
      init: () => refresh(),
      open: () => {},
      save: () => refresh(),
      close: () => {},
      reset: () => {}
    }
  })

const openConfig = () => {
  GM_config.open()
}
GM_registerMenuCommand('my config', openConfig, 'c')
