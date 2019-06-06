import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Link from 'components/Link';

const XButton = styled.div`
  padding: 0.3rem 0.7rem;
  background-color: ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius};
  transition: all 200ms ease-in-out;
  display: inline-flex;

  a {
    color: ${props => props.theme.background};
  }

  :hover {
    cursor: pointer;
    box-shadow: ${props => props.theme.boxShadow};
    a {
      color: ${props => props.theme.background};
    }
  }

  :active {
    box-shadow: none;
    transform: translateY(1px);
  }
`;

const Button = ({ href, to, children }) => {
  return (
    <XButton>
      <Link href={href} to={to}>
        {children}
      </Link>
    </XButton>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Button;
