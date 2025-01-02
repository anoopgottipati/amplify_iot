import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-config';
import '@aws-amplify/ui-react/styles.css';
import AppRoutes from './Routes';
import { useNavigate } from 'react-router-dom';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <AppRoutes signOut={signOut} user={user} />
  );
}

export default withAuthenticator(App);



/*

// Main App component
function App({ signOut, user }) {
  const email = user.attributes?.email;
  const emailUsername = email?.split('@')[0];
  return (
    <>
      <h1>Hello, {emailUsername}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

*/