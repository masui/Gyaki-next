// 「楽ギャキ」描画ロジック
// CoffeeScript (draw.coffee) からの移植

export function initDraw(gyazoUserID, gyazoImageID) {
  const app = {}
  const container = document.getElementById('draw-container')

  // --- DOM要素の生成 ---
  const canvas = document.createElement('canvas')
  container.appendChild(canvas)

  const uploadButton = document.createElement('input')
  uploadButton.type = 'button'
  uploadButton.value = 'UP'
  Object.assign(uploadButton.style, { position: 'absolute', visibility: 'hidden' })
  container.appendChild(uploadButton)

  const lineButtons = []
  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img')
    img.src = `/images/line${i + 1}.png`
    Object.assign(img.style, { position: 'absolute', visibility: 'hidden' })
    lineButtons.push(img)
    container.appendChild(img)
  }

  const colorButtons = []
  for (let i = 0; i < 3; i++) {
    const img = document.createElement('img')
    img.src = `/images/color${i + 1}.png`
    Object.assign(img.style, { position: 'absolute', visibility: 'hidden' })
    colorButtons.push(img)
    container.appendChild(img)
  }

  // --- 状態の初期化 ---
  app.crd = { cur: [0, 0], pre: [0, 0] }
  app.drawing = false
  app.lineWidth = 15
  app.strokeStyle = 'rgb(0, 0, 0)'
  app.context = canvas.getContext('2d')

  // --- 選択状態の表示 ---
  const lineWidths = [3, 15, 30]
  const colors = ['rgb(255, 255, 255)', 'rgb(128, 128, 128)', 'rgb(0, 0, 0)']

  function updateSelection() {
    for (let i = 0; i < 3; i++) {
      lineButtons[i].style.backgroundColor = lineWidths[i] === app.lineWidth ? 'rgba(0, 0, 0, 0.15)' : 'transparent'
      lineButtons[i].style.borderRadius = '6px'
      lineButtons[i].style.border = 'none'
    }
    for (let i = 0; i < 3; i++) {
      colorButtons[i].style.backgroundColor = colors[i] === app.strokeStyle ? 'rgba(0, 0, 0, 0.15)' : 'transparent'
      colorButtons[i].style.borderRadius = '6px'
      colorButtons[i].style.border = 'none'
    }
  }

  // --- ボタンのクリックハンドラ ---
  for (let i = 0; i < 3; i++) {
    lineButtons[i].addEventListener('click', () => {
      app.lineWidth = lineWidths[i]
      updateSelection()
    })
    colorButtons[i].addEventListener('click', () => {
      app.strokeStyle = colors[i]
      updateSelection()
    })
  }
  updateSelection()

  // --- レイアウト ---
  function resize() {
    const w = window.innerWidth || document.body.clientWidth || 0
    const h = window.innerHeight || document.body.clientHeight || 0
    const canvasSize = Math.min(w, h)

    canvas.width = canvasSize
    canvas.height = canvasSize
    app.context.fillStyle = '#fff'
    app.context.fillRect(0, 0, canvasSize, canvasSize)

    if (gyazoImageID) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = `/api/gyazodata/${gyazoImageID}`
      img.onload = () => app.context.drawImage(img, 0, 0)
    }

    const orientation = w > h ? 'landscape' : 'portrait'

    if (orientation === 'portrait') {
      const buttonWidth = w / 10
      const gap = (w - buttonWidth * 7) / 11

      setStyle(uploadButton, { top: canvasSize + gap, left: gap, width: buttonWidth, height: buttonWidth })

      for (let i = 0; i < 3; i++) {
        setStyle(lineButtons[i], {
          top: canvasSize + gap,
          left: gap * 3 + buttonWidth + (buttonWidth + gap) * i,
          width: buttonWidth, height: buttonWidth,
        })
        setStyle(colorButtons[i], {
          top: canvasSize + gap,
          left: gap * 7 + buttonWidth * 4 + (buttonWidth + gap) * i,
          width: buttonWidth, height: buttonWidth,
        })
      }
    } else {
      const buttonHeight = h / 10
      const gap = (h - buttonHeight * 7) / 11

      setStyle(uploadButton, { top: gap, left: canvasSize + gap, width: buttonHeight, height: buttonHeight })

      for (let i = 0; i < 3; i++) {
        setStyle(lineButtons[i], {
          top: gap * 3 + buttonHeight + (buttonHeight + gap) * i,
          left: canvasSize + gap,
          width: buttonHeight, height: buttonHeight,
        })
        setStyle(colorButtons[i], {
          top: gap * 7 + buttonHeight * 4 + (buttonHeight + gap) * i,
          left: canvasSize + gap,
          width: buttonHeight, height: buttonHeight,
        })
      }
    }

    // canvasのオフセットを更新
    const rect = canvas.getBoundingClientRect()
    app.canvasX = rect.left + window.scrollX
    app.canvasY = rect.top + window.scrollY
  }

  function setStyle(el, props) {
    for (const [k, v] of Object.entries(props)) {
      el.style[k] = typeof v === 'number' ? v + 'px' : v
    }
    el.style.visibility = 'visible'
  }

  // --- 描画イベント ---
  function getXY(e) {
    if (e.type === 'touchmove' || e.type === 'touchstart') {
      const t = e.changedTouches[0]
      return [t.pageX, t.pageY]
    }
    return [e.pageX, e.pageY]
  }

  function onMove(e) {
    e.preventDefault()
    let [x, y] = getXY(e)
    x -= app.canvasX
    y -= app.canvasY

    if (app.drawing) {
      app.crd.cur = [x, y]
      app.context.beginPath()
      app.context.lineJoin = 'round'
      app.context.lineCap = 'round'
      app.context.strokeStyle = app.strokeStyle
      app.context.lineWidth = app.lineWidth
      app.context.moveTo(app.crd.pre[0], app.crd.pre[1])
      app.context.lineTo(app.crd.cur[0], app.crd.cur[1])
      app.context.stroke()
      app.context.closePath()
      app.crd.pre = app.crd.cur
    }
  }

  function onStart(e) {
    e.preventDefault()
    let [x, y] = getXY(e)
    app.crd.pre = [x - app.canvasX, y - app.canvasY]
    app.drawing = true
  }

  function onEnd(e) {
    e.preventDefault()
    app.drawing = false
  }

  canvas.addEventListener('touchmove', onMove, { passive: false })
  canvas.addEventListener('mousemove', onMove)
  canvas.addEventListener('touchstart', onStart, { passive: false })
  canvas.addEventListener('mousedown', onStart)
  canvas.addEventListener('touchend', onEnd)
  canvas.addEventListener('mouseup', onEnd)

  // --- アップロード ---
  uploadButton.addEventListener('click', async () => {
    const imagedata = canvas.toDataURL()
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: imagedata, id: gyazoUserID }),
    })
    const url = await res.text()
    location.href = url
  })

  resize()

  // クリーンアップ
  return () => {
    container.innerHTML = ''
  }
}
