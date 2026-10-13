export function PageHead({ title, sub, index = '01' }: { title: string; sub: string; index?: string }) {
  return (
    <div className="page-head">
      <span className="page-index" aria-hidden="true">{index} / 桃阅读</span>
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  )
}
