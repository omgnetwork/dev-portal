import React, { useState }  from 'react';
import styled from 'styled-components';

import Status from './Status';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';
import Link from './Link';

const XHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.3rem 1.5rem;
  box-shadow: ${props => props.theme.boxShadow};
  position: fixed;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  background-color: ${props => props.theme.background};

  .header-content {
    position: relative;
    max-width: ${props => props.theme.pageWidth};
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${props => props.theme.mobileBreak} {
      justify-content: space-between;
    }

    .header-status {
      position: absolute;
      right: 0;
    }

    .header-desktop {
      display: flex;
      flex-direction: row;

      @media ${props => props.theme.mobileBreak} {
        display: none;
      }

      .header-link {
        display: flex;
        align-items: center;
        padding-left: 2rem;
      }
    }

    .header-mobile {
      @media ${props => props.theme.isNotMobile} {
        display: none;
      }
      display: flex;
      align-items: center;
    }
  }

  .header-logo {
    top: 6px;
    transform: translateY(8px);
  }
`;

const menuItems = [
  {
    title: 'Block Explorer',
    href: 'http://quest.omg.network'
  },
  {
    title: 'API Specification',
    href: 'https://omisego.github.io/elixir-omg/'
  },
  {
    title: 'Connection Details',
    href: 'https://github.com/omisego/dev-portal/blob/master/Guides/Network_endpoints.md'
  }
]

const Header = ({ showStatus }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const hamburgerClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <XHeader>
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/img/omisego-blue.svg'} alt='omisego-blue' />
          </Link>
        </div>

        <div className='header-desktop'>
          {menuItems.map((item, index) => (
            <div key={index} className="header-link">
              <Link href={item.href}>{item.title}</Link>
            </div>
          ))}
        </div>

        <div className='header-mobile'>
          <Hamburger isOpen={isOpen} hamburgerClick={hamburgerClick} />
          <Dropdown isOpen={isOpen} hamburgerClick={hamburgerClick} menuItems={menuItems}/>
        </div>

        {showStatus && (
          <div className='header-status'>
            <Status />
          </div>
        )}
      </div>
    </XHeader>
  );
}

export default Header;
