// ==UserScript==
// @name            Block NGA Ad
// @namespace       https://github.com/suyu0925/UserScript
// @author          suyu
// @version         0.0.4
// @description     Block NGA Ad.
// @license         MIT

// @match           http*://bbs.nga.cn/*
// @match           http*://bbs.ngacn.cc/*
// @match           http*://nga.178.com/*

// @run-at          document-end
// @noframes
// ==/UserScript==

const hideAd = () => {
  const ad_marks = document.querySelectorAll('img[src="https://img4.nga.178.com/ngabbs/nga_classic/admark.png"]')
  for (const ad_mark of ad_marks) {
    const ad_a = ad_mark.closest('a')
    const ad_div = ad_a.parentElement
    ad_div.style.display = 'none'
  }
}

/**
 * Skip inserted redirect ad page
 */
const skipRedirect = () => {
  // https://bbs.nga.cn/misc/adpage_insert_2.html?5https://bbs.nga.cn/thread.php?fid=-7
  // https://bbs.nga.cn/misc/adpage_insert_2.html?5https://bbs.nga.cn/read.php?tid=29010330
  if (window.location.pathname === '/misc/adpage_insert_2.html') {
    window.location.href = window.location.search.slice(2)
  }
}


const onDocumentChange = () => {
	skipRedirect()
  hideAd()
}

const mutationObserver = new MutationObserver(onDocumentChange)
mutationObserver.observe(window.document, { childList: true, subtree: true })

onDocumentChange()
