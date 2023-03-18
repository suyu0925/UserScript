// ==UserScript==
// @name            Block BTNull Ad
// @namespace       https://github.com/suyu0925/UserScript
// @description     Block BTNull Ad.
// @run-at          document-end
// @match           http*://www.btnull.org/*
// @match           http*://btnull.org/*
// @match           http*://www.pkmp4.com/*
// @match           http*://pkmp4.com/*
// @version         0.0.2
// ==/UserScript==

const hideAd = () => {
  // left
  const ad_left = document.getElementById('HMcoupletDivleft')
  ad_left.style.display = 'none'

  // right
  const ad_right = document.getElementById('HMcoupletDivright')
  ad_right.style.display = 'none'

  // rich box
  const ad_rich_box = document.getElementById('HMRichBox')
  ad_rich_box.style.display = 'none'
}

const onDocumentChange = () => {
  hideAd()
}

const mutationObserver = new MutationObserver(onDocumentChange)
mutationObserver.observe(window.document, { childList: true, subtree: true })

onDocumentChange()
