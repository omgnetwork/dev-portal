import React from 'react';
import styled from 'styled-components';

import Page from 'components/Page';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Bookmark from 'components/Bookmark';
import Link from 'components/Link';

import JoinLeft from './carousel/JoinLeft';
import JoinRight from './carousel/JoinRight';
import SamrongLeft from './carousel/SamrongLeft';
import SamrongRight from './carousel/SamrongRight';

const carouselContent = [
  {
    left: <JoinLeft />,
    right: <JoinRight />
  },
  {
    darkTheme: true,
    backgroundPath: '/img/samrong-background.png',
    left: <SamrongLeft />,
    right: <SamrongRight />
  }
];

const XSection = styled.div`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const XCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 80px 0;
  position: relative;
  background: radial-gradient(100% 400px ellipse at 50% 100%, #F7F8FA, #FFFFFF);

  .cards {
    max-width: ${props => props.theme.contentWidth};
    display: flex;
    flex-direction: row;
    padding-top: 2rem;

    a {
      flex: 1 1 100%;
      :first-child {
        margin-right: 10px;
      }
      :last-child {
        margin-left: 10px;
      }
    }

    @media ${props => props.theme.mobileBreak} {
      flex-direction: column;

      a {
        :first-child {
          margin: 0 0 1rem 0;
        }
        :last-child {
          margin: 1rem 0 0 0;
        }
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
  width: 80px;
  height: 80px;
`;

const XCardText = styled.div`
  padding-bottom: 1rem;
`;

const XBookmarks = styled.div`
  padding: 80px 0;
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
  padding-top: 80px;

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

      <XSection>
        <XCTA>
          <span>
            <Typography center bold size='XL'>
              Build Scalable Decentralized Payment Apps
            </Typography>
          </span>
          <span>
            <Typography center color='text'>
              {`Leverage Plasma architecture to build a L2 Application with\nhigh throughputs and strong safety gaurantees`}
            </Typography>
          </span>
          <span>
            <Button href="https://github.com/omisego/dev-portal/tree/master/guides/get_started.md">
              Get Started Now
            </Button>
          </span>
        </XCTA>
      </XSection>

      <XCards>
        <div className='cards'>
          <Link href="https://github.com/omisego/dev-portal/blob/master/guides/morevp_eli5.md">
            <Card>
              <XCardImage src={process.env.PUBLIC_URL + '/img/01-plasmaarchitecture.png'} alt='morevp'/>
              <XCardNumber><span>1</span></XCardNumber>
              <XCardText>
                <Typography bold>Learn MoreVP Architecture</Typography>
              </XCardText>
              <Typography color='text'>Understand MoreVP Plasma architecture and how it works under the hood</Typography>
            </Card>
          </Link>
          <Link href="https://github.com/omisego/dev-portal/blob/master/guides/plasma_interface_from_browser.md">
            <Card>
              <XCardImage src={process.env.PUBLIC_URL + '/img/02-plasmainterface.png'} alt='plasma'/>
              <XCardNumber><span>2</span></XCardNumber>
              <XCardText>
                <Typography bold>{`Get to know\nthe Plasma Interface`}</Typography>
              </XCardText>
              <Typography color='text'>Making interactions with the OmiseGO Network APIs from the browser</Typography>
            </Card>
          </Link>
          <Link href="https://github.com/omisego/dev-portal/blob/master/guides/plasma_utxo_from_terminal.md">
            <Card>
              <XCardImage src={process.env.PUBLIC_URL + '/img/03-utxo.png'} alt='utxo'/>
              <XCardNumber><span>3</span></XCardNumber>
              <XCardText>
                <Typography bold>Making sense of UTXOs</Typography>
              </XCardText>
              <Typography color='text'>Start making more complex Plasma transactions from your terminal</Typography>
            </Card>
          </Link>
        </div>
      </XCards>

      <XSection>
        <Divider />
      </XSection>

      <XSection>
        <XBookmarks>
          <div className='bookmark-column'>
            <div className='bookmark-intro'>
              <Typography bold size='L' style={{ paddingBottom: '5px' }}>
                APIs
              </Typography>
              <Typography color='text'>
                Explore and interact with OmiseGO Network APIs
              </Typography>
            </div>
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/04-watchersinfoAPI.png'}
              title="Watcher Informational API"
              subTitle={'API for common interactions:\n balance query, making transactions'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/informational_api_specs.yaml',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/05-watcherssecurityAPI.png'}
              title="Watcher Security Critical API"
              subTitle={'Plasma exit operations API'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/security_critical_api_specs.yaml',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/06-childchain.png'}
              title="Childchain API"
              subTitle={'Get block data to implement your own watcher'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.2/operator_api_specs.yaml',
                text: 'Learn more'
              }}
            />
          </div>

          <div className='bookmark-column'>
            <div className='bookmark-intro'>
              <Typography bold size='L' style={{ paddingBottom: '5px' }}>
                Documentation
              </Typography>
              <Typography color='text'>
                Read the docs for developer resources
              </Typography>
            </div>
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/07-omgnetwork.png'}
              title="OmiseGO Network"
              subTitle={'Documentation for OmiseGO\nnetwork'}
              action={{
                href: 'https://github.com/omisego/elixir-omg/blob/master/README.md',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/08-omg-js.png'}
              title="OMG-JS"
              subTitle={'Documentation for JavaScript\nClient Library'}
              action={{
                href: 'https://github.com/omisego/omg-js/blob/master/README.md',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/09-plasma-cli.png'}
              title="Plasma CLI"
              subTitle={'Documentation for Golang\nCommand-line Interface'}
              action={{
                href: 'https://github.com/omisego/plasma-cli/blob/master/README.md',
                text: 'Learn more'
              }}
            />
          </div>
        </XBookmarks>
      </XSection>
    </Page>
  );
}

export default LandingPage;
