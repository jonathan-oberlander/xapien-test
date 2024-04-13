import { useCompanyFromRoute } from '../lib'

export function Details() {
  const { company, isoverLimit } = useCompanyFromRoute()

  const warning = isoverLimit ? 'red' : 'inherit'
  const plan = company.plan
  const totalReports = company.reports.length

  return (
    <>
      <h2>{company.name}</h2>
      <p>
        <div>Plan: {plan.type}</div>
        <div style={{ color: warning }}>Monthly Limit: {plan.limit}</div>
        <div style={{ color: warning }}>
          Nb of reports this month: {totalReports}
        </div>
      </p>
    </>
  )
}
