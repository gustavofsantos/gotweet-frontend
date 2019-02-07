import React from 'react';

import like from '../like.svg';
import './Tweet.css';
import api from '../services/api';

function Tweet(props) {
  const { _id, likes, author, content } = props.tweet;

  async function handleLike() {
    await api.post(`likes/${_id}`);
  }

  return (
    <li className="tweet">
      <strong>{content}</strong>
      <p>{author}</p>
      <button type="button" onClick={handleLike}>
        <img src={like} alt="Like" />
        {likes}
      </button>
    </li>
  );
}

export default Tweet;