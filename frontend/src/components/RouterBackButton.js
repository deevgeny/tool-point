import React from 'react';
import RouterLinkButton from './RouterLinkButton';


function RouterBackButton() {
  return (
    <RouterLinkButton
      to='..'
      relative='path'
      sx={{ marginX: '50%', translate: '-50%', marginY: 3}}
    >
      назад
    </RouterLinkButton>
  );
}

export default RouterBackButton;