import { Link } from 'react-router-dom'
import { useDomainStore } from '../lib/store'

export function Nav() {
  const companies = useDomainStore(s => Object.values(s.companies))

  return (
    <nav
      style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid',
        padding: '10px 0',
        width: '100%',
      }}
    >
      {companies.map(company => (
        <Link key={company.id} to={company.name}>
          {company.name}{' '}
        </Link>
      ))}
    </nav>
  )
}
