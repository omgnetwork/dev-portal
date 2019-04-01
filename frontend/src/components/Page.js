import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const XPage = styled.div`
  background-color: ${props => props.theme.BL100};
`;

const Page = ({ children }) => {
  return (
    <XPage>
      <Header />
      { children }
      <Footer />
    </XPage>
  );
}

export default Page;
