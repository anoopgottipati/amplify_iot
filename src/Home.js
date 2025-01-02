import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ signOut, user }) => {
    const email = user.attributes?.email;
    const emailUsername = email?.split('@')[0]; // Extract username from email

    const navigate = useNavigate();
    const goToDevices = () => {
        console.log("Navigating to devices");
        navigate('/devices');
    };



    return (
        <div>
            <h1>Hello, {emailUsername}</h1>
            <button onClick={signOut}>Sign out</button>
            <button onClick={goToDevices}>Show Devices</button>
        </div>
    );
};

export default Home;
