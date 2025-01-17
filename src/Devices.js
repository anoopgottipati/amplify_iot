import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devices.css';

const Devices = ({ user }) => {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    
    const userId = user?.attributes?.sub; 

    useEffect(() => {
        // Fetch all devices for the logged-in user
        fetch(`https://api.iotlink.click/device?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDevices(data);
                } else {
                    console.error('Unexpected data format', data);
                }
            })
            .catch(error => console.error('Error fetching devices:', error));
    }, [userId]);

    const goToDeviceDetails = (id) => {
        navigate(`/devices/${id}`);
    };

    if (devices.length === 0) {
        return <p>Loading devices...</p>;
    }

    return (
        <div className="devices-container">
            <h1 className="devices-heading">Devices</h1>
            <ul className="devices-list">
                {devices.map(device => (
                    <li key={device.id} className="devices-item">
                        <button
                            className="devices-button"
                            onClick={() => goToDeviceDetails(device.id)}
                        >
                            {device.deviceName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Devices;
