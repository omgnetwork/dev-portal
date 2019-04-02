import React from 'react';
import styled from 'styled-components';

import Hamburger from 'components/Hamburger';
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
  background-color: ${props => props.theme.background};

  .header-content {
    max-width: ${props => props.theme.pageWidth};
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;

    @media ${props => props.theme.mobileBreak} {
      justify-content: space-between;
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

const Header = () => {
  return (
    <XHeader>
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/img/omisego-blue.svg'} alt='omisego-blue' />
          </Link>
        </div>

        <div className='header-desktop'>
          <div className="header-link">
            <Link href="">Block Explorer</Link>
          </div>

          <div className="header-link">
            <Link href="">Release Notes</Link>
          </div>

          <div className="header-link">
            <Link href="">API</Link>
          </div>

          <div className="header-link">
            <Link href="">Documentation</Link>
          </div>
        </div>

        <div className='header-mobile'>
          <Hamburger />
        </div>
      </div>
    </XHeader>
  );
}

export default Header;
