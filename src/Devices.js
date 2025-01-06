import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Devices = () => {
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all devices
        fetch('https://api.iotlink.click/device', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }) // Replace with domain API endpoint
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error('Error fetching devices:', error));
    }, []);

    const goToDeviceDetails = (id) => {
        navigate(`/devices/${id}`);
    };

    if (devices.length === 0) {
        return <p>Loading devices...</p>;
    }

    return (
        <div>
            <h1>Devices</h1>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
                        <button onClick={() => goToDeviceDetails(device.id)}>
                            {device.deviceName}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Devices;
