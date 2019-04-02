import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const XButton = styled.div`
  padding: 0.3rem 0.7rem;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.background};
  border-radius: ${props => props.theme.borderRadius};
  transition: all 100ms ease-in-out;

  :hover {
    cursor: pointer;
    box-shadow: ${props => props.theme.boxShadow};
  }

  :active {
    box-shadow: none;
    transform: translateY(1px);
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
