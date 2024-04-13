import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type PlanType = 'Ultimate' | 'Enterprise' | 'Basic' | 'Lite' | 'Trial'

export type Company = {
  id?: number // uid
  name: string // compnay name
  plan: Plan // current plan
  users: User[] // number of users
  reports: Report[] // number of reports this month
}

type User = {
  email: string
  name: string
  limit: number
}

type Plan = {
  createdAt: Date
  type: PlanType
  limit: number
}

type Report = {
  id?: string | number
  createdAt: Date
  content: string
}

type State = {
  companies: {
    [companyName: string]: Company
  }
}

type Methods = {
  generateReport: (companyName: string) => void
  setPlan: (companyName: string, type: PlanType) => void
  setLimitPerUser: (companyName: string, limits: Record<string, number>) => void
  adjustLimit: (companyName: string, amnt: number) => void
}

type Store = State & Methods

const intialState: State = {
  companies: {
    poimandres: {
      id: 749293841266,
      name: 'poimandres',
      plan: {
        createdAt: new Date(2024, 0, 16, 0, 0, 0),
        limit: 100,
        type: 'Basic',
      },
      users: [
        {
          email: 'josephine@poimandres.co.uk',
          limit: 20,
          name: 'j0s3f1n',
        },
        {
          name: 'mark',
          email: 'mark@poimandres.co.uk',
          limit: 75,
        },
      ],
      reports: [
        {
          content: '<div>some report</div>',
          createdAt: new Date(2024, 2, 22, 15, 4, 40),
          id: 190623,
        },
        {
          content: '<div>some report</div>',
          createdAt: new Date(2024, 2, 22, 14, 25, 18),
          id: 889012,
        },
      ],
    },
    axion: {
      id: 889354627123,
      name: 'axion',
      plan: {
        createdAt: new Date(2023, 11, 5, 0, 0, 0),
        limit: 20,
        type: 'Lite',
      },
      users: [
        {
          name: 'SySigh',
          email: 'simon@gmail.com',
          limit: 5,
        },
      ],
      reports: Array.from({ length: 19 }).map(() => ({
        content: '<div>some report</div>',
        createdAt: new Date(2024, 2, 22, 15, 4, 40),
        id: 789124,
      })),
    },
  },
}

export const useDomainStore = create<Store>()(
  devtools(set => ({
    ...intialState,

    generateReport: (companyName: string) =>
      set(state => ({
        ...state,
        companies: {
          ...state.companies,
          [companyName]: {
            ...state.companies[companyName],
            reports: [
              ...state.companies[companyName].reports,
              {
                content: '<div>new report</div>',
                createdAt: new Date(),
                id: nanoid(9),
              },
            ],
          },
        },
      })),

    setPlan: (companyName: string, type: PlanType) =>
      set(state => {
        const company = state.companies[companyName]

        const planLimit = planRules[type]

        const plan = {
          createdAt: new Date(),
          limit: planLimit,
          type,
        }

        const users = company.users.map(user => ({
          ...user,
          limit: planLimit / company.users.length,
        }))

        return {
          ...state,
          companies: {
            ...state.companies,
            [companyName]: {
              ...company,
              plan,
              users,
            },
          },
        }
      }),

    setLimitPerUser: (companyName: string, limits: Record<string, number>) =>
      set(state => {
        const company = state.companies[companyName]

        const users = company.users.map(user => ({
          ...user,
          limit: limits[user.name],
        }))

        return {
          ...state,
          companies: {
            ...state.companies,
            [companyName]: {
              ...company,
              users,
            },
          },
        }
      }),

    adjustLimit: (companyName: string, amnt: number) =>
      set(state => {
        const company = state.companies[companyName]

        const limit = company.plan.limit + amnt

        const users = company.users.map(user => ({
          ...user,
          limit: Math.floor(limit / company.users.length),
        }))

        return {
          ...state,
          companies: {
            ...state.companies,
            [companyName]: {
              ...company,
              users,
              plan: {
                ...company.plan,
                limit,
              },
            },
          },
        }
      }),

    //
  })),
)

const planRules: Record<PlanType, number> = {
  Ultimate: 1000,
  Enterprise: 500,
  Basic: 100,
  Lite: 20,
  Trial: 0,
}
