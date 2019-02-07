import { createStore } from 'redux';

const initialState = {
  userName: '',
  tweets: []
}

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case 'USER_LOGIN':
      return Object.assign({}, state, {
        userName: payload.userName,
      });
    case 'USER_LOGOUT':
      return Object.assign({}, state, {
        userName: '',
      });
    case 'NEW_TWEET':
      const { tweet } = payload;
      return Object.assign({}, state, {
        tweets: [tweet, ...state.tweets]
      });
    case 'LIKE_TWEET':
      return Object.assign({}, state, {
        tweets: state.tweets.map(t => {
          if (t._id === payload.tweet._id) {
            return payload.tweet;
          }

          return t;
        })
      });
    case 'SET_TWEETS':
      const { tweets } = payload;
      return Object.assign({}, state, {
        tweets
      });
    default:
      return state;
  }
}

export const store = createStore(reducer);

export function actionUserLogin(userName) {
  return {
    type: 'USER_LOGIN',
    payload: {
      userName,
    }
  }
}

export function actionUserLogout(userName) {
  return {
    type: 'USER_LOGOUT'
  }
}

export function actionNewTweet(tweet) {
  return {
    type: 'NEW_TWEET',
    payload: {
      tweet,
    }
  }
}

export function actionLikeTweet(tweet) {
  return {
    type: 'LIKE_TWEET',
    payload: {
      tweet
    }
  }
}

export function actionSetTweets(tweets) {
  return {
    type: 'SET_TWEETS',
    payload: {
      tweets
    }
  }
}