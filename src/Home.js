import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ signOut, user }) => {
    const email = user.attributes?.email;
    const emailUsername = email?.split('@')[0]; // Extract username from email

    const navigate = useNavigate();
    const goToDevices = () => {
        console.log("Navigating to devices");
        navigate('/devices');
    };



    return (
        <div className="home-container">
            <div>
                <h1>Hello, {emailUsername}</h1>
                <button className="home-button" onClick={signOut}>Sign out</button>
                <button className="home-button home-button-green" onClick={goToDevices}>Show Devices</button>
            </div>
        </div>
    );




};

export default Home;
