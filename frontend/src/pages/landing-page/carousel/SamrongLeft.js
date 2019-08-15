import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Typography from 'components/Typography';

const XSamrong = styled.div`
  padding-top: 40px;
`;

const SamrongLeft = () => {
  return (
    <XSamrong>
      <Typography className='carousel-text' size='XL' color='white' bold>
        {'Next Station Samrong:\nOmiseGO Network v0.2'}
      </Typography>
      <Typography className='carousel-text' color='white'>
        {'Ready to upgrade from Ari to Samrong?'}
      </Typography>
      <Button href='https://github.com/omisego/plasma-upgrade-scripts/blob/master/Readme.md'>
        Upgrade Now
      </Button>
    </XSamrong>
  )
}

export default SamrongLeft;
