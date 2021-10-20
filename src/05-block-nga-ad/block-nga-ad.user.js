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

const mutationObserver = new MutationObserver(hideAd)
mutationObserver.observe(window.document, { childList: true, subtree: true })

/**
 * Skip inserted redirect ad page
 */
const skipRedirect = () => {
  // https://bbs.nga.cn/misc/adpage_insert_2.html?5https://bbs.nga.cn/read.php?tid=29010330
  if (window.location.pathname === '/misc/adpage_insert_2.html') {
    window.location.href = window.location.search.slice(2)
  }
}

skipRedirect()
