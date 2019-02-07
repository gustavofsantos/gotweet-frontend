import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import socket from 'socket.io-client';
import api from '../services/api';
import twitterLogo from '../twitter.svg';
import './Timeline.css';
import Tweet from '../components/Tweet';
import { actionNewTweet, actionSetTweets, actionLikeTweet } from '../store';

function TimeLine(props) {

  const [ tweetText, setTweetText ] = useState('');

  useEffect(() => {
    if (!props.userName) {
      props.history.push('/');
    } else {
      api.get('tweets')
        .then(res => {
          const { data } = res;
          props.setTweets(data);
          subscribeEvents();
        })
        .catch(console.error);
    }
  }, []);


  function handleTweetTextChange(ev) {
    setTweetText(ev.target.value);
  }

  function handleKeyDown(ev) {
    if (ev.keyCode === 13) {
      createNewTweet();
    }
  }

  async function createNewTweet() {
    const { userName } = props;

    const payload = {
      content: tweetText,
      author: userName
    }

    await api.post('tweets', payload);

    setTweetText('');
  }

  function subscribeEvents() {
    const io = socket('http://localhost:3000');

    io.on('new-tweet', tweet => {
      props.newTweet(tweet);
    });

    io.on('like-tweet', tweet => {
      props.likeTweet(tweet);
    })
  }

  return (
    <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="goweek-twitter" />

      <form>
        <textarea
          onChange={handleTweetTextChange}
          onKeyDown={handleKeyDown}
          value={tweetText}
          placeholder="Digite o que você quiser"
        />
      </form>

      <ul className="tweet-list">
        {
          props.tweets.map((tweet, index) => (
            <Tweet key={index} tweet={tweet} />
          ))
        }
      </ul>
    </div>
  );
} 

const mapState = state => {
  return {
    userName: state.userName,
    tweets: state.tweets
  }
}

const mapDispatch = dispatch => {
  return {
    newTweet: tweet => dispatch(actionNewTweet(tweet)),
    likeTweet: tweet => dispatch(actionLikeTweet(tweet)),
    setTweets: tweets => dispatch(actionSetTweets(tweets)),
  }
}

export default connect(mapState, mapDispatch)(TimeLine);