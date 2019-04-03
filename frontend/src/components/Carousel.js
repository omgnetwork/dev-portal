import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { smoothScroll } from 'utils/scroll';

import Button from 'components/Button';
import Typography from 'components/Typography';

const XCarouselWrapper = styled.div`
  position: relative;
`;

const XCarouselContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const XCarouselItem = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex: 1 0 100%;
  justify-content: center;
  padding: 6rem 1.5rem 0 1.5rem;
  background-color: ${props => props.theme.secondary};

  @media (max-width: 910px) {
    padding: 6rem 1.5rem;
    .right {
      display: none;
    }
  }

  @media ${props => props.theme.mobileBreak} {
    padding: 4rem 1.5rem;
  }

  .carousel-content {
    display: flex;
    flex-direction: row;
    max-width: ${props => props.theme.pageWidth};

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1 1 auto;
    }

    .right {
      width: 50%;
      transform: translateY(-70px);
      img {
        width: 95%;
      }
    }
  }

  .carousel-content .carousel-text {
    padding-bottom: 1.5rem;
  }
`;

const XCarouselPager = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: row;
`;

const XCarouselPagerItem = styled.div`
  background-color: ${props => 
    props.active
      ? props.theme.darkGray
      : props.theme.mediumGray
  };
  width: 17px;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 15px;
  transition: all 300ms ease-in-out;
  :last-child {
    margin-right: 0px;
  }
`;

const Carousel = ({ content }) => {
  const node = useRef();
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState();
  
  useEffect(() => {
    setWidth(node.current.clientWidth);
    window.addEventListener('resize', handleResize);
    const carouselInterval = setInterval(gotoPosition, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(carouselInterval);
    }
  });
  
  const handleResize = () => {
    setWidth(node.current.clientWidth);
    gotoPosition(position);
  }

  const gotoPosition = (newPosition) => {
    if (typeof(newPosition) === 'undefined') {
      const positionCandidate = position + 1;
      newPosition = positionCandidate < content.length
        ? positionCandidate
        : 0
    }

    const amountToScroll = width * (newPosition - position);      
    smoothScroll(node, amountToScroll, 400);
    setPosition(newPosition);
  }
  

  return (
    <XCarouselWrapper>
      <XCarouselContainer ref={node}>
        {content.length > 1 && (
          <XCarouselPager>
            {content.map((_, index) => (
              <XCarouselPagerItem
                key={index}
                active={index === position}
                onClick={() => gotoPosition(index)}
              />
            ))}
          </XCarouselPager>
        )}

        {content.map((item, index) => (
          <XCarouselItem key={index}>
            <div className='carousel-content'>
              <div className='left'>
                <Typography className='carousel-text' size='L'>
                  {item.preTitle}
                </Typography>
                <Typography className='carousel-text' size='XL' bold>
                  {item.title}
                </Typography>
                <Typography className='carousel-text' color='text'>
                  {item.subTitle}
                </Typography>
                <Button href={item.href}>
                  {item.buttonTitle}
                </Button>
              </div>

              <div className='right'>
                <img src={process.env.PUBLIC_URL + item.imagePath} />
              </div>
            </div>
          </XCarouselItem>
        ))}
      </XCarouselContainer>
    </XCarouselWrapper>
  );
}

export default Carousel;
