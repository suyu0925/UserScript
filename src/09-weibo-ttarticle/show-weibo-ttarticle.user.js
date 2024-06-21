// ==UserScript==
// @name            Show weibo ttarticle
// @namespace       https://github.com/suyu0925/UserScript
// @description     Show weibo ttarticle.
// @run-at          document-end
// @match           http*://weibo.com/ttarticle/p/show*
// @version         0.0.1
// ==/UserScript==

const showWeiboTtarticle = () => {
  const $article = document.getElementsByClassName('WB_editor_iframe_new')[0]
  if ($article) {
    $article.style.height = 'auto'
  }
}

const onDocumentChange = () => {
  showWeiboTtarticle()
}

const mutationObserver = new MutationObserver(onDocumentChange)
mutationObserver.observe(window.document, { childList: true, subtree: true })

onDocumentChange()
