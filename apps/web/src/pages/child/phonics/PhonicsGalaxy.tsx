import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { PhonicsAtlasWordDto } from '@taoread/shared'
import { IconMinus, IconPlus, IconRefresh } from '../../../components/ui/icons'
import { PHONICS_TOPICS, phonicsTopic, type PhonicsTopicId } from './phonicsTopics'

export function PhonicsGalaxy({ words, onOpen, onTopic }: { words: PhonicsAtlasWordDto[]; onOpen: (id: string) => void; onTopic: (topic: PhonicsTopicId) => void }) {
  const host = useRef<HTMLDivElement>(null)
  const controls = useRef<{ zoom: (amount: number) => void; reset: () => void } | null>(null)
  const open = useRef(onOpen)
  const [available, setAvailable] = useState(true)
  open.current = onOpen
  useEffect(() => {
    const node = host.current
    if (!node || !words.length) return
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true }) }
    catch { setAvailable(false); return }
    setAvailable(true)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0xffffff, 0)
    renderer.domElement.setAttribute('aria-label', '单词星图')
    renderer.domElement.setAttribute('role', 'img')
    node.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 30)
    camera.position.z = 6.5
    const group = new THREE.Group()
    scene.add(group)
    const positions: number[] = [], colors: number[] = []
    const groups = PHONICS_TOPICS.map(topic => words.filter(word => phonicsTopic(word.id) === topic.id))
    words.forEach(word => {
      const groupIndex = PHONICS_TOPICS.findIndex(topic => topic.id === phonicsTopic(word.id))
      const group = groups[groupIndex]!, index = group.findIndex(item => item.id === word.id)
      const center = groupIndex * Math.PI * 2 / PHONICS_TOPICS.length - Math.PI / 2
      const radius = 0.65 * Math.sqrt((index + 0.5) / group.length)
      const angle = index * Math.PI * (3 - Math.sqrt(5))
      positions.push(Math.cos(center) * 1.65 + Math.cos(angle) * radius, Math.sin(center) * 1.65 + Math.sin(angle) * radius, Math.sin(angle * 0.7) * 0.3)
      const color = new THREE.Color(word.favorite ? '#d46e61' : word.studyState === 'familiar' ? '#ca982e' : word.studyState === 'learning' ? '#287b56' : '#899e96')
      colors.push(color.r, color.g, color.b)
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const star = document.createElement('canvas')
    star.width = 32; star.height = 32
    const context = star.getContext('2d')
    if (context) {
      context.fillStyle = '#fff'; context.beginPath()
      for (let i = 0; i < 10; i++) {
        const angle = -Math.PI / 2 + i * Math.PI / 5, radius = i % 2 ? 6 : 15
        const x = 16 + Math.cos(angle) * radius, y = 16 + Math.sin(angle) * radius
        if (i === 0) context.moveTo(x, y); else context.lineTo(x, y)
      }
      context.closePath(); context.fill()
    }
    const texture = new THREE.CanvasTexture(star)
    const material = new THREE.PointsMaterial({ size: 14, sizeAttenuation: false, vertexColors: true, transparent: true, map: texture, alphaTest: 0.15 })
    const points = new THREE.Points(geometry, material)
    group.add(points)
    const resize = () => {
      const width = node.clientWidth, height = node.clientHeight
      if (!width || !height) return
      camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false)
    }
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    observer?.observe(node); window.addEventListener('resize', resize); resize()
    const zoom = (amount: number) => { camera.position.z = THREE.MathUtils.clamp(camera.position.z + amount, 4, 12) }
    const reset = () => { camera.position.z = 6.5; group.rotation.set(0, 0, 0) }
    controls.current = { zoom, reset }
    const raycaster = new THREE.Raycaster()
    raycaster.params.Points.threshold = 0.16
    let down: { x: number; y: number; moved: number } | null = null
    const pointerDown = (event: PointerEvent) => { down = { x: event.clientX, y: event.clientY, moved: 0 }; renderer.domElement.setPointerCapture(event.pointerId) }
    const pointerMove = (event: PointerEvent) => {
      if (!down) return
      const dx = event.clientX - down.x, dy = event.clientY - down.y
      down.moved += Math.abs(dx) + Math.abs(dy); down.x = event.clientX; down.y = event.clientY
      group.rotation.y += dx * 0.008; group.rotation.x += dy * 0.008
    }
    const pointerUp = (event: PointerEvent) => {
      if (down && down.moved < 6) {
        const rect = renderer.domElement.getBoundingClientRect()
        raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera)
        const index = raycaster.intersectObject(points)[0]?.index
        if (index !== undefined && words[index]) open.current(words[index]!.id)
      }
      down = null
    }
    const wheel = (event: WheelEvent) => { event.preventDefault(); zoom(event.deltaY * 0.003) }
    const pointerCancel = () => { down = null }
    renderer.domElement.addEventListener('pointerdown', pointerDown)
    renderer.domElement.addEventListener('pointermove', pointerMove)
    renderer.domElement.addEventListener('pointerup', pointerUp)
    renderer.domElement.addEventListener('pointercancel', pointerCancel)
    renderer.domElement.addEventListener('wheel', wheel, { passive: false })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const render = () => { if (!reduced.matches && !down) group.rotation.y += 0.001; renderer.render(scene, camera); frame = requestAnimationFrame(render) }
    render()
    return () => {
      cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('resize', resize)
      renderer.domElement.removeEventListener('pointerdown', pointerDown); renderer.domElement.removeEventListener('pointermove', pointerMove)
      renderer.domElement.removeEventListener('pointerup', pointerUp); renderer.domElement.removeEventListener('pointercancel', pointerCancel); renderer.domElement.removeEventListener('wheel', wheel)
      controls.current = null; geometry.dispose(); material.dispose(); texture.dispose(); renderer.dispose(); renderer.domElement.remove()
    }
  }, [words])
  return <div className="ph-galaxy-area">
    {words.length > 0 && <div className="ph-galaxy" ref={host} />}
    {!available && <p role="status">当前设备无法显示星图，可以从下方打开词卡。</p>}
    {available && words.length > 0 && <div className="ph-galaxy-controls">
      <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="放大" aria-label="放大星图" onClick={() => controls.current?.zoom(-0.8)}><IconPlus size={20} /></button>
      <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="缩小" aria-label="缩小星图" onClick={() => controls.current?.zoom(0.8)}><IconMinus size={20} /></button>
      <button className="ph-icon-button min-h-[44px] min-w-[44px]" title="复位" aria-label="复位星图" onClick={() => controls.current?.reset()}><IconRefresh size={20} /></button>
    </div>}
    <div className="ph-filters" aria-label="主题进度">{PHONICS_TOPICS.map(topic => {
      const group = words.filter(word => phonicsTopic(word.id) === topic.id)
      const learned = group.filter(word => word.studyState && word.studyState !== 'unseen').length
      return group.length ? <button key={topic.id} className="ph-chip min-h-[44px]" onClick={() => onTopic(topic.id)}>{topic.label} {learned} / {group.length}</button> : null
    })}</div>
    <div className="ph-galaxy-index" aria-label="星图单词列表">{words.map(word => <button key={word.id} className="ph-chip min-h-[44px]" onClick={() => onOpen(word.id)}>{word.text}</button>)}</div>
  </div>
}
