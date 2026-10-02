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
          readerElement.replaceChildren(element('h2', book.title), element('p', book.author), element('p', book.source), element('p', `保存版本：${book.contentVersion}`))
          for (const chapter of book.chapters) {
            readerElement.append(element('h3', chapter.title))
            for (const text of chapter.paragraphs) {
              const p = element('p', text)
              Object.assign(p.style, { fontSize: '20px', lineHeight: '1.9', whiteSpace: 'pre-line' })
              readerElement.append(p)
            }
          }
          readerElement.scrollIntoView()
        }
        const remove = element('button', '从本机删除')
        remove.style.minHeight = '44px'
        remove.onclick = () => {
          const tx = db.transaction('books', 'readwrite')
          tx.objectStore('books').delete(book.id)
          tx.oncomplete = () => { readerElement.replaceChildren(); load() }
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
