import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const XLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.BLACK};
  transition: color 200ms ease-in-out;

  :hover {
    color: ${props => props.theme.BLUE};
  }
`;

const Link = ({ href, children }) => {
  return (
    <XLink href={href} target="_blank">
      {children}
    </XLink>
  );
}

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default Link;
