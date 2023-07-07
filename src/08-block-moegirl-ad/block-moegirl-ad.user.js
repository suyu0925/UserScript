// ==UserScript==
// @name            Block moegirl Ad
// @namespace       https://github.com/suyu0925/UserScript
// @description     Block moegirl Ad.
// @run-at          document-end
// @match           http*://zh.moegirl.org.cn/*
// @version         0.0.1
// ==/UserScript==

const isContainerAdLoaded = () => {
  const $container = document.getElementById('moe-main-container')
  if ($container && $container.children[0]) {
    return $container.children[0].className.includes('moe-card')
  }
}

const hideAd = () => {
  if (isContainerAdLoaded()) {
    const $container = document.getElementById('moe-main-container')
    if ($container) {
      // 1st and 2nd child of container are ads.
      $container.children[0]?.remove()
      $container.children[0]?.remove()
    }
  }

  // Remove popup ads
  const $divs = document.querySelectorAll('body>div')
  for (const $div of $divs) {
    if ($div.children[0]?.textContent === 'all AD') {
      console.log('hello')
      $div.remove()
    }
  }

  // remove footer ad
  const $ins = document.querySelector('ins')
  $ins?.parentElement?.remove()

  // remove oversea ad
  const $moeCards = document.querySelectorAll('.moe-card')
  for (const $moeCard of $moeCards) {
    if ($moeCard.children[0]?.textContent === 'oversea AD') {
      $moeCard.remove()
    }
  }
}

const onDocumentChange = () => {
  hideAd()
}

const mutationObserver = new MutationObserver(onDocumentChange)
mutationObserver.observe(window.document, { childList: true, subtree: true })

onDocumentChange()
