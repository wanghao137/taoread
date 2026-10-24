import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowLeft } from './ui/icons'
import { BrandLogo } from './ui/BrandLogo'

/** Shared page frame for public reading and supporting product screens. */
export function UtilityPage({ title, description, className = '', children }: {
  title: string
  description?: string
  className?: string
  children: ReactNode
}) {
  return <div className="app utility-app">
    <main id="main-content" className={`wrap utility-page ${className}`}>
      <header className="utility-brand">
        <Link to="/" className="utility-home" aria-label="桃阅读首页"><BrandLogo width={52} height={52} alt="" /><span>桃阅读</span></Link>
        <Link className="text-action" to="/"><IconArrowLeft size={20} />返回首页</Link>
      </header>
      <div className="utility-heading"><h1>{title}</h1>{description && <p>{description}</p>}</div>
      {children}
    </main>
  </div>
}
