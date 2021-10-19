// ==UserScript==
// @name            Image Seeker
// @namespace       https://github.com/suyu0925/UserScript
// @description     Try to find all images on current page
// @include         *://*/*
// @version         0.1.0
// @grant           GM.setClipboard
// ==/UserScript==
let html = ''
const images = document.images
html += `<p>There ${images.length > 1 ? 'are' : 'is'} ${images.length} image${images.length > 1 ? 's' : ''} on current page.</p>`
for (const image of images) {
  html += `<li>${image.src}</li>`
}
html += `<button id="imageseeker_copyToClipboard">copy to clipboard</button>`

// prepend to body
const div = document.createElement('div')
div.innerHTML = html
document.body.prepend(div)

// bind button's onclick
const copyToClipboard = () => {
  GM.setClipboard(Array.prototype.map.call(images, image => image.src).join('\n'))
}
document.getElementById('imageseeker_copyToClipboard').addEventListener(
  'click', copyToClipboard, false
)
