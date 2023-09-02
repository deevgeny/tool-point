import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthContext';


function useAuthContext() {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth => auth?.user ? 'Logged In' : 'Logged Out');
  return useContext(AuthContext);
}

export default useAuthContext;
