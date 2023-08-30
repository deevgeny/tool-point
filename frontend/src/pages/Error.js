import React from 'react';
import { useRouteError } from 'react-router-dom';


function Error() {
  const error = useRouteError();
  console.log('Inside error:', { ...error })

  return (
    <>
    <h1>{error.status}</h1>
    <h1>{error.statusText}</h1>
</>

  )
}

export default Error;