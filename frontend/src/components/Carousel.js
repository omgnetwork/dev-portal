import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { smoothScroll } from 'utils/scroll';

const XCarouselWrapper = styled.div`
  position: relative;
`;

const XCarouselContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

const XCarouselItem = styled.div`
  position: relative;
  width: 100%;
  /* height: 450px; */
  box-sizing: border-box;
  display: flex;
  flex: 1 0 100%;
  justify-content: center;
  padding: 6rem 1.5rem;
  background-size: cover;
  background-image: ${props => props.backgroundPath
    ? `url(${props.backgroundPath})`
    : 'linear-gradient(#FCFCFD, #F0F2F5)'};

  @media (max-width: 1000px) {
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
    width: ${props => props.theme.pageWidth};
    max-width: ${props => props.theme.pageWidth};
    .left {
      width: 50%;
      @media ${props => props.theme.tabletBreak} {
        width: 100%;
      }
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 50%;
    }
  }

  .carousel-content .carousel-text {
    padding-bottom: 1.5rem;
  }
`;

const XCarouselPager = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  z-index: 2;
`;

const XCarouselPagerItem = styled.div`
  background-color: ${props => 
    props.active
      ? props.theme.primary
      : props.theme.mediumGray
  };
  width: 35px;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
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
    const carouselInterval = setInterval(gotoPosition, 10000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(carouselInterval);
    }
  });
  
  const handleResize = () => {
    const currentWidth = node.current.clientWidth;
    setWidth(currentWidth);

    const amountToScroll = currentWidth * position;
    smoothScroll(node, amountToScroll, 50);
    setPosition(position);
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
          <XCarouselItem
            key={index}
            backgroundPath={item.backgroundPath}
            darkTheme={!!item.darkTheme}
          >
            <div className='carousel-content'>
              <div className='left'>{item.left}</div>
              <div className='right'>{item.right}</div>
            </div>
          </XCarouselItem>
        ))}
      </XCarouselContainer>
    </XCarouselWrapper>
  );
}

export default Carousel;
