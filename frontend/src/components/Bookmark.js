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

  .image {
    min-width: 50px;
    max-width: 50px;
    height: 50px;
    margin-right: 1rem;
    display: inline-block;
    border: 1px solid black;
  }

  .content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;

    span {
      padding-bottom: 0.5rem;
    }
  }
`;

const Bookmark = ({ image, title, subTitle, action }) => {
  return (
    <XBookmark>
      <img className='image' href={image} alt='bookmark'/>
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

        <span>
          <Link color='primary' href={action.href}>
            {action.text}
          </Link>
        </span>
      </div>
    </XBookmark>
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
