import { createContext, useState } from 'react';
import Token from '../services/token';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Auth context from local storage or {}
  const [auth, setAuth] = useState(Token.getLocalAuthContext());
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;