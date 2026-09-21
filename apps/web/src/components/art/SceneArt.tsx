/**
 * 场景插画库（v2）：全部为平台自绘 SVG 矢量图，零外部素材、零版权风险。
 * 每个场景由「渐变天空 + 远景 + 中景 + 前景点缀」四层构成，风格统一：
 *  - 圆角块面、无描边、柔和高饱和儿童配色
 *  - 太阳/月亮/星星/云朵为通用元件，可复用
 * 内容包里 coverArt / chapter.art / block.art 的键名对应这里的场景。
 */

import { motion } from 'framer-motion'
import { MOTION, useReducedMotion } from '../../lib/motion'

/* ── 通用元件 ── */

function Stars({ count = 14, seed = 1 }: { count?: number; seed?: number }) {
  // 确定性伪随机：同 seed 同布局，避免重渲染闪烁
  const pts = Array.from({ length: count }, (_, i) => {
    const x = ((i * 37 + seed * 91) % 100) + 1
    const y = ((i * 53 + seed * 17) % 46) + 4
    const r = (i % 3) * 0.5 + 1
    const o = ((i % 4) + 3) / 7
    return { x, y, r, o, key: i }
  })
  return (
    <>
      {pts.map((p) => (
        <circle key={p.key} cx={p.x} cy={p.y} r={p.r} fill="#FFF3C4" opacity={p.o} />
      ))}
    </>
  )
}

function Cloud({ x, y, s = 1, color = '#FFFFFF' }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.92}>
      <ellipse cx="0" cy="0" rx="26" ry="10" fill={color} />
      <ellipse cx="16" cy="-6" rx="16" ry="9" fill={color} />
      <ellipse cx="-14" cy="-4" rx="13" ry="8" fill={color} />
    </g>
  )
}

function Moon({ x = 78, y = 18, r = 11 }: { x?: number; y?: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#FFE9B8" />
      <circle cx={x - r * 0.35} cy={y - r * 0.25} r={r * 0.92} fill="#FFF6DC" opacity={0.55} />
    </g>
  )
}

function Sun({ x = 80, y = 20, r = 12 }: { x?: number; y?: number; r?: number }) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2
    return (
      <line
        key={i}
        x1={x + Math.cos(a) * (r + 4)}
        y1={y + Math.sin(a) * (r + 4)}
        x2={x + Math.cos(a) * (r + 9)}
        y2={y + Math.sin(a) * (r + 9)}
        stroke="#FFC542"
        strokeWidth={3}
        strokeLinecap="round"
      />
    )
  })
  return (
    <g>
      {rays}
      <circle cx={x} cy={y} r={r} fill="#FFD97A" />
    </g>
  )
}

function Ground({ color, y = 74, h = 30 }: { color: string; y?: number; h?: number }) {
  return <rect x="0" y={y} width="100" height={h} fill={color} rx={6} />
}

function Hills({ colors }: { colors: [string, string] }) {
  return (
    <>
      <path d="M0 74 Q 25 54 50 70 Q 75 52 100 72 L100 78 L0 78 Z" fill={colors[0]} />
      <path d="M0 78 Q 30 62 55 75 Q 80 60 100 76 L100 82 L0 82 Z" fill={colors[1]} />
    </>
  )
}

function svg(children: React.ReactNode, from: string, to: string, label: string, className?: string) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      data-art={label}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#g-${label})`} />
      {children}
    </svg>
  )
}

/* ── 场景实现 ── */

