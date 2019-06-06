import React from 'react';
import styled from 'styled-components';

const XImg = styled.img`
  height: 80%;
  float: right;
  margin-top: 50px;
  margin-left: 80px;
`

const SamrongRight = () => {
  return (
    <XImg src={process.env.PUBLIC_URL + '/img/samrong-rail.png'} alt='hero' />
  )
}

export default SamrongRight;
