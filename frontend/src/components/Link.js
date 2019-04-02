import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const XLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme[props.color] || props.theme.text};
  transition: color 200ms ease-in-out;

  :hover {
    color: ${props => props.theme.primary};
  }
`;

const Link = ({ href, to, children, color }) => {
  if (to) {
    return (
      <RouterLink to={to}>
        {children}
      </RouterLink>
    );
  }

  return (
    <XLink href={href} target="_blank" color={color}>
      {children}
    </XLink>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  color: PropTypes.string
}

export default Link;