const SCENES: Record<string, () => React.ReactNode> = {
  // 蒙学：展开的竹简 + 晨光
  'primer-scroll': () => (
    <>
      <Sun x={80} y={20} />
      <Cloud x={22} y={16} s={0.8} />
      <Ground color="#E8E0C8" y={70} />
      <g transform="translate(50 58)">
        <rect x="-34" y="-8" width="68" height="16" rx="8" fill="#C9A96A" />
        <rect x="-30" y="-5" width="60" height="10" rx="5" fill="#F5E6C4" />
        <rect x="-26" y="-3" width="52" height="6" rx="3" fill="#D8C49A" opacity={0.7} />
      </g>
      <g transform="translate(50 74)">
        <rect x="-38" y="-4" width="76" height="8" rx="4" fill="#B8935A" />
      </g>
    </>
  ),
  'sunrise-hills': () => (
    <>
      <Sun x={50} y={26} r={14} />
      <Cloud x={18} y={14} s={0.7} />
      <Cloud x={82} y={12} s={0.6} />
      <Hills colors={['#A5D6A7', '#7CB342']} />
      <Ground color="#558B2F" y={80} h={20} />
    </>
  ),
  'mother-loom': () => (
    <>
      <Moon x={80} y={18} />
      <Stars count={10} seed={3} />
      <Ground color="#8D6E63" y={72} />
      <g transform="translate(50 56)">
        <rect x="-24" y="-2" width="48" height="6" rx="3" fill="#6D4C41" />
        <line x1="-16" y1="-14" x2="-16" y2="-2" stroke="#8D6E63" strokeWidth="3" />
        <line x1="16" y1="-14" x2="16" y2="-2" stroke="#8D6E63" strokeWidth="3" />
        <line x1="-16" y1="-11" x2="16" y2="-11" stroke="#EF9A9A" strokeWidth="2.5" />
        <line x1="-16" y1="-7" x2="16" y2="-7" stroke="#CE93D8" strokeWidth="2.5" />
      </g>
    </>
  ),
  'teacher-fan': () => (
    <>
      <Sun x={24} y={20} />
      <Cloud x={76} y={14} s={0.8} />
      <Hills colors={['#B3E5FC', '#4FC3F7']} />
      <Ground color="#26A69A" y={80} h={20} />
      <g transform="translate(70 62)">
        <path d="M-12 8 Q 0 -14 12 8 Z" fill="#FFF3E0" />
        <path d="M-12 8 Q 0 -2 12 8 Z" fill="#FFE0B2" />
        <line x1="0" y1="8" x2="0" y2="18" stroke="#8D6E63" strokeWidth="2.5" />
      </g>
    </>
  ),
  'jade-stone': () => (
    <>
      <Cloud x={30} y={16} s={0.9} />
      <Cloud x={78} y={12} s={0.6} />
      <Ground color="#BDBDBD" y={74} />
      <g transform="translate(50 60)">
        <path d="M-16 6 Q -18 -10 -4 -14 Q 12 -16 16 -2 Q 18 8 6 12 Q -8 14 -16 6 Z" fill="#80CBC4" />
        <path d="M-8 2 Q -4 -8 4 -6 Q 10 -2 6 4 Q 0 8 -8 2 Z" fill="#B2DFDB" />
      </g>
    </>
  ),
  // 唐诗：月夜窗前
  'poetry-moon': () => (
    <>
      <Moon x={78} y={20} r={13} />
      <Stars count={18} seed={2} />
      <Cloud x={24} y={22} s={0.9} color="#F2E4CE" />
      <rect x="0" y="68" width="100" height="32" fill="#3A2814" opacity={0.55} />
      <g transform="translate(26 54)">
        <rect x="-14" y="-16" width="28" height="24" rx="3" fill="#4A3418" />
        <rect x="-11" y="-13" width="22" height="18" rx="2" fill="#8A5A28" />
      </g>
    </>
  ),
  'moon-window': () => (
    <>
      <Moon x={74} y={22} r={12} />
      <Stars count={14} seed={4} />
      <g transform="translate(50 50)">
        <rect x="-20" y="-26" width="40" height="52" rx="4" fill="#5C4322" />
        <rect x="-16" y="-22" width="32" height="44" rx="2" fill="#A07030" />
        <line x1="0" y1="-22" x2="0" y2="22" stroke="#5C4322" strokeWidth="2" />
        <line x1="-16" y1="0" x2="16" y2="0" stroke="#5C4322" strokeWidth="2" />
      </g>
      <rect x="0" y="76" width="100" height="24" fill="#4A3418" />
    </>
  ),
  'spring-bird': () => (
    <>
      <Sun x={80} y={20} />
      <Cloud x={24} y={16} s={0.9} />
      <Hills colors={['#C8E6C9', '#81C784']} />
      <g transform="translate(28 58)">
        <path d="M-10 4 Q -14 -6 -6 -10 Q 2 -12 6 -6 Q 12 -4 10 4 Z" fill="#FFB74D" />
        <circle cx="4" cy="-8" r="4" fill="#FFCC80" />
        <circle cx="6" cy="-9" r="1.2" fill="#4E342E" />
        <path d="M-10 4 Q -2 8 10 4" stroke="#F57C00" strokeWidth="2" fill="none" />
      </g>
      <g transform="translate(70 70)">
        <path d="M0 0 Q -6 -10 2 -12 Q 10 -10 8 0 Z" fill="#A5D6A7" />
      </g>
    </>
  ),
  'goose-pond': () => (
    <>
      <Cloud x={26} y={16} s={0.9} />
      <Cloud x={78} y={12} s={0.6} />
      <rect x="0" y="58" width="100" height="42" fill="#4DD0E1" rx={8} />
      <path d="M0 62 Q 25 56 50 62 Q 75 56 100 62" stroke="#B2EBF2" strokeWidth="3" fill="none" />
      <path d="M0 72 Q 25 66 50 72 Q 75 66 100 72" stroke="#80DEEA" strokeWidth="2.5" fill="none" />
      <g transform="translate(50 48)">
        <ellipse cx="0" cy="0" rx="16" ry="9" fill="#FFFFFF" />
        <circle cx="14" cy="-6" r="5" fill="#FFFFFF" />
        <circle cx="16" cy="-7" r="1.1" fill="#333" />
        <path d="M19 -6 L25 -4 L19 -2 Z" fill="#FF8A65" />
        <path d="M-6 4 Q -10 10 -4 12 Q 2 10 0 6" fill="#FF8A65" />
      </g>
    </>
  ),
  'tower-view': () => (
    <>
      <Sun x={30} y={18} />
      <Cloud x={74} y={14} s={0.8} />
      <Hills colors={['#FFE0B2', '#FFCC80']} />
      <g transform="translate(52 58)">
        <rect x="-4" y="-30" width="8" height="30" fill="#8D6E63" />
        <path d="M-14 -30 L0 -44 L14 -30 Z" fill="#A1887F" />
        <rect x="-10" y="-26" width="20" height="4" fill="#6D4C41" />
        <rect x="-4" y="-14" width="8" height="14" fill="#8D6E63" />
      </g>
      <path d="M0 74 Q 30 66 60 74 Q 80 78 100 72 L100 82 L0 82 Z" fill="#4FC3F7" />
    </>
  ),
  'rice-field': () => (
    <>
      <Sun x={76} y={20} r={13} />
      <Cloud x={24} y={16} s={0.8} />
      <Ground color="#8BC34A" y={62} h={38} />
      <g stroke="#558B2F" strokeWidth="2.5" strokeLinecap="round">
        {[18, 32, 46, 60, 74, 88].map((x, i) => (
          <line key={i} x1={x} y1={70 + (i % 2) * 6} x2={x} y2={56 + (i % 2) * 6} />
        ))}
      </g>
      <g fill="#FFEE58">
        {[18, 32, 46, 60, 74, 88].map((x, i) => (
          <ellipse key={i} cx={x} cy={54 + (i % 2) * 6} rx="3.4" ry="5" />
        ))}
      </g>
    </>
  ),
  'rice-bowl': () => (
    <>
      <Cloud x={28} y={16} s={0.9} />
      <Cloud x={76} y={12} s={0.6} />
      <Ground color="#A5D6A7" y={78} />
      <g transform="translate(50 58)">
        <path d="M-16 0 Q -16 14 0 14 Q 16 14 16 0 Z" fill="#FFFFFF" />
        <ellipse cx="0" cy="0" rx="16" ry="5" fill="#FFF9C4" />
        <ellipse cx="-4" cy="-1" rx="5" ry="2.4" fill="#FFEE58" />
        <ellipse cx="5" cy="0.6" rx="4" ry="2" fill="#FFEE58" />
      </g>
    </>
  ),
  'waterfall-mountain': () => (
    <>
      <Cloud x={24} y={14} s={0.8} />
      <path d="M0 40 L30 18 L52 38 L78 14 L100 36 L100 100 L0 100 Z" fill="#7CB342" />
      <path d="M62 20 Q 66 44 62 74" stroke="#E1F5FE" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M64 22 Q 68 44 64 72" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="0" y="76" width="100" height="24" fill="#4FC3F7" rx={6} />
      <path d="M0 80 Q 25 76 50 80 Q 75 76 100 80" stroke="#B3E5FC" strokeWidth="2.5" fill="none" />
    </>
  ),
  // 西游记
  'mountain-monkey': () => (
    <>
      <Sun x={76} y={18} r={12} />
      <Cloud x={24} y={14} s={0.9} />
      <Cloud x={60} y={20} s={0.6} />
      <path d="M0 46 L22 22 L44 42 L70 16 L100 44 L100 100 L0 100 Z" fill="#66BB6A" />
      <path d="M0 60 L26 40 L50 58 L76 38 L100 58 L100 100 L0 100 Z" fill="#43A047" />
      <g transform="translate(46 52)">
        <circle cx="0" cy="0" r="9" fill="#FFCC80" />
        <circle cx="-8" cy="2" r="4" fill="#FFCC80" />
        <circle cx="8" cy="2" r="4" fill="#FFCC80" />
        <circle cx="-3.4" cy="-2" r="1.6" fill="#4E342E" />
        <circle cx="3.4" cy="-2" r="1.6" fill="#4E342E" />
        <path d="M-3 3 Q 0 5.5 3 3" stroke="#4E342E" strokeWidth="1.2" fill="none" />
        <path d="M-9 4 Q -14 10 -8 14" stroke="#FFCC80" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),
  'magic-stone': () => (
    <>
      <Sun x={78} y={18} />
      <Cloud x={26} y={14} s={0.9} />
      <Hills colors={['#A5D6A7', '#66BB6A']} />
      <g transform="translate(50 56)">
        <path d="M-18 10 Q -22 -8 -6 -16 Q 14 -20 20 -4 Q 24 10 8 16 Q -10 20 -18 10 Z" fill="#B0BEC5" />
        <path d="M-10 4 Q -6 -10 6 -10 Q 16 -6 12 4 Q 4 10 -10 4 Z" fill="#ECEFF1" />
        <circle cx="4" cy="-2" r="3" fill="#FFF59D" opacity={0.9} />
      </g>
      <g transform="translate(50 30)">
        <path d="M0 0 L4 10 L0 20" stroke="#FFF59D" strokeWidth="2" fill="none" opacity={0.8} />
        <path d="M-8 -2 L-4 8 L-8 16" stroke="#FFF59D" strokeWidth="1.6" fill="none" opacity={0.6} />
      </g>
    </>
  ),
  'waterfall-cave': () => (
    <>
      <path d="M0 30 L100 30 L100 100 L0 100 Z" fill="#558B2F" />
      <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="#7CB342" opacity={0.25} />
      <path d="M28 26 Q 24 58 30 88" stroke="#E1F5FE" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M50 24 Q 46 58 52 90" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M72 26 Q 68 58 74 88" stroke="#E1F5FE" strokeWidth="8" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="70" rx="10" ry="8" fill="#1A237E" opacity={0.5} />
      <Cloud x={20} y={12} s={0.7} />
      <Cloud x={80} y={10} s={0.6} />
    </>
  ),
  'master-fan': () => (
    <>
      <Sun x={24} y={18} />
      <Cloud x={76} y={14} s={0.8} />
      <Hills colors={['#C8E6C9', '#81C784']} />
      <g transform="translate(68 58)">
        <path d="M-14 10 Q 0 -16 14 10 Z" fill="#FFF8E1" />
        <path d="M-14 10 Q 0 -4 14 10 Z" fill="#FFE082" />
        <line x1="0" y1="10" x2="0" y2="22" stroke="#8D6E63" strokeWidth="2.5" />
      </g>
      <g transform="translate(26 66)">
        <circle cx="0" cy="0" r="7" fill="#FFCC80" />
        <circle cx="-2.6" cy="-1.6" r="1.4" fill="#4E342E" />
        <circle cx="2.6" cy="-1.6" r="1.4" fill="#4E342E" />
        <path d="M-2.6 2.4 Q 0 4 2.6 2.4" stroke="#4E342E" strokeWidth="1" fill="none" />
      </g>
    </>
  ),
  'cloud-flight': () => (
    <>
      <Sun x={80} y={18} />
      <Cloud x={20} y={26} s={1.1} />
      <Cloud x={70} y={40} s={0.9} />
      <Cloud x={34} y={58} s={0.8} />
      <Cloud x={84} y={64} s={0.7} />
      <g transform="translate(48 34)">
        <ellipse cx="0" cy="0" rx="14" ry="7" fill="#FFFFFF" />
        <circle cx="12" cy="-5" r="4.6" fill="#FFFFFF" />
        <circle cx="13.6" cy="-6" r="1.1" fill="#4E342E" />
        <path d="M8 -2 L18 -1 L8 1 Z" fill="#FF8A65" />
      </g>
    </>
  ),
  // 刻舟求剑
  'river-boat': () => (
    <>
      <Cloud x={24} y={14} s={0.9} />
      <Cloud x={76} y={10} s={0.6} />
      <Sun x={50} y={16} r={11} />
      <rect x="0" y="60" width="100" height="40" fill="#4DD0E1" rx={8} />
      <path d="M0 66 Q 25 60 50 66 Q 75 60 100 66" stroke="#B2EBF2" strokeWidth="3" fill="none" />
      <path d="M0 78 Q 25 72 50 78 Q 75 72 100 78" stroke="#80DEEA" strokeWidth="2.5" fill="none" />
      <g transform="translate(46 52)">
        <path d="M-22 6 Q -24 -2 -14 -4 L14 -4 Q 24 -2 22 6 Q 12 12 0 12 Q -12 12 -22 6 Z" fill="#8D6E63" />
        <rect x="-3" y="-24" width="3" height="22" fill="#6D4C41" />
        <path d="M0 -22 L12 -10 L0 -10 Z" fill="#FFF3E0" />
        <circle cx="-6" cy="0" r="4.4" fill="#FFCC80" />
        <circle cx="-7.4" cy="-1" r="1" fill="#4E342E" />
      </g>
    </>
  ),
  // 童话
  'alice-rabbit': () => (
    <>
      <Sun x={78} y={18} />
      <Cloud x={24} y={16} s={0.9} />
      <Hills colors={['#CE93D8', '#AB47BC']} />
      <g transform="translate(38 62)">
        <ellipse cx="0" cy="0" rx="11" ry="13" fill="#FFFFFF" />
        <ellipse cx="-6" cy="-16" rx="3.4" ry="8" fill="#FFFFFF" />
        <ellipse cx="6" cy="-16" rx="3.4" ry="8" fill="#FFFFFF" />
        <ellipse cx="-6" cy="-16" rx="1.6" ry="5" fill="#F8BBD0" />
        <ellipse cx="6" cy="-16" rx="1.6" ry="5" fill="#F8BBD0" />
        <circle cx="-4" cy="-2" r="1.6" fill="#4E342E" />
        <circle cx="4" cy="-2" r="1.6" fill="#4E342E" />
        <circle cx="9" cy="2" r="1.4" fill="#F48FB1" />
        <path d="M6 3 L11 3" stroke="#4E342E" strokeWidth="1" />
      </g>
      <g transform="translate(74 74)">
        <circle cx="0" cy="0" r="7" fill="#FFF9C4" />
        <circle cx="0" cy="0" r="3" fill="#F57F17" />
      </g>
    </>
  ),
  'rabbit-hole': () => (
    <>
      <Stars count={16} seed={5} />
      <Moon x={76} y={16} r={9} />
      <ellipse cx="50" cy="44" rx="34" ry="30" fill="#311B92" opacity={0.45} />
      <ellipse cx="50" cy="46" rx="26" ry="24" fill="#4527A0" />
      <ellipse cx="50" cy="48" rx="18" ry="17" fill="#5E35B1" />
      <g transform="translate(50 40)">
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#FFFFFF" />
        <ellipse cx="-4.4" cy="-12" rx="2.6" ry="6" fill="#FFFFFF" />
        <ellipse cx="4.4" cy="-12" rx="2.6" ry="6" fill="#FFFFFF" />
        <circle cx="0" cy="8" r="2.6" fill="#FFF9C4" />
      </g>
    </>
  ),
  'white-rabbit': () => (
    <>
      <Sun x={80} y={18} />
      <Cloud x={22} y={16} s={0.9} />
      <Ground color="#A5D6A7" y={70} h={30} />
      <g transform="translate(46 56)">
        <ellipse cx="0" cy="0" rx="12" ry="14" fill="#FFFFFF" />
        <ellipse cx="-7" cy="-17" rx="3.6" ry="9" fill="#FFFFFF" />
        <ellipse cx="7" cy="-17" rx="3.6" ry="9" fill="#FFFFFF" />
        <ellipse cx="-7" cy="-17" rx="1.7" ry="5.6" fill="#F8BBD0" />
        <ellipse cx="7" cy="-17" rx="1.7" ry="5.6" fill="#F8BBD0" />
        <circle cx="-4.6" cy="-2" r="1.8" fill="#C2185B" />
        <circle cx="4.6" cy="-2" r="1.8" fill="#C2185B" />
        <circle cx="10" cy="2" r="1.6" fill="#F48FB1" />
        <circle cx="16" cy="6" r="3" fill="#FFD54F" />
      </g>
    </>
  ),
  'red-riding-hood': () => (
    <>
      <Sun x={76} y={18} />
      <Cloud x={24} y={14} s={0.9} />
      <g transform="translate(46 58)">
        <path d="M-16 18 Q -18 0 -8 -6 L8 -6 Q 18 0 16 18 Z" fill="#C62828" />
        <path d="M-10 -6 Q -10 -16 0 -16 Q 10 -16 10 -6 Z" fill="#EF5350" />
        <circle cx="0" cy="-12" r="5.6" fill="#FFE0B2" />
        <circle cx="-2" cy="-13" r="1" fill="#4E342E" />
        <circle cx="2" cy="-13" r="1" fill="#4E342E" />
        <path d="M-1.6 -9.6 Q 0 -8.6 1.6 -9.6" stroke="#4E342E" strokeWidth="0.9" fill="none" />
      </g>
      <g transform="translate(22 40)">
        <path d="M0 0 L-14 26 L14 26 Z" fill="#388E3C" />
        <path d="M0 6 L-9 24 L9 24 Z" fill="#2E7D32" />
        <rect x="-2" y="24" width="4" height="8" fill="#6D4C41" />
      </g>
      <g transform="translate(80 44)">
        <path d="M0 0 L-11 20 L11 20 Z" fill="#43A047" />
      </g>
    </>
  ),
  'forest-path': () => (
    <>
      <Cloud x={30} y={14} s={0.9} />
      <Cloud x={72} y={10} s={0.6} />
      <Ground color="#7CB342" y={66} h={34} />
      <path d="M40 100 Q 46 80 50 66 Q 54 80 60 100 Z" fill="#C8E6C9" />
      <g transform="translate(18 42)">
        <path d="M0 0 L-13 24 L13 24 Z" fill="#388E3C" />
        <rect x="-2" y="22" width="4" height="8" fill="#6D4C41" />
      </g>
      <g transform="translate(82 38)">
        <path d="M0 0 L-12 22 L12 22 Z" fill="#43A047" />
        <rect x="-2" y="20" width="4" height="8" fill="#6D4C41" />
      </g>
      <g transform="translate(58 46)">
        <circle cx="0" cy="0" r="6" fill="#FFF9C4" />
        <circle cx="0" cy="0" r="2.6" fill="#F57F17" />
      </g>
    </>
  ),
  'peter-pan': () => (
    <>
      <Moon x={78} y={16} r={10} />
      <Stars count={18} seed={6} />
      <Cloud x={26} y={34} s={1} color="#E8EAF6" />
      <Cloud x={70} y={52} s={0.8} color="#E8EAF6" />
      <g transform="translate(44 42)">
        <path d="M-12 8 Q -14 -4 -4 -8 Q 6 -10 10 -2 Q 14 6 6 10 Q -4 14 -12 8 Z" fill="#7CB342" />
        <path d="M-8 4 Q -4 -4 2 -2 Q 8 0 4 6 Q -2 10 -8 4 Z" fill="#A5D6A7" />
        <circle cx="12" cy="-6" r="4" fill="#FFE0B2" />
        <circle cx="13.6" cy="-7" r="1" fill="#4E342E" />
        <path d="M8 -2 L20 -4 L8 1 Z" fill="#FFD54F" />
      </g>
      <g transform="translate(68 26)">
        <circle cx="0" cy="0" r="3.4" fill="#FFF59D" />
        <circle cx="0" cy="0" r="1.6" fill="#FBC02D" />
      </g>
    </>
  ),
  'nursery-window': () => (
    <>
      <Moon x={76} y={16} r={11} />
      <Stars count={14} seed={7} />
      <g transform="translate(50 52)">
        <rect x="-22" y="-30" width="44" height="58" rx="4" fill="#37474F" />
        <rect x="-18" y="-26" width="36" height="50" rx="2" fill="#4FC3F7" />
        <line x1="0" y1="-26" x2="0" y2="24" stroke="#37474F" strokeWidth="2.4" />
        <line x1="-18" y1="-1" x2="18" y2="-1" stroke="#37474F" strokeWidth="2.4" />
      </g>
      <rect x="0" y="80" width="100" height="20" fill="#263238" />
    </>
  ),
  // Alice 第二章：变大变小，哭出一池眼泪
  'pool-tears': () => (
    <>
      <Cloud x={26} y={16} s={0.8} color="#EDE7F6" />
      <Cloud x={76} y={12} s={0.6} color="#EDE7F6" />
      <ellipse cx="50" cy="76" rx="46" ry="16" fill="#B39DDB" opacity={0.85} />
      <ellipse cx="50" cy="74" rx="36" ry="11" fill="#D1C4E9" />
      <path d="M28 62 Q 30 72 28 78" stroke="#7E57C2" strokeWidth="2" fill="none" />
      <path d="M50 58 Q 53 70 50 78" stroke="#7E57C2" strokeWidth="2" fill="none" />
      <path d="M72 62 Q 74 72 72 78" stroke="#7E57C2" strokeWidth="2" fill="none" />
      <g transform="translate(50 40)">
        <path d="M-2 18 Q -10 4 -6 -8 Q 0 -16 6 -8 Q 10 4 2 18 Z" fill="#B3E5FC" />
        <circle cx="0" cy="-10" r="5" fill="#FFE0B2" />
        <circle cx="-1.8" cy="-11" r="1" fill="#4E342E" />
        <circle cx="1.8" cy="-11" r="1" fill="#4E342E" />
        <path d="M-2 -6 Q 0 -4 2 -6" stroke="#4E342E" strokeWidth="0.9" fill="none" />
      </g>
    </>
  ),
  // Alice 第七章：疯帽匠的茶会（茶杯 + 怀表）
  'mad-tea': () => (
    <>
      <Sun x={78} y={18} />
      <Cloud x={24} y={14} s={0.8} />
      <Ground color="#8D6E63" y={74} />
      <g transform="translate(50 58)">
        <path d="M-16 2 L-13 -14 Q 0 -20 13 -14 L16 2 Z" fill="#EF9A9A" />
        <rect x="-16" y="2" width="32" height="6" rx="3" fill="#E57373" />
        <path d="M16 -8 Q 26 -8 26 -2 Q 26 4 16 3" fill="none" stroke="#E57373" strokeWidth="3" />
        <ellipse cx="0" cy="-12" rx="9" ry="4" fill="#FFCCBC" />
        <path d="M-4 -20 Q 0 -26 4 -20" fill="none" stroke="#CE93D8" strokeWidth="2.4" />
      </g>
      <g transform="translate(24 46)">
        <circle cx="0" cy="0" r="7" fill="#FFE082" />
        <circle cx="0" cy="0" r="4.4" fill="#FFB300" />
        <path d="M0 -7 L0 -13" stroke="#8D6E63" strokeWidth="2" />
      </g>
    </>
  ),
  // Peter Pan：影子被窗户夹断，卷进抽屉
  'peter-shadow': () => (
    <>
      <Moon x={76} y={14} r={10} />
      <Stars count={16} seed={9} />
      <g transform="translate(50 50)">
        <rect x="-24" y="-30" width="48" height="60" rx="4" fill="#37474F" />
        <rect x="-20" y="-26" width="40" height="52" rx="2" fill="#4FC3F7" />
        <line x1="0" y1="-26" x2="0" y2="26" stroke="#37474F" strokeWidth="2.4" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#37474F" strokeWidth="2.4" />
        <path
          d="M14 -24 Q 26 -18 26 -6 Q 26 8 18 14"
          fill="none"
          stroke="#1A237E"
          strokeWidth="3"
          opacity="0.55"
        />
      </g>
      <rect x="0" y="80" width="100" height="20" fill="#263238" />
    </>
  ),
  // 仙女尘：塔克贝尔的一小团光
  'fairy-dust': () => (
    <>
      <Moon x={80} y={16} r={9} />
      <Stars count={20} seed={11} />
      <Cloud x={26} y={40} s={0.9} color="#E8EAF6" />
      {[
        [44, 30],
        [56, 40],
        [62, 54],
        [50, 62],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.6 - i * 0.4} fill="#FFF59D" opacity={1 - i * 0.16} />
      ))}
      <circle cx="40" cy="26" r="4.4" fill="#FFF9C4" />
      <circle cx="40" cy="26" r="2" fill="#FBC02D" />
    </>
  ),
  // 小红帽第二章：大灰狼扮成奶奶躺在床上
  'wolf-bed': () => (
    <>
      <Moon x={76} y={16} r={9} />
      <Stars count={12} seed={12} />
      <Ground color="#5D4037" y={70} />
      <g transform="translate(50 56)">
        <rect x="-26" y="-6" width="52" height="20" rx="6" fill="#8D6E63" />
        <rect x="-26" y="-12" width="14" height="10" rx="3" fill="#EF9A9A" />
        <path d="M-12 -12 Q -10 -24 0 -24 Q 10 -24 12 -12 Z" fill="#C62828" />
        <circle cx="0" cy="-18" r="5.4" fill="#A1887F" />
        <circle cx="-2" cy="-19.4" r="1" fill="#FFF3E0" />
        <circle cx="2" cy="-19.4" r="1" fill="#FFF3E0" />
        <path d="M-3.4 -15.4 Q 0 -13 3.4 -15.4 L 4.4 -12 L -4.4 -12 Z" fill="#FAFAFA" />
        <path d="M-8 -8 L-16 -16 M 8 -8 L 16 -16" stroke="#90A4AE" strokeWidth="2.4" />
      </g>
    </>
  ),
  // Peter Rabbit：McGregor 的菜园
  'mcgregor-garden': () => (
    <>
      <Sun x={76} y={18} />
      <Cloud x={24} y={14} s={0.8} />
      <Ground color="#6D4C41" y={68} />
      <g transform="translate(50 78)">
        <rect x="-34" y="-8" width="68" height="8" rx="4" fill="#8D6E63" />
        <rect x="-30" y="-4" width="60" height="4" rx="2" fill="#A1887F" />
      </g>
      {[
        [20, 62],
        [36, 58],
        [62, 60],
        [80, 64],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <circle cx="0" cy="0" r="6" fill="#66BB6A" />
          <circle cx="0" cy="-2" r="3" fill="#A5D6A7" />
        </g>
      ))}
      <g transform="translate(82 44)">
        <line x1="0" y1="0" x2="0" y2="22" stroke="#8D6E63" strokeWidth="3" />
        <path d="M-10 2 L10 2 M-8 8 L8 8" stroke="#BDBDBD" strokeWidth="2.6" />
      </g>
    </>
  ),
  // Peter Rabbit：工具棚里的浇水罐
  'tool-shed': () => (
    <>
      <Cloud x={30} y={14} s={0.8} />
      <Cloud x={74} y={10} s={0.6} />
      <Ground color="#7CB342" y={70} />
      <g transform="translate(44 54)">
        <path d="M-12 8 Q -14 -4 -4 -8 Q 6 -10 10 -2 Q 14 6 6 10 Q -4 14 -12 8 Z" fill="#7CB342" />
        <path d="M-8 4 Q -4 -4 2 -2 Q 8 0 4 6 Q -2 10 -8 4 Z" fill="#A5D6A7" />
        <circle cx="12" cy="-6" r="4" fill="#FFE0B2" />
        <circle cx="13.4" cy="-7" r="1" fill="#4E342E" />
      </g>
      <g transform="translate(72 56)">
        <path d="M-10 10 L-8 -4 Q 0 -10 8 -4 L10 10 Z" fill="#4FC3F7" />
        <path d="M10 -2 L18 -8 L20 -4 L12 2 Z" fill="#29B6F6" />
        <path d="M-8 10 L-10 16 M8 10 L10 16" stroke="#0288D1" strokeWidth="2.4" />
      </g>
    </>
  ),
  // Peter Rabbit：沙堤下的小窝（结局）
  'sand-bank': () => (
    <>
      <Sun x={24} y={20} />
      <Cloud x={74} y={12} s={0.8} />
      <Ground color="#A1887F" y={72} />
      <g transform="translate(50 56)">
        <path d="M0 -26 L-30 16 L30 16 Z" fill="#2E7D32" />
        <path d="M0 -18 L-20 12 L20 12 Z" fill="#388E3C" />
        <rect x="-2" y="12" width="4" height="10" fill="#6D4C41" />
      </g>
      <g transform="translate(50 74)">
        <path d="M-14 6 Q -14 -6 0 -6 Q 14 -6 14 6 Z" fill="#D7CCC8" />
        <path d="M-14 6 L14 6" stroke="#8D6E63" strokeWidth="2" />
      </g>
    </>
  ),
  // 通用提示：白天草丘上的一颗小桃子 + 「!」气泡（原夜灯提示，键名为稳定键，保留「提示」语义）
  'lamp-hint': () => (
    <>
      <Sun x={80} y={16} r={9} />
      <Cloud x={24} y={14} s={0.7} />
      <Ground color="#A5D6A7" y={76} />
      <g transform="translate(50 52)">
        {/* 叶子 */}
        <path d="M-2 -12 Q -9 -15 -11 -9 Q -6 -7 -2 -10 Z" fill="#66BB6A" />
        <path d="M2 -12 Q 9 -15 11 -9 Q 6 -7 2 -10 Z" fill="#81C784" />
        {/* 桃身：橙粉圆（与 TaoMascot 同画法） */}
        <circle cx={0} cy={0} r={11} fill="#FF8E75" />
        <ellipse cx={-4} cy={-4} rx={3} ry={4.5} fill="#FFB3A0" opacity={0.85} />
      </g>
      {/* 提示气泡：墨线贴纸风，不用 emoji */}
      <g transform="translate(72 42)">
        <circle cx={0} cy={0} r={7} fill="#FFD84D" stroke="#26201A" strokeWidth={1.6} />
        <rect x={-1.2} y={-4.2} width={2.4} height={5.4} rx={1.2} fill="#26201A" />
        <circle cx={0} cy={3.4} r={1.4} fill="#26201A" />
      </g>
    </>
  ),
  'bookshelf': () => (
    <>
      <Cloud x={26} y={16} s={0.8} />
      <Cloud x={74} y={12} s={0.6} />
      <Ground color="#8D6E63" y={78} />
      <g transform="translate(50 52)">
        <rect x="-30" y="-22" width="60" height="44" rx="3" fill="#A1887F" />
        <rect x="-26" y="-18" width="52" height="36" rx="2" fill="#6D4C41" />
        <rect x="-24" y="-16" width="8" height="32" fill="#EF5350" />
        <rect x="-14" y="-16" width="8" height="32" fill="#42A5F5" />
        <rect x="-4" y="-16" width="8" height="32" fill="#FFCA28" />
        <rect x="6" y="-16" width="8" height="32" fill="#66BB6A" />
        <rect x="16" y="-16" width="8" height="32" fill="#AB47BC" />
      </g>
    </>
  ),
  // 空书架：桃树刚发芽，书还没长出来（docs/09 §5.2 空状态不用 emoji）
  'empty-sprout': () => (
    <>
      <Sun x={78} y={20} />
      <Cloud x={24} y={14} s={0.8} />
      <Ground color="#8D6E63" y={76} />
      <g transform="translate(50 70)">
        <rect x="-3" y="-26" width="6" height="26" rx="3" fill="#8D6E63" />
        <path d="M0 -18 Q -12 -24 -14 -12 Q -4 -8 0 -14 Z" fill="#66BB6A" />
        <path d="M0 -22 Q 12 -28 14 -16 Q 4 -12 0 -18 Z" fill="#81C784" />
        <circle cx={0} cy={-30} r={4} fill="#FF8E75" />
      </g>
    </>
  ),
  // 加载态：白天草丘 + 太阳（白天是主场景；键名为数据库稳定键，沿用历史名）
  'loading-moon': () => (
    <>
      <Sun x={50} y={28} r={13} />
      <Cloud x={20} y={16} s={0.7} />
      <Cloud x={82} y={22} s={0.6} />
      <Hills colors={['#A5D6A7', '#7CB342']} />
      <Ground color="#558B2F" y={80} h={20} />
    </>
  ),
  // 桃园空态：白天桃园，一颗颗桃子还挂在树上（原「星海」空态，键名为稳定键；docs/11 P0-3）
  'star-sea': () => (
    <>
      <Sun x={24} y={20} r={9} />
      <Cloud x={76} y={16} s={0.7} />
      <Hills colors={['#A5D6A7', '#7CB342']} />
      <Ground color="#558B2F" y={82} h={18} />
      {/* 一棵挂满桃子的桃树 */}
      <g transform="translate(58 62)">
        <path d="M-4 16 L-3 -8 Q 0 -11 3 -8 L4 16 Z" fill="#8D6E63" />
        <circle cx={-11} cy={-12} r={9} fill="#66BB6A" />
        <circle cx={11} cy={-12} r={9} fill="#81C784" />
        <circle cx={0} cy={-19} r={10} fill="#7CC47F" />
        <circle cx={-6} cy={-8} r={3.4} fill="#FF8E75" />
        <circle cx={7} cy={-13} r={3.4} fill="#FF8E75" />
        <circle cx={0} cy={-22} r={3.4} fill="#FF8E75" />
      </g>
      {/* 草丘上先落下来的两颗 */}
      <circle cx={26} cy={76} r={4.5} fill="#FF8E75" />
      <circle cx={36} cy={79} r={3.5} fill="#FFB07A" />
    </>
  ),
  // 桃子墙空态：第一颗桃子还挂在树上（原「夜灯墙」空态，键名为稳定键；AchievementWall，docs/11 P0-3）
  'lamp-first': () => (
    <>
      <Sun x={78} y={18} r={10} />
      <Cloud x={22} y={14} s={0.7} />
      <Hills colors={['#A5D6A7', '#7CB342']} />
      <Ground color="#558B2F" y={80} h={20} />
      <g transform="translate(50 62)">
        {/* 树干 */}
        <path d="M-4 14 L-3 -10 Q 0 -13 3 -10 L4 14 Z" fill="#8D6E63" />
        {/* 树冠 */}
        <circle cx={-10} cy={-14} r={9} fill="#66BB6A" />
        <circle cx={10} cy={-14} r={9} fill="#81C784" />
        <circle cx={0} cy={-20} r={10} fill="#7CC47F" />
        {/* 挂着的那一颗：橙粉桃子 + 小叶子 */}
        <g transform="translate(0 -7)">
          <path d="M-1 -5.5 Q -4.5 -7.5 -5.5 -4 Q -3 -2.5 -1 -4 Z" fill="#4CAF50" />
          <circle cx={0} cy={0} r={5} fill="#FF8E75" />
          <ellipse cx={-1.6} cy={-1.6} rx={1.2} ry={1.8} fill="#FFB3A0" opacity={0.85} />
        </g>
      </g>
    </>
  ),
}

