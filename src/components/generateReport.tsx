import { useCompanyFromRoute } from '../lib'
import { useDomainStore } from '../lib/store'

export function GenerateReport() {
  const { company, isoverLimit } = useCompanyFromRoute()

  const gen = useDomainStore(s => s.generateReport)

  return (
    <div>
      <button
        type="button"
        disabled={isoverLimit}
        onClick={() => gen(company.name)}
      >
        Generate report
      </button>
    </div>
  )
}
