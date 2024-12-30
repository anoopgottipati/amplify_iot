import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-config';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

// Main App component
function App({ signOut, user }) {
  const email = user.attributes?.email;
  return (
    <>
      <h1>Hello, {email}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

// Wrap your App component with withAuthenticator (using the default sign-up fields)
// Here we are not passing any custom fields, so it will use the default fields (Username, Email, Password)
export default withAuthenticator(App);
