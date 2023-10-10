export function initLiveChat() {
  ;(function (d, src, c) {
    const t = d.scripts[d.scripts.length - 1],
      s = d.createElement('script')
    s.id = 'la_x2s6df8d'
    s.async = true
    s.src = src
    s.onload = s.onreadystatechange = function () {
      const rs = this.readyState
      if (rs && rs != 'complete' && rs != 'loaded') {
        return
      }
      c(this)
    }
    t.parentElement.insertBefore(s, t.nextSibling)
  })(document, 'https://nordlys.ladesk.com/scripts/track.js', function (e) {
    /* eslint-disable-next-line no-undef */
    LiveAgent.createButton('3b4hfyxi', e)
  })
}
