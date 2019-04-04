import React from 'react';
import styled from 'styled-components';

import Typography from 'components/Typography';

const XStatusItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: 20px;
  :first-child {
    margin-left: 0;
  }

  .indicator {
    background-color: ${props => 
      props.healthy 
        ? props.theme.success 
        : props.theme.warning
    };
    width: 7px;
    height: 22px;
    border-radius: 5px;
  }

  .text {
    display: flex;
    flex-direction: column;
    padding-left: 5px;
  }
`;

const StatusItem = ({ name, healthy }) => {
  return (
    <XStatusItem healthy={healthy}>
      <div className='indicator' />
      <div className='text'>
        <Typography color='text' size='S'>{ name }</Typography>
        <Typography color='mediumGray' size='XS'>
          { healthy ? 'Healthy' : 'Unhealthy' }
        </Typography>
      </div>
    </XStatusItem>
  );
}

const XStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Status = () => {
  return (
    <XStatus>
      <Typography color='text'>Ari Status</Typography>
      <StatusItem name='Childchain' healthy={true} />
      <StatusItem name='Watcher' healthy={false} />
    </XStatus>
  );
}

export default Status;
