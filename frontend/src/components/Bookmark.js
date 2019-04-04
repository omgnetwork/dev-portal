import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from 'components/Link';
import Typography from 'components/Typography';

const XBookmark = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
  min-height: 8rem;

  @media ${props => props.theme.mobileBreak} {
    min-height: initial;
  }

  .image {
    height: 60px;
    margin-right: 1rem;
    display: inline-block;
  }

  .content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    span {
      padding-bottom: 0.5rem;
    }

    .action {
      color: ${props => props.theme.primary}
    }
  }
`;

const Bookmark = ({ image, title, subTitle, action }) => {
  return (
    <Link href={action.href}>
      <XBookmark>
        <img className='image' src={image} alt='bookmark'/>
        <div className='content'>
          <span>
            <Typography bold>
              {title}
            </Typography>
          </span>

          <span>
            <Typography color='text'>
              {subTitle}
            </Typography>
          </span>

          <span className='action'>
            {action.text}
          </span>
        </div>
      </XBookmark>
    </Link>
  );
}

Bookmark.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  action: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string
  })
}

export default Bookmark;
