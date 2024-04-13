import { useEffect, useState } from 'react'
import { useCompanyFromRoute } from '../lib'
import { useDomainStore } from '../lib/store'

export function UsersList() {
  const { company } = useCompanyFromRoute()
  const [limitPerUser, setLimitPerUser] = useState<Record<string, number>>({})

  const setPerUserLimit = useDomainStore(s => s.setLimitPerUser)

  useEffect(() => {
    const limits = company.users.reduce((acc: Record<string, number>, val) => {
      acc[val.name] = val.limit
      return acc
    }, {})

    setLimitPerUser(limits)
  }, [company.users])

  const total = Object.values(limitPerUser).reduce((acc, val) => val + acc, 0)

  const disabled = total >= company.plan.limit

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '12px 0',
        width: '100%',
      }}
    >
      {company.users.map(user => (
        <div
          key={user.email}
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
            width: '100%',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            padding: '12px 0',
          }}
        >
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={() => {
                setLimitPerUser(s => ({ ...s, [user.name]: s[user.name] - 1 }))
              }}
            >
              -
            </button>
            <div>{limitPerUser[user.name]}</div>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                setLimitPerUser(s => ({ ...s, [user.name]: s[user.name] + 1 }))
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        style={{
          width: 'fit-content',
        }}
        onClick={() => setPerUserLimit(company.name, limitPerUser)}
      >
        Update Users limits
      </button>
    </div>
  )
}
