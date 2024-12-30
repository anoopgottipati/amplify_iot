import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-config';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

// Custom sign up fields
const customSignUpFields = [
  {
    label: 'Enter your email',
    key: 'email',
    required: true,
    displayOrder: 1,
    type: 'email',
  },
  {
    label: 'Enter your password',
    key: 'password',
    required: true,
    displayOrder: 2,
    type: 'password',
  },
  {
    label: 'Confirm your password',
    key: 'confirmPassword',
    required: true,
    displayOrder: 3,
    type: 'password',
  },
  {
    label: 'Preferred Username',
    key: 'username',
    required: true,
    displayOrder: 4,
    type: 'text',
  },
];

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

// Wrap your App component with withAuthenticator and pass custom sign up fields
export default withAuthenticator(App, {
  signUpFields: customSignUpFields
});

/*


function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);

*/