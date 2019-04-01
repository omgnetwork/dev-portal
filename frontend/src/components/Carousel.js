import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';

const XCarousel = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem;

  .carousel-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    max-width: ${props => props.theme.PAGE_WIDTH};
  }
`;

const Carousel = () => {
  return (
    <XCarousel>
      <div className="carousel-content">
        Carousel
        <Button>
          Get Started
        </Button>
      </div>
    </XCarousel>
  );
}

export default Carousel;
