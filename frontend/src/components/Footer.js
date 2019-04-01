import React from 'react';
import styled from 'styled-components';

const XFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 1.5rem;

  background-color: ${props => props.theme.BLACK};
  color: ${props => props.theme.WHITE};

  .footer-content {
    max-width: ${props => props.theme.PAGE_WIDTH};
    flex: 1 1 auto;
  }
`;

const Footer = () => {
  return (
    <XFooter>
      <div className="footer-content">
        Footer
      </div>
    </XFooter>
  );
}

export default Footer;
