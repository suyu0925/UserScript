// ==UserScript==
// @name            Block BTNull Ad
// @namespace       https://github.com/suyu0925/UserScript
// @description     Block BTNull Ad.
// @run-at          document-end
// @include         http*://www.btnull.org/*
// @include         http*://btnull.org/*
// @version         0.0.1
// ==/UserScript==

const hideAd = () => {
  // left
  const ad_left = document.getElementById('HMcoupletDivleft')
  ad_left.style.display = 'none'

  // right
  const ad_right = document.getElementById('HMcoupletDivright')
  ad_right.style.display = 'none'
}

const onDocumentChange = () => {
  hideAd()
}

const mutationObserver = new MutationObserver(onDocumentChange)
mutationObserver.observe(window.document, { childList: true, subtree: true })

onDocumentChange()
