import { Link, useRouteError } from 'react-router-dom'

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)

  return (
    <div>
      <h3>Dang!</h3>
      {error instanceof Error && (
        <p>
          <pre>{error.name}:</pre>
          <pre>{error.message}</pre>
        </p>
      )}
      <Link to="/">Try again</Link>
    </div>
  )
}
