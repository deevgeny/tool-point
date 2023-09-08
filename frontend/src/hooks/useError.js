import { useContext } from 'react';
import ErrorContext from '../context/ErrorContext';


function useError() {
  return useContext(ErrorContext);
}

export default useError;