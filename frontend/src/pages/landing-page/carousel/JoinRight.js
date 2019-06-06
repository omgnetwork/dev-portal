import React from 'react';
import styled from 'styled-components';

const XImg = styled.img`
  height: 75%;
  margin-top: 30px;
  margin-left: 80px;
`

const JoinRight = () => {
  return (
    <XImg src={process.env.PUBLIC_URL + '/img/00-hero.png'} alt='hero' />
  )
}

export default JoinRight;
