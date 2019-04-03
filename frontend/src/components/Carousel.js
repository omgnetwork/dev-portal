import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { smoothScroll } from 'utils/scroll';

import Button from 'components/Button';
import Typography from 'components/Typography';

const carouselContent = [
  {
    preTitle: 'OmiseGO Developer Portal',
    title: 'Build Scalable Decentralized\nPayment Apps',
    subTitle: 'Leverage Plasma architecture to build a L2 Application with\nhigh throughputs and strong safety gaurantees',
    buttonTitle: 'Get Started',
    href: ''
  },
  {
    preTitle: 'OmiseGO Developer Portal',
    title: 'Build Scalable Payment dApps',
    subTitle: 'Plug into the OMG network to scale your decentralized\napplications while rooting',
    buttonTitle: 'Get Started',
    href: ''
  },
  {
    preTitle: 'OmiseGO Developer Portal',
    title: 'Build High Throughput\nPayment dApps',
    subTitle: 'Integrate your decentralized application with the OMG network to\nachieve high throughput and and lower fees while maintaining strong\nsecurity of funds',
    buttonTitle: 'Get Started',
    href: ''
  },
];

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

const Carousel = () => {
  const node = useRef();
  const [position, setPosition] = useState(0);
  const [width, setWidth] = useState();
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const handleResize = () => {
    setWidth(node.current.clientWidth);
    gotoPosition(position);
  }

  const gotoPosition = (newPosition) => {
    const amountToScroll = width * (newPosition - position);
    smoothScroll(node, amountToScroll, 400);
    setPosition(newPosition);
  }
  

  return (
    <XCarouselWrapper>
      <XCarouselContainer ref={node}>
        <XCarouselPager>
          {carouselContent.map((_, index) => (
            <XCarouselPagerItem
              key={index}
              active={index === position}
              onClick={() => gotoPosition(index)}
            />
          ))}
        </XCarouselPager>

        {carouselContent.map((item, index) => (
          <XCarouselItem key={index}>
            <div className='carousel-content'>
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
          </XCarouselItem>
        ))}
      </XCarouselContainer>
    </XCarouselWrapper>
  );
}

export default Carousel;
