import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Typography from 'components/Typography';

const XCarousel = styled.div`
  display: flex;
  justify-content: center;
  padding: 6rem 1.5rem;
  background-color: ${props => props.theme.secondary};

  .carousel-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 auto;
    max-width: ${props => props.theme.pageWidth};
  }

  .carousel-content .carousel-text {
    padding-bottom: 1.5rem;
  }
`;

const Carousel = () => {
  return (
    <XCarousel>
      <div className='carousel-content'>
        <Typography className='carousel-text' size='L'>
          OmiseGO Developer Portal
        </Typography>

        <Typography className='carousel-text' size='XL' bold>
          {`Build Scalable Decentralized\nPayment Apps`}
        </Typography>

        <Typography className='carousel-text' color='text'>
          {`Leverage Plasma architecture to build a L2 Application with\nhigh throughputs and strong safety gaurantees`}
        </Typography>

        <Button>
          Get Started
        </Button>
      </div>
    </XCarousel>
  );
}

export default Carousel;
