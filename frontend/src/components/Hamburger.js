import React, { useState } from 'react';
import styled from 'styled-components';

const XHamburger = styled.div``;

const XLine = styled.div`
  height: 3px;
  width: 30px;
  background-color: ${props => props.theme.primary};
  margin-bottom: 5px;
  transition: all 250ms ease-in-out;
`;

const XLine1 = styled(XLine)`
  transform-origin: top left;
  transform: ${props => props.isOpen ? 'rotate(33deg)' : 'initial'};
`;
const XLine2 = styled(XLine)`
  opacity: ${props => props.isOpen ? 0 : 1};
`;
const XLine3 = styled(XLine)`
  transform-origin: bottom left;
  transform: ${props => props.isOpen ? 'rotate(-33deg)' : 'initial'};
`;

const Hamburger = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <XHamburger onClick={handleClick}>
      <XLine1 isOpen={isOpen}/>
      <XLine2 isOpen={isOpen}/>
      <XLine3 isOpen={isOpen}/>
    </XHamburger>
  );
}

export default Hamburger;
