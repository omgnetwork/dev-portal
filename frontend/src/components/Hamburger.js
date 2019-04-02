import React from 'react';
import styled from 'styled-components';

const XLine = styled.div`
  height: 3px;
  width: 30px;
  background-color: ${props => props.theme.primary};
  margin-bottom: 5px;
  transition: all 250ms ease-in-out;
`;
const XLine1 = styled(XLine)`
  transform-origin: top left;
  transform: ${props => props.isOpen ? 'rotate(45deg) translateY(-3px)' : 'initial'};
`;
const XLine2 = styled(XLine)`
  opacity: ${props => props.isOpen ? 0 : 1};
`;
const XLine3 = styled(XLine)`
  transform-origin: bottom left;
  transform: ${props => props.isOpen ? 'rotate(-45deg) translateY(4px)' : 'initial'};
`;

const Hamburger = ({ hamburgerClick, isOpen }) => {
  return (
    <div onClick={hamburgerClick}>
      <XLine1 isOpen={isOpen}/>
      <XLine2 isOpen={isOpen}/>
      <XLine3 isOpen={isOpen}/>
    </div>
  );
}

export default Hamburger;
