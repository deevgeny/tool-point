import React from 'react';
import RouterLinkButton from '../RouterLinkButton';

/**
 * React router back button (back navigation button).
 * 
 * @returns {RouterLinkButton} - RouterLinkButton with customized props.
 */
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