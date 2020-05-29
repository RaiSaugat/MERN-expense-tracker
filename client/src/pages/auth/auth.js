import React, { useState, useContext } from 'react';

import './auth.scss';

import { useHttpClient } from 'hooks/http-hook';
import { GlobalContext } from 'context/GlobalState';
import { validEmail } from 'utils/regexValidator';

const AuthPage = () => {
  const { login, handleLoading, loading } = useContext(GlobalContext);

  const { error, sendRequest } = useHttpClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailError, setEmailError] = useState();

  let disabled;
  if (isLoginMode) {
    disabled = !email || !password;
  } else {
    disabled = !email || !password || !name;
  }

  const switchModeHandler = (event) => {
    event.preventDefault();
    setName('');
    setEmail('');
    setPassword('');
    setEmailError('');
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email && !name && !password) {
      return null;
    }
    if (isLoginMode) {
      try {
        handleLoading(true);
        const responseData = await sendRequest(
          `api/v1/users/login`,
          'POST',
          {
            email,
            password,
          },
          {
            'Content-Type': 'application/json',
          }
        );

        login(responseData);
        handleLoading(false);
      } catch (err) {
        handleLoading(false);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `api/v1/users/signup`,
          'POST',
          {
            name,
            email,
            password,
          },
          {
            'Content-Type': 'application/json',
          }
        );
        login(responseData);
      } catch (error) {
        handleLoading(false);
      }
    }
  };

  return (
    <div className="authentication">
      <div className={`form__wrapper ${isLoginMode ? 'login' : 'signup'}`}>
        <div className="trigger">
          <button
            className="button  card__button card__button--signup"
            onClick={(event) => {
              switchModeHandler(event);
              setIsLoginMode(false);
            }}
          >
            <span>Sign Up</span>
          </button>
          <button
            className="button  card__button card__button--login"
            onClick={(event) => {
              switchModeHandler(event);
              setIsLoginMode(true);
            }}
          >
            <span>Login</span>
          </button>
        </div>
        <div className="card">
          <form className="form" onSubmit={authSubmitHandler}>
            <div className="form__control">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>

            <div
              className={`form__control ${
                emailError ? 'form__control--error' : ''
              }`}
            >
              <input
                placeholder="Email"
                type="text"
                name="email"
                value={email}
                onChange={(event) => {
                  if (event.target.value && !validEmail(event.target.value)) {
                    setEmailError('Please enter valid email address');
                  } else {
                    setEmailError('');
                  }
                  setEmail(event.target.value);
                }}
              />
              {emailError && <p className="form__error">{emailError}</p>}
            </div>

            <div className="form__control">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {loading && <div className="loader">Loading...</div>}
            {error && <div className="server__error">{error}</div>}

            <div className="form__control">
              <button type="submit" className="button" disabled={disabled}>
                <span className="button__signup">Sign Up</span>
                <span className="button__login">Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="form__wrapper">
        <h2>{isLoginMode ? 'Login' : 'Signup'}</h2>
        <form className="form" onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <div className="form__control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
          )}
          <div
            className={`form__control ${
              emailError ? 'form__control--error' : ''
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(event) => {
                if (event.target.value && !validEmail(event.target.value)) {
                  setEmailError('Please enter valid email address');
                } else {
                  setEmailError('');
                }
                setEmail(event.target.value);
              }}
            />
            {emailError && <p className="form__error">{emailError}</p>}
          </div>
          <div className="form__control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="form__control">
            <label htmlFor=""></label>
            <div className="buttons__wrapper">
              <button type="submit" className="button" disabled={disabled}>
                {isLoginMode ? 'Login' : 'Sign up'}
              </button>
              <button className="button switch" onClick={switchModeHandler}>
                Switch to {!isLoginMode ? 'login' : 'sign up'}
              </button>
            </div>
          </div>

          {loading && <p>Loading</p>}
          {error && <p>{error}</p>}
        </form>
      </div> */}
    </div>
  );
};

export default AuthPage;
