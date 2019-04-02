import React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Divider from 'components/Divider';

const XLayout = styled.div`
  max-width: ${props => props.theme.contentWidth};
  padding: 4rem 0;
  margin: 0 auto;
`;

const XCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .cards {
    display: flex;
    flex-direction: row;
    padding: 2rem 0 4rem 0;
  }
`;

const XCardNumber = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  color: ${props => props.theme.background};
  border-radius: 100%;
  background-color: ${props => props.theme.dark};

  span {
    transform: translateY(-1px);
  }
`;

const LandingPage = () => {
  return (
    <Page>
      <Carousel />
      
      <XLayout>
        <XCards>
          <Typography bold size='L'>
            Getting Started
          </Typography>

          <div className='cards'>
            <Card>
              <img src='' alt=''/>
              <XCardNumber><span>1</span></XCardNumber>
              <Typography bold>Learn MoreVP Architecture</Typography>
              <Typography color='text'>Understand MoreVP Plasma Architecture and how it works under the hood</Typography>
            </Card>

            <Card>
              <img src='' alt=''/>
              <XCardNumber><span>2</span></XCardNumber>
              <Typography bold>{`Get to know\nthe Plasma Interface`}</Typography>
              <Typography color='text'>Making interactions with the OMG network's APIs from the browser</Typography>
            </Card>

            <Card>
              <img src='' alt=''/>
              <XCardNumber><span>3</span></XCardNumber>
              <Typography bold>Making sense of UTXOs</Typography>
              <Typography color='text'>Start making more complex Plasma transactions from your terminal</Typography>
            </Card>
          </div>
        </XCards>

        <Divider />
      </XLayout>
    </Page>
  );
}

export default LandingPage;
