import React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import router from './router';

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
