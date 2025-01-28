import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-config';
import '@aws-amplify/ui-react/styles.css';
import AppRoutes from './Routes';
import { useNavigate } from 'react-router-dom';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const session = await Auth.currentSession();
                const idToken = session.getIdToken();
                const groups = idToken.payload['cognito:groups'];

                if (groups && groups.includes('admin')) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error checking admin group:', error);
            }
        };

        checkAdmin();

        if (user && window.location.pathname === '/') {
            navigate('/home');
        }
    }, [user, navigate]);

    return <AppRoutes signOut={signOut} user={user} isAdmin={isAdmin} />;
}

export default withAuthenticator(App);
