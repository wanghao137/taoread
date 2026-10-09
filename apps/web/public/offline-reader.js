// Independent offline reader: textContent only, no credentials and no private API cache.
const booksElement = document.getElementById('books')
const readerElement = document.getElementById('reader')
const request = indexedDB.open('taoread-public-offline-v1', 1)
request.onupgradeneeded = () => request.result.createObjectStore('books', { keyPath: 'id' })
request.onerror = () => { booksElement.textContent = '本机存储不可用。请联网后检查浏览器设置。' }
function element(tag, text) {
  const node = document.createElement(tag)
  node.textContent = text
  return node
}
let closeReader = () => {}
function openReader(book, db, onRemoved) {
  closeReader()
  let chapterIndex = Math.max(0, Math.min(book.chapters.length - 1, book.position?.chapter ?? 0))
  let page = Math.max(0, book.position?.page ?? 0)
  let count = 1
  let step = 1
  let drag = null
  const heading = element('header', '')
  const back = element('button', '返回离线书架')
  const title = element('h1', book.title)
  const remove = element('button', '从本机删除')
  remove.onclick = () => {
    const transaction = db.transaction('books', 'readwrite')
    transaction.objectStore('books').delete(book.id)
    transaction.oncomplete = () => { closeReader(); onRemoved() }
    transaction.onerror = () => { status.textContent = '删除失败，请重试。' }
  }
  heading.append(back, title, remove)
  const select = element('select', '')
  select.setAttribute('aria-label', '选择章节')
  book.chapters.forEach((chapter, index) => {
    const option = element('option', `${index + 1}. ${chapter.title}`)
    option.value = String(index)
    select.append(option)
  })
  const viewport = element('div', '')
  viewport.className = 'offline-viewport'
  const track = element('div', '')
  track.className = 'offline-track'
  viewport.append(track)
  const controls = element('nav', '')
  controls.setAttribute('aria-label', '阅读翻页')
  const previous = element('button', '上一页')
  const status = element('span', '')
  status.setAttribute('role', 'status')
  const next = element('button', '下一页')
  controls.append(previous, status, next)
  const source = element('details', '')
  source.append(element('summary', '查看来源与版本'), element('p', `${book.author} · ${book.source} · ${book.contentVersion}`))
  readerElement.replaceChildren(heading, select, viewport, controls, source)
  readerElement.className = 'offline-reading'
  // Isolate the reading surface without losing the shelf's normal focus order on exit.
  const siblings = Array.from(readerElement.parentElement.children).filter((node) => node !== readerElement)
  const hidden = siblings.map((node) => ({ node, inert: node.inert, hidden: node.hidden }))
  hidden.forEach(({ node }) => { node.inert = true; node.hidden = true })
  const overflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  function update(save = true) {
    page = Math.max(0, Math.min(count - 1, page))
    track.style.transform = `translateX(${-page * step}px)`
    status.textContent = `第 ${chapterIndex + 1} 章 · ${page + 1} / ${count} 页`
    previous.disabled = chapterIndex === 0 && page === 0
    next.disabled = chapterIndex === book.chapters.length - 1 && page === count - 1
    if (save) {
      book.position = { chapter: chapterIndex, page }
      const transaction = db.transaction('books', 'readwrite')
      transaction.objectStore('books').put(book)
      transaction.onerror = () => { status.textContent += ' · 本机位置没存上' }
    }
  }
  function measure() {
    if (!track.clientWidth || !track.clientHeight) return
    const width = track.getBoundingClientRect().width
    track.style.columnWidth = `${width}px`
    step = width + 32
    count = Math.max(1, Math.round((track.scrollWidth + 32) / step))
    viewport.scrollLeft = 0
    update(false)
  }
  function renderChapter() {
    select.value = String(chapterIndex)
    const chapter = book.chapters[chapterIndex]
    track.replaceChildren(element('h2', chapter.title), ...chapter.paragraphs.map((text) => element('p', text)))
    measure()
  }
  function turn(direction) {
    if (book.expiresAt <= Date.now()) { back.click(); return }
    if (page + direction < 0 && chapterIndex > 0) { chapterIndex--; page = 0; renderChapter(); page = count - 1 }
    else if (page + direction >= count && chapterIndex < book.chapters.length - 1) { chapterIndex++; page = 0; renderChapter() }
    else page += direction
    update()
  }
  previous.onclick = () => turn(-1)
  next.onclick = () => turn(1)
  select.onchange = () => { chapterIndex = Number(select.value); page = 0; renderChapter(); update() }
  viewport.onpointerdown = (event) => {
    if (!event.isPrimary || event.button !== 0 || drag) return
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
    viewport.setPointerCapture(event.pointerId)
  }
  viewport.onpointerup = (event) => {
    if (!drag || drag.id !== event.pointerId) return
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y
    drag = null
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId)
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1)
  }
  viewport.onpointercancel = () => { drag = null }
  const observer = new self.ResizeObserver(measure)
  observer.observe(track)
  const onKey = (event) => {
    if (event.target === select || event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      turn(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }
  document.addEventListener('keydown', onKey)
  closeReader = () => {
    observer.disconnect()
    document.removeEventListener('keydown', onKey)
    document.body.style.overflow = overflow
    hidden.forEach(({ node, inert, hidden: wasHidden }) => { node.inert = inert; node.hidden = wasHidden })
    readerElement.className = ''
    readerElement.replaceChildren()
  }
  back.onclick = () => { closeReader(); closeReader = () => {}; booksElement.querySelector('button')?.focus() }
  renderChapter()
  back.focus()
}
request.onsuccess = () => {
  const db = request.result
  function load() {
    const read = db.transaction('books').objectStore('books').getAll()
    read.onsuccess = () => {
      booksElement.replaceChildren()
      const books = read.result.filter((b) => b.expiresAt > Date.now())
      if (!books.length) booksElement.textContent = '没有可用的离线书。请联网，在公共书详情页保存文字。'
      for (const old of read.result.filter((b) => b.expiresAt <= Date.now())) db.transaction('books', 'readwrite').objectStore('books').delete(old.id)
      for (const book of books) {
        const card = element('section', '')
        card.append(element('h2', book.title))
        const open = element('button', '阅读')
        open.style.minHeight = '44px'
        open.onclick = () => {
          if (book.expiresAt <= Date.now()) { load(); return }
          openReader(book, db, load)
        }
        const remove = element('button', '从本机删除')
        remove.style.minHeight = '44px'
        remove.onclick = () => {
          const tx = db.transaction('books', 'readwrite')
          tx.objectStore('books').delete(book.id)
          tx.oncomplete = () => { closeReader(); load() }
          tx.onerror = () => { booksElement.textContent = '删除失败，请重试。' }
        }
        card.append(open, remove)
        booksElement.append(card)
      }
    }
    read.onerror = () => { booksElement.textContent = '离线书读取失败，请联网后重新保存。' }
  }
  load()
}
