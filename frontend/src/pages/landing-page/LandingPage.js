import React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Bookmark from 'components/Bookmark';

const carouselContent = [
  {
    preTitle: 'OmiseGO Developer Portal',
    title: 'Build Scalable Decentralized\nPayment Apps',
    subTitle: 'Leverage Plasma architecture to build a L2 Application with\nhigh throughputs and strong safety gaurantees',
    buttonTitle: 'Get Started',
    href: ''
  },
  // {
  //   preTitle: 'OmiseGO Developer Portal',
  //   title: 'Build Scalable Payment dApps',
  //   subTitle: 'Plug into the OMG network to scale your decentralized\napplications while rooting',
  //   buttonTitle: 'Get Started',
  //   href: ''
  // },
  // {
  //   preTitle: 'OmiseGO Developer Portal',
  //   title: 'Build High Throughput\nPayment dApps',
  //   subTitle: 'Integrate your decentralized application with the OMG network to\nachieve high throughput and and lower fees while maintaining strong\nsecurity of funds',
  //   buttonTitle: 'Get Started',
  //   href: ''
  // },
];

const XLayout = styled.div`
  max-width: ${props => props.theme.contentWidth};
  padding: 4rem 1.5rem;
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

    @media ${props => props.theme.mobileBreak} {
      flex-direction: column;

      > div {
        margin: 0 0 1rem 0;
      }
    }
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
  margin-bottom: 1.5rem;

  span {
    transform: translateY(-1px);
  }
`;

const XCardImage = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  margin-bottom: 1.5rem;
`;

const XCardText = styled.div`
  padding-bottom: 1rem;
`;

const XBookmarks = styled.div`
  padding: 4rem 0;
  display: flex;
  flex-direction: row;

  @media ${props => props.theme.mobileBreak} {
    flex-direction: column;
  }

  .bookmark-column {
    flex: 1 1 50%;
    :last-child {
      margin-left: 6rem;

      @media ${props => props.theme.mobileBreak} {
        margin-left: 0;
      }
    }

    .bookmark-intro {
      height: 90px;
    }
  }
`;

const XCTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem 0;

  @media ${props => props.theme.mobileBreak} {
    align-items: center;
  }

  span {
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 1.5rem;

    :last-child {
      padding-bottom: 0;
    }
  }
`;

const LandingPage = () => {
  return (
    <Page>
      <Carousel content={carouselContent} />
      <XLayout>
        <XCards>
          <Typography bold size='L'>
            Getting Started
          </Typography>

          <div className='cards'>
            <Card>
              <XCardImage src='' alt=''/>
              <XCardNumber><span>1</span></XCardNumber>
              <XCardText>
                <Typography bold>Learn MoreVP Architecture</Typography>
              </XCardText>
              <Typography color='text'>Understand MoreVP Plasma Architecture and how it works under the hood</Typography>
            </Card>

            <Card>
              <XCardImage src='' alt=''/>
              <XCardNumber><span>2</span></XCardNumber>
              <XCardText>
                <Typography bold>{`Get to know\nthe Plasma Interface`}</Typography>
              </XCardText>
              <Typography color='text'>Making interactions with the OMG network's APIs from the browser</Typography>
            </Card>

            <Card>
              <XCardImage src='' alt=''/>
              <XCardNumber><span>3</span></XCardNumber>
              <XCardText>
                <Typography bold>Making sense of UTXOs</Typography>
              </XCardText>
              <Typography color='text'>Start making more complex Plasma transactions from your terminal</Typography>
            </Card>
          </div>
        </XCards>

        <Divider />

        <XBookmarks>
          <div className='bookmark-column'>
            <div className='bookmark-intro'>
              <Typography bold size='L'>
                APIs
              </Typography>
              <Typography color='text'>
                Explore and interact with OMG network's APIs
              </Typography>
            </div>
            <Bookmark
              image='#'
              title="Watcher's Informational API"
              subTitle={'API for general Plasma\ninteractions ie, querying\nbalance, making transactions'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image='#'
              title="Watcher's Security Critical API"
              subTitle={'API for Plasma exits ie, getting\nexit data, challenging exits'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image='#'
              title="Child-chain API"
              subTitle={'API for Child-chain ie, getting\nblock data (useful for running\nyour own watcher)'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
          </div>

          <div className='bookmark-column'>
            <div className='bookmark-intro'>
              <Typography bold size='L'>
                Documentation
              </Typography>
              <Typography color='text'>
                Read the docs for our developers resources
              </Typography>
            </div>
            <Bookmark
              image='#'
              title="OMG Network"
              subTitle={'Documentation for OMG\nnetwork'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image='#'
              title="OMG-JS"
              subTitle={'Documentation for JavaScript\nClient Library'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image='#'
              title="Plasma-cli"
              subTitle={'Documentation for Golang\nCommand-line Interface'}
              action={{
                href: '#',
                text: 'Learn more'
              }}
            />
          </div>
        </XBookmarks>

        <XCTA>
          <span>
            <Typography center bold size='XL'>
              Join the OmiseGO Developers Program
            </Typography>
          </span>
          <span>
            <Typography center color='text'>
              {`Be the first to know about all the development updates and get the chance to\ntry out the latest features, tools, and libraries, plus the chance\nto talk to the OmiseGO Product and Engineering team.`}
            </Typography>
          </span>
          <span>
            <Button href="">
              Apply Now
            </Button>
          </span>
        </XCTA>
      </XLayout>
    </Page>
  );
}

export default LandingPage;
