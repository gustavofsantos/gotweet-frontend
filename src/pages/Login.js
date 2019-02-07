import React, { useState } from 'react';
import { connect } from 'react-redux';

import './Login.css';
import twitterLogo from '../twitter.svg';
import { actionUserLogin } from '../store';

function Login(props) {
  const [ userName, setUserName ] = useState('');

  function handleUserNameChange(ev) {
    setUserName(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!userName.length) return;

    props.userLogin(userName);
    props.history.push('/timeline');
  }

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="Twitter logo" />

      <form onSubmit={handleSubmit}>
        <input placeholder="Nome de usuário" value={userName} onChange={handleUserNameChange} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    userLogin: (userName) => dispatch(actionUserLogin(userName))
  }
}

export default connect(null, mapDispatch)(Login);
