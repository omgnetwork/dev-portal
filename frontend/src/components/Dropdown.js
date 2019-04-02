import React, { useEffect } from 'react';
import styled from 'styled-components';

import Link from './Link';

const XDropdown = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  transform: translateY(84px);
  overflow: hidden;
  background-color: ${props => props.theme.background};
  transition: height 300ms ease-in-out;
  height: ${props => props.isOpen ? '220px' : 0};
  box-shadow: ${props => props.isOpen ? props.theme.boxShadow : 'initial'};

  .dropdown-link {
    padding: 1rem 1.5rem;
  }
`;

const Dropdown = ({ isOpen, hamburgerClick, menuItems }) => {
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const handleClick = e => {
    if (isOpen) {
      hamburgerClick();
    }
  }

  return (
    <XDropdown isOpen={isOpen}>
      {menuItems.map((item, index) => (
        <div key={index} className='dropdown-link'>
          <Link href={item.href}>{item.title}</Link>
        </div>
      ))}
    </XDropdown>
  );
}

export default Dropdown;
