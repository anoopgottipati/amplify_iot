import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Auth } from 'aws-amplify';


const Home = ({ signOut, user }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const emailUsername = user?.attributes?.email?.split('@')[0] || user?.email?.split('@')[0];

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
    }, []);



    const goToDevices = () => {navigate('/devices');};

    const goToAdmin = () => {navigate('/admin');};



    return (
        <div className="home-container">
            <div>
                <h1>Hello, {emailUsername}</h1>
                <button className="home-button" onClick={signOut}>Sign out</button>
                <button className="home-button home-button-green" onClick={goToDevices}>Show Devices</button>
                <button className="home-button home-button-blue" onClick={goToAdmin}>Admin Page</button>
            </div>
        </div>
    );




};

export default Home;
