// ==UserScript==
// @name            Block NGA Ad
// @namespace       https://github.com/suyu0925/UserScript
// @description     Block NGA Ad.
// @run-at          document-end
// @include         ^http*://bbs.nga.cn/*
// @version         0.0.1
// ==/UserScript==

const hideAd = () => {
  const ad_marks = document.querySelectorAll('img[src="https://img4.nga.178.com/ngabbs/nga_classic/admark.png"]')
  for (const ad_mark of ad_marks) {
    const ad_a = ad_mark.closest('a')
    const ad_div = ad_a.parentElement
    ad_div.style.display = 'none'
  }
}

hideAd()

// call it again after 3s
setTimeout(hideAd, 1 * 1000)
