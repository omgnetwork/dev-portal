import React from 'react';
import styled from 'styled-components';

import Link from './Link';

const XHeader = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  box-shadow: ${props => props.theme.BOX_SHADOW};

  .header-content {
    max-width: ${props => props.theme.PAGE_WIDTH};
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
  }

  .header-link {
    padding-left: 2rem;
  }
`;

const Header = () => {
  return (
    <XHeader>
      <div className="header-content">
        <span>Logo</span>

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
    </XHeader>
  );
}

export default Header;
