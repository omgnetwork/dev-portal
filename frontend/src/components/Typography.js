import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const XTypography = styled.div`
  font-size: ${props => props.size};
  font-weight: ${props => props.bold ? 'bold' : 'inherit'};
  text-align: ${props => props.center ? 'center' : 'inherit'};
  white-space: pre-line;
  color: ${props => props.color
    ? props.theme[props.color]
    : props.theme.dark
  };

  @media ${props => props.theme.mobileBreak} {
    white-space: initial;
  }
`;

const Typography = ({
  children,
  bold,
  size,
  color,
  className,
  center
}) => {
  const getSize = (_size = 'medium') => {
    switch(_size) {
      case 'S':
        return '0.8rem';
      case 'L':
        return '1.5rem';
      case 'XL':
        return '2rem';
      default:
        return '1rem';
    }
  }

  return (
    <XTypography
      bold={bold}
      size={getSize(size)}
      color={color}
      className={className}
      center={center}
    >
      {children}
    </XTypography>
  );
}

Typography.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  center: PropTypes.bool,
  size: PropTypes.oneOf(['S', 'M', 'L', 'XL'])
}

export default Typography;
