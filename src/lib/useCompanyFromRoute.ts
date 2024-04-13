import { useParams } from 'react-router-dom'
import { useDomainStore } from './store'

/**
 * Example of a hook composition connecting global store to router state
 */

export function useCompanyFromRoute() {
  const { companyName } = useParams()

  if (!companyName) {
    throw new Error('No company')
  }

  const company = useDomainStore(({ companies }) => companies[companyName])
  const isoverLimit = company.reports.length >= company.plan.limit

  return {
    company,
    isoverLimit,
  }
}
