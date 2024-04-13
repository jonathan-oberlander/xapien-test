import { useCompanyFromRoute } from '../lib'
import { PlanType, useDomainStore } from '../lib/store'

/**
 * Ideally we would need a system to validate forms in real time, something like RHF or better
 * (backend would revalidate anyway but that prevents useless request)
 *
 * Validating the domain logic comming back from the requests on the UI is best practice with Zod or Valibot
 */

export function UpdatePlan() {
  const { company } = useCompanyFromRoute()

  const onsubmit = useDomainStore(
    ({ setPlan }) =>
      (type: PlanType) =>
        setPlan(company.name, type),
  )

  return (
    <form
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 0',
        width: '100%',
      }}
      onSubmit={e => {
        e.preventDefault()
        onsubmit((e.target as HTMLFormElement).planType.value as PlanType)
      }}
    >
      <select name="planType">
        <option value="Ultimate">Ultimate</option>
        <option value="Enterprise">Enterprise</option>
        <option value="Basic">Basic</option>
        <option value="Lite">Lite</option>
      </select>
      <button type="submit">Update Plan</button>
    </form>
  )
}
