import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const XPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .page-child {
    flex: 1 1 auto;
    margin-top: 85px;
  }
`;

const Page = ({ children }) => {
  return (
    <XPage>
      <Header />

      <div className='page-child'>
        { children }
      </div>

      <Footer />
    </XPage>
  );
}

export default Page;
