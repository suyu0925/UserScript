// ==UserScript==
// @name            Block NGA Ad
// @namespace       https://github.com/suyu0925/UserScript
// @description     Block NGA Ad.
// @include         ^http*://bbs.nga.cn/*
// @version         0.0.1
// ==/UserScript==

const ad_marks = document.querySelectorAll('img[src="https://img4.nga.178.com/ngabbs/nga_classic/admark.png"]')
for (const ad_mark of ad_marks) {
  const ad_div = ad_mark.closest('div')
  ad_div.style.display = 'none'
}
