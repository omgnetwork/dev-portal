import React from 'react';
import styled from 'styled-components';

const XDivider = styled.div`
  height: 3px;
  margin-left: auto;
  margin-right: auto;
  background: ${props =>
    `linear-gradient(90deg,
      ${props.theme.background},
      ${props.theme.gray} 50%,
      ${props.theme.background})`
  };
`;

const Divider = () => {
  return (
    <XDivider />
  );
}

export default Divider;
