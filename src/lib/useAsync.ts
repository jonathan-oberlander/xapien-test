import { useCallback, useEffect, useState } from 'react'

/**
 * Handle server requests state at the component level -
 * A similar approach could be created in the global store to handle loading and errors which depends on the UX requirements + designs
 *
 * I have only wrapped one request for the sake of the exercise, but this could be scaled to every request if need be.
 *
 * Using a tool like like React-query or similar for BE request would be a lot better (caching, stale while revalidate etc...)
 *
 * TODO: infer args to keep Data type
 * Please excuse the ANYs here - not enough time
 */

type Status = {
  data: any
  loading: boolean
  error: string | undefined
}

export function useAsync<D>(
  fn: (...args: any[]) => D,
  immediate = false,
): [(...args: any[]) => Promise<void>, Status] {
  const [status, setStatus] = useState<Status>({
    data: undefined,
    loading: false,
    error: undefined,
  })

  const callback = useCallback(
    async (...args: any[]) => {
      setStatus({
        loading: true,
        error: undefined,
        data: undefined,
      })

      try {
        const data = await fn(...args)
        setStatus(s => ({ ...s, data }))
      } catch (error) {
        console.error(error)
        if (error instanceof Error) {
          setStatus(s => ({ ...s, error: error.message }))
        }
      } finally {
        setStatus(s => ({ ...s, loading: false }))
      }
    },
    [fn],
  )

  useEffect(() => {
    if (immediate) {
      callback()
    }
  }, [callback, immediate])

  return [callback, status]
}
