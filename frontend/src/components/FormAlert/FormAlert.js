import React from 'react';
import Alert from '@mui/material/Alert';
import { apiFields } from '../../utils/constants';


function FormAlert({ message }) {

  if (message?.data) {
    return (
      <>
        {Object.entries(message.data)?.map?.((item, id) =>
          <Alert
            severity='error'
            key={id}
          >
            {`${apiFields[item[0]] ? apiFields[item[0]] + ': ' : ''}${item[1]}`}
          </Alert>
        )}
      </>
    );
  } else if (message?.severity) {
    return (
      <Alert severity={message.severity}>
        {message.text}
      </Alert>
    );
  }

}

export default FormAlert;