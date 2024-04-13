import { AdjustLimit } from './adjustLimit'
import { Details } from './companyDetails'
import { GenerateReport } from './generateReport'
import { UpdatePlan } from './updatePlan'
import { UsersList } from './usersList'

export function CompanyView() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '20px 0',
        width: '100%',
      }}
    >
      <Details />
      <GenerateReport />
      <AdjustLimit />
      <UpdatePlan />
      <UsersList />
    </div>
  )
}
