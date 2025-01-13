import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DeviceDetails.css'

const DeviceDetails = () => {
    const { id } = useParams(); // Get device ID from the URL
    const [device, setDevice] = useState(null);

    useEffect(() => {
        // Fetch the device details by ID
        fetch(`https://api.iotlink.click/device/${id}`) // Replace domain API endpoint
            .then(response => response.json())
            .then(data => setDevice(data))
            .catch(error => console.error('Error fetching device details:', error));
    }, [id]);

    if (!device) {
        return <p>Loading device details...</p>;
    }

/*
    return (
        <div>
            <h1>Device Details</h1>
            <p><strong>Device Name:</strong> {device.deviceName}</p>
            <p><strong>Location:</strong> {device.location}</p>
            <p><strong>Device Type:</strong> {device.deviceType}</p>
            <p><strong>Room Temperature:</strong> {device.roomTemperature}°C</p>
            <p><strong>Humidity:</strong> {device.humidity}%</p>
            <p><strong>Light Status:</strong> {device.lightStatus}</p>
        </div>
    );
*/

    return (
        <div className="device-details-container">
            <h1 className="device-details-heading">Device Details</h1>
            <p className="device-details-info">
                <strong>Device Name:</strong> {device.deviceName}
            </p>
            <p className="device-details-info">
                <strong>Location:</strong> {device.location}
            </p>
            <p className="device-details-info">
                <strong>Device Type:</strong> {device.deviceType}
            </p>
            <p className="device-details-info">
                <strong>Room Temperature:</strong> {device.roomTemperature}°C
            </p>
            <p className="device-details-info">
                <strong>Humidity:</strong> {device.humidity}%
            </p>
            <p className="device-details-info">
                <strong>Light Status:</strong> {device.lightStatus}
            </p>
        </div>
    );

};

export default DeviceDetails;
