import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const XButton = styled.div`
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background-color: ${props => props.theme.BLUE};
  color: ${props => props.theme.WHITE};
  border-radius: ${props => props.theme.BORDER_RADIUS};
  transition: all 200ms ease-in-out;

  :hover {
    cursor: pointer;
    box-shadow: ${props => props.theme.BOX_SHADOW};
  }
`;

const Button = ({ href, to, children }) => {
  return (
    <XButton>
      {children}
    </XButton>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button;
