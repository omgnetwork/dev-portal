import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';
import Typography from 'components/Typography';

const XFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 1.5rem;

  background-color: ${props => props.theme.dark};
  color: ${props => props.theme.background};

  .footer-content {
    max-width: ${props => props.theme.contentWidth};
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;

    @media ${props => props.theme.mobileBreak} {
      flex-direction: column;
    }

    .footer-column {
      flex: 1 1 0;
      padding-right: 0.5rem;

      @media ${props => props.theme.mobileBreak} {
        padding: 0 0 2rem 0;
      }

      :last-child {
        padding-right: 0;
      }

      .footer-item {
        display: flex;
        padding-bottom: 1rem;

        :last-child {
          padding-bottom: 0;
        }

        .social {
          width: 30px;
          height: 30px;
          margin-right: 0.7rem;
          color: ${props => props.theme.footerText};
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <XFooter>
      <div className="footer-content">
        <div className='footer-column'>
          <span className='footer-item'>
            <Typography color='background' bold size='S'>
              Getting Started
            </Typography>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/dev-portal/blob/master/guides/morevp_eli5.md'>
              <Typography color='footerText' size='S'>
                {`Learn MoreVP\nArchitecture`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/dev-portal/blob/master/Guides/plasma_interface_from_browser.md'>
              <Typography color='footerText' size='S'>
                {`Get to know\nthe Plasma Interface`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/dev-portal/blob/master/Guides/plasma_utxo_from_terminal.md'>
              <Typography color='footerText' size='S'>
                {`Making sense of UTXOs`}
              </Typography>
            </Link>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-item'>
            <Typography color='background' bold size='S'>
              APIs
            </Typography>
          </span>
          <span className='footer-item'>
            <Link href='https://omisego.github.io/elixir-omg/docs-ui/?url=informational_api_swagger.json'>
              <Typography color='footerText' size='S'>
                {`Watcher's\nInformational API`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://omisego.github.io/elixir-omg/docs-ui/?url=watcher_api_swagger.json'>
              <Typography color='footerText' size='S'>
                {`Watcher's\nSecurity Critical API`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://omisego.github.io/elixir-omg/docs-ui/?url=operator_api_swagger.json'>
              <Typography color='footerText' size='S'>
                {`Child-chain API`}
              </Typography>
            </Link>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-item'>
            <Typography color='background' bold size='S'>
              Documentations
            </Typography>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/elixir-omg/blob/master/README.md'>
              <Typography color='footerText' size='S'>
                {`OMG Network`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/omg-js/blob/master/README.md'>
              <Typography color='footerText' size='S'>
                {`OMG-JS`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://github.com/omisego/plasma-cli/blob/master/README.md'>
              <Typography color='footerText' size='S'>
                {`Plasma-cli`}
              </Typography>
            </Link>
          </span>
        </div>

        <div className='footer-column'>
          <span className='footer-item'>
            <Typography color='background' bold size='S'>
              Links
            </Typography>
          </span>
          <span className='footer-item'>
            <Link href='http://quest.omg.network'>
              <Typography color='footerText' size='S'>
                {`Blockexplorer`}
              </Typography>
            </Link>
          </span>
          <span className='footer-item'>
            <Link href='https://omisego.network/'>
              <Typography color='footerText' size='S'>
                {`OmiseGO.network`}
              </Typography>
            </Link>
          </span>
        </div>

        <div className='footer-column' style={{ position: 'relative' }}>
          <span className='footer-item'>
            <Typography color='background' bold size='S'>
              Follow us
            </Typography>
          </span>

          <span className='footer-item'>
            <Link href='https://reddit.com/r/omise_go/'>
              <img src={process.env.PUBLIC_URL + '/img/reddit.svg'} alt='reddit' className='social' />
            </Link>
            <Link href='https://twitter.com/omise_go'>
              <img src={process.env.PUBLIC_URL + '/img/twitter.svg'} alt='twitter' className='social' />
            </Link>
            <Link href='https://www.facebook.com/OmiseGO/'>
              <img src={process.env.PUBLIC_URL + '/img/facebook.svg'} alt='facebook' className='social' />
            </Link>
          </span>

          <span className='footer-item' style={{ position: 'absolute', bottom: 0 }}>
            <Typography color='footerText' size='XS'>
              {`© 2019 Omise.\nAll rights Reserved`}
            </Typography>
          </span>
        </div>
      </div>
    </XFooter>
  );
}

export default Footer;
