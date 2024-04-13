import { useState } from 'react'
import { mockRequest, useAsync, useCompanyFromRoute } from '../lib'
import { useDomainStore } from '../lib/store'

export function AdjustLimit() {
  const { company } = useCompanyFromRoute()
  const [amnt, setAmnt] = useState(0)

  const adjust = useDomainStore(s => s.adjustLimit)

  const [adjustMutation, { error, loading }] = useAsync<
    Parameters<typeof adjust>
  >(async (...args) => {
    const v = await mockRequest(args)
    adjust(...v)
    // setAmnt(0)
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '12px 0',
      }}
    >
      <button type="button" onClick={() => setAmnt(s => s - 1)}>
        -
      </button>
      <div>{amnt}</div>
      <button type="button" onClick={() => setAmnt(s => s + 1)}>
        +
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => {
          adjustMutation(company.name, amnt)
        }}
      >
        Adjust Limit
      </button>
      {error && <div>{error}</div>}
    </div>
  )
}
