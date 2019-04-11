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

const carouselContent = [
  {
    preTitle: 'OmiseGO Developer Portal',
    title: 'Build Scalable Decentralized\nPayment Apps',
    subTitle: 'Leverage Plasma architecture to build a layer two application with\nhigh throughput and strong safety guarantees',
    buttonTitle: 'Get Started',
    imagePath: '/img/00-hero.png',
    href: 'https://github.com/omisego/dev-portal/tree/master/guides/get_started.md'
  },
  // {
  //   preTitle: 'OmiseGO Developer Portal',
  //   title: 'Build Scalable Payment dApps',
  //   subTitle: 'Plug into the OMG network to scale your decentralized\napplications while rooting',
  //   buttonTitle: 'Get Started',
  //   imagePath: '00-hero2.png',
  //   href: ''
  // },
  // {
  //   preTitle: 'OmiseGO Developer Portal',
  //   title: 'Build High Throughput\nPayment dApps',
  //   subTitle: 'Integrate your decentralized application with the OMG network to\nachieve high throughput and and lower fees while maintaining strong\nsecurity of funds',
  //   buttonTitle: 'Get Started',
  //   imagePath: '00-hero2.png',
  //   href: ''
  // },
];

const XLayout = styled.div`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 1.5rem;
  margin: 0 auto;
`;

const XCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;

  .cards {
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
  padding-bottom: 80px;

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
                <Typography color='text'>Making interactions with the OMG Network APIs from the browser</Typography>
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

        <Divider />

        <XBookmarks>
          <div className='bookmark-column'>
            <div className='bookmark-intro'>
              <Typography bold size='L' style={{ paddingBottom: '5px' }}>
                APIs
              </Typography>
              <Typography color='text'>
                Explore and interact with OMG Network APIs
              </Typography>
            </div>
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/04-watchersinfoAPI.png'}
              title="Watcher Informational API"
              subTitle={'API for common interactions:\n balance query, making transactions'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.1/informational_api_specs.yaml',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/05-watcherssecurityAPI.png'}
              title="Watcher Security Critical API"
              subTitle={'Plasma exit operations API'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.1/security_critical_api_specs.yaml',
                text: 'Learn more'
              }}
            />
            <Bookmark
              image={process.env.PUBLIC_URL + '/img/06-childchain.png'}
              title="Childchain API"
              subTitle={'Get block data to implement your own watcher'}
              action={{
                href: 'https://developer.omisego.co/elixir-omg/docs-ui/?url=0.1/operator_api_swagger.json',
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
              title="OMG Network"
              subTitle={'Documentation for OMG\nnetwork'}
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

        <XCTA>
          <span>
            <Typography center bold size='XL'>
              Join the OmiseGO Developer Program
            </Typography>
          </span>
          <span>
            <Typography center color='text'>
              {`Be the first to know about all the development updates and get the chance to\ntry out the latest features, tools, and libraries, plus the chance\nto talk to the OmiseGO Product and Engineering teams.`}
            </Typography>
          </span>
          <span>
            <Button href="https://omisego-odp.typeform.com/to/T8dDjF">
              Sign Up Now
            </Button>
          </span>
        </XCTA>
      </XLayout>
    </Page>
  );
}

export default LandingPage;