/**
 * IP 吉祥物「小桃」（docs/09 §5.1）。
 * 一颗圆滚滚的桃子，两片叶子，眨眼笑脸。贯穿首页→选书→收尾→桃子墙做引导，
 * 定位是「陪伴者」而非「监工」——只庆祝、不催促（Scholastic：唠叨毁动机）。
 * size 为 viewBox 单位下的近似高度；mood 切换表情。
 */
export function TaoMascot({
  mood = 'happy',
  className,
  style,
}: {
  mood?: 'happy' | 'sleepy' | 'excited' | 'hint'
  className?: string
  style?: React.CSSProperties
}) {
  const eyes =
    mood === 'sleepy' ? (
      <>
        <path d="M-6 -2 Q -3 -5 0 -2" stroke="#5D4037" strokeWidth={1.4} fill="none" strokeLinecap="round" />
        <path d="M3 -2 Q 6 -5 9 -2" stroke="#5D4037" strokeWidth={1.4} fill="none" strokeLinecap="round" />
      </>
    ) : mood === 'excited' ? (
      <>
        <path d="M-7 -3 L-4 -7 L-1 -3 Z" fill="#5D4037" />
        <path d="M2 -3 L5 -7 L8 -3 Z" fill="#5D4037" />
      </>
    ) : (
      <>
        <circle cx={-4.5} cy={-3} r={1.8} fill="#5D4037" />
        <circle cx={4.5} cy={-3} r={1.8} fill="#5D4037" />
        <circle cx={-4} cy={-3.6} r={0.6} fill="#FFFFFF" />
        <circle cx={5} cy={-3.6} r={0.6} fill="#FFFFFF" />
      </>
    )
  const mouth =
    mood === 'hint' ? (
      <path d="M-3 3 Q 0 1.5 3 3" stroke="#5D4037" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    ) : mood === 'sleepy' ? (
      <ellipse cx={0} cy={3.5} rx={3} ry={1.6} fill="#5D4037" opacity={0.75} />
    ) : (
      <path d="M-4 2.5 Q 0 6.5 4 2.5" stroke="#5D4037" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    )
  return (
    <motion.svg
      viewBox="-16 -18 32 36"
      role="img"
      aria-label="小桃"
      data-art="tao-mascot"
      className={className}
      style={style}
      {...(useReducedMotion() ? {} : MOTION.breathe)}
    >
      <defs>
        {/* 品牌桃子渐变（对齐 taostudio logo：蜜桃橙→粉，左上受光） */}
        <radialGradient id="tao-body" cx="0.34" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#FFD1B8" />
          <stop offset="0.45" stopColor="#FF9E7A" />
          <stop offset="1" stopColor="#F06A56" />
        </radialGradient>
        <linearGradient id="tao-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8BC34A" />
          <stop offset="1" stopColor="#558B2F" />
        </linearGradient>
      </defs>
      {/* 叶子：两片对生，深浅两色 */}
      <path d="M-1.5 -11.5 Q -8.5 -15.5 -11.5 -9.5 Q -6.5 -6.5 -1.5 -9.5 Z" fill="url(#tao-leaf)" />
      <path d="M1.5 -11.5 Q 8.5 -15.5 11.5 -9.5 Q 6.5 -6.5 1.5 -9.5 Z" fill="#9CCC65" />
      {/* 桃身：品牌渐变 + 描边 */}
      <path
        d="M-9 -4
           Q -11 -10 -5 -11
           Q 0 -13 5 -11
           Q 11 -10 9 -4
           Q 8 6 0 12
           Q -8 6 -9 -4 Z"
        fill="url(#tao-body)"
        stroke="#D95A44"
        strokeWidth={0.9}
        strokeLinejoin="round"
      />
      {/* 高光：左上大块柔光 + 小亮点 */}
      <ellipse cx={-4.2} cy={-5.2} rx={2.8} ry={3.8} fill="#FFE3D2" opacity={0.75} />
      <circle cx={-2.2} cy={-8} r={0.9} fill="#FFF4E8" opacity={0.9} />
      {/* 中缝 */}
      <path d="M0 -9.5 Q -1.6 0 0 10.5" stroke="#D95A44" strokeWidth={1.1} fill="none" opacity={0.45} strokeLinecap="round" />
      {eyes}
      {mouth}
      {/* 腮红 */}
      <circle cx={-7} cy={2} r={1.8} fill="#FF5C8A" opacity={0.32} />
      <circle cx={7} cy={2} r={1.8} fill="#FF5C8A" opacity={0.32} />
    </motion.svg>
  )
}

/** 默认渐变色（场景未指定时按 lang/category 回落） */
const DEFAULT_GRADIENTS: Record<string, [string, string]> = {
  zh: ['#3A2814', '#8A5A28'],
  en: ['#4A3418', '#A07030'],
}

/**
 * 场景插画。优先用 pack 指定的渐变色；未指定时按语言回落。
 * 未知场景键回落到 bookshelf，绝不渲染空白。
 */
export function SceneArt({
  scene,
  from,
  to,
  lang = 'zh',
  className,
}: {
  scene: string
  from?: string | null
  to?: string | null
  lang?: string
  className?: string
}) {
  const [gf, gt] = DEFAULT_GRADIENTS[lang] ?? DEFAULT_GRADIENTS.zh!
  const render = SCENES[scene] ?? SCENES['bookshelf']!
  return svg(render(), from ?? gf, to ?? gt, scene, className)
}
