import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

import Exception403 from './403';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 403) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return <Exception403 />;
  }

  // rethrow to let the parent error boundary handle it
  // when it's not a special case for this route
  throw error;
}
