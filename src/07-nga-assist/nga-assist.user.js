// ==UserScript==
// @name        NGA Assist
// @namespace   https://github.com/suyu0925/UserScript
// @author      suyu
// @version     0.0.2
// @description 修复PC上特殊时期无法正常浏览帖子的问题，以及自动每日签到刮墙。
// @license     MIT

// @match       *://bbs.nga.cn/*
// @match       *://ngabbs.com/*
// @match       *://nga.178.com/*

// @require     https://unpkg.com/ajax-hook@2.1.3/dist/ajaxhook.core.min.js

// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       unsafeWindow
// @noframes
// ==/UserScript==

const { commonui: ui, __CURRENT_UID: uid } = unsafeWindow

// 原理：只要使用Nga_Official这个ua就可以正常拉取到帖子，其余所有的一切包括hookAjax, hookDoRequest, reloadLib等等都是为了能够在插件里实现改变ua。
const UserAgent = 'Nga_Official'

const redirectUri = new URLSearchParams(location.search).get('redirectUri')
const AUTO_CHECK_IN_LAST_TIME_KEY = 'AUTO_CHECK_IN_LAST_TIME_KEY'

const isSameOrigin = (url) => {
  return url.indexOf('/') === 0 || url.indexOf(location.host) >= 0
}

/**
 * hook ajax请求，设置X-User-Agent
 */
const hookAjax = () => {
  ah.hook(
    {
      open: (args, xhr) => {
        xhr._url = args[1]

        return false
      },
      send: (_, xhr) => {
        const url = xhr._url || ''

        if (isSameOrigin(url)) {
          xhr.setRequestHeader('X-User-Agent', UserAgent)
        }

        return false
      },
    },
    ui._w
  )
}

/**
 * hook doRequest，强制使用ajax拉取帖子内容
 */
const hookDoRequest = () => {
  const f = __NUKE.doRequest

  __NUKE.doRequest = (args) => {
    const u = args.u.u || args.u
    const a = args.u.a

    if (isSameOrigin(u) && !a) {
      return f({
        ...args,
        xr: 1,
        u: {
          u,
          a,
        },
      })
    }

    return f(args)
  }
}

const clearBodyEvent = () => {
  const temp = document.createElement('DIV')

  temp.append(...document.body.childNodes)

  document.body.outerHTML = document.body.outerHTML
  document.body.innerHTML = ''
  document.body.append(...temp.childNodes)
}

/**
 * 配合重定向
 */
const reloadLib = () => {
  const c = ui.topicArg

  __SCRIPTS.syncLoad('forum', 'loaderRead', () => {
    if (_LOADERREAD) {
      _LOADERREAD.init()

      // Reload page
      if (redirectUri) {
        ui.htmlLoader.go(33, {
          url: encodeURI(decodeURIComponent(redirectUri)),
        })
      }

      ui.topicArg = c
    }
  })
}

/**
 * 自动签到
 */
const autoCheckIn = () => {
  const autoCheckInLastTime = GM_getValue(AUTO_CHECK_IN_LAST_TIME_KEY) || 0
  if (uid) {
    const today = new Date()
    const lastTime = new Date(autoCheckInLastTime)
    const isToday =
      lastTime.getDate() === today.getDate() &&
      lastTime.getMonth() === today.getMonth() &&
      lastTime.getFullYear() === today.getFullYear()
    if (!isToday) {
      fetch(`/nuke.php?__lib=check_in&__act=check_in&lite=js`, {
        method: 'POST',
        headers: {
          'X-User-Agent': UserAgent,
        },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader()

          reader.onload = () => {
            const text = reader.result;
            const result = JSON.parse(
              text.replace('window.script_muti_get_var_store=', '')
            );

            const { data, error } = result

            if (data || error) {
              alert((data || error)[0])
            }

            GM_setValue(AUTO_CHECK_IN_LAST_TIME_KEY, today.getTime())
          }

          reader.readAsText(blob, 'GBK')
        })
    }
  }
}

// 恢复彩色
const antiGray = () => {
  document.documentElement.classList.add('no-gray')
  GM_addStyle(`
    html.no-gray {
      filter: unset
    }
  `)
}

if (location.pathname === '/') {
  hookAjax()
  hookDoRequest()
}

// 重定向，让hook生效
if (location.pathname !== '/' && redirectUri === null) {
  location.href = `/?redirectUri=${encodeURIComponent(location.href)}`
  return
}

clearBodyEvent()
reloadLib()
autoCheckIn()
antiGray()
