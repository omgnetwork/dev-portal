import React from 'react';
import styled from 'styled-components';

const XCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  text-align: center;
  padding: 1rem;
  margin: 0 0.5rem;
  border: 2px solid ${props => props.theme.secondary};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  transition: all 300ms ease-in-out;

  :hover {
    box-shadow: ${props => props.theme.boxShadow};
  }

  :active {
    transform: translateY(1px);
    box-shadow: none;
  }

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }
`;

const Card = ({ children }) => {
  return (
    <XCard>
      {children}
    </XCard>
  );
}

export default Card;
