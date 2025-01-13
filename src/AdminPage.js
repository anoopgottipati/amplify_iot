import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
    const [deviceName, setDeviceName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    // Add Device
    const addDevice = async () => {
    try {
        const response = await fetch('https://api.iotlink.click/device', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceName }),
        });
        const data = await response.json();
        setMessage(`Device added: ${JSON.stringify(data)}`);
        setDeviceName('');
        } catch (error) {
        setMessage(`Error adding device: ${error.message}`);
        }
    };

    // Delete Device
    const deleteDevice = async () => {
        try {
        const response = await fetch(`https://api.iotlink.click/device/${deviceId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        setMessage(`Device deleted: ${JSON.stringify(data)}`);
        setDeviceId('');
        } catch (error) {
        setMessage(`Error deleting device: ${error.message}`);
        }
    };

    // Add User to Device
    const addUserToDevice = async () => {
    try {
        const response = await fetch(`https://api.iotlink.click/device/${deviceId}/user`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        const data = await response.json();
        setMessage(`User added to device: ${JSON.stringify(data)}`);
        setDeviceId('');
        setUserId('');
        } catch (error) {
        setMessage(`Error adding user to device: ${error.message}`);
        }
    };

    // Delete User from Device
    const deleteUserFromDevice = async () => {
        try {
        const response = await fetch(`https://api.iotlink.click/device/${deviceId}/user/${userId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        setMessage(`User deleted from device: ${JSON.stringify(data)}`);
        setDeviceId('');
        setUserId('');
        } catch (error) {
        setMessage(`Error deleting user from device: ${error.message}`);
        }
    };

    return (
        <div className="admin-container">
        <h1 className="admin-heading">Admin Page</h1>

        {/* Add Device Form */}
        <div className="admin-form">
            <h2>Add Device</h2>
            <input
            type="text"
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            />
            <button onClick={addDevice}>Add Device</button>
        </div>

        {/* Delete Device Form */}
        <div className="admin-form">
            <h2>Delete Device</h2>
            <input
            type="text"
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            />
            <button onClick={deleteDevice}>Delete Device</button>
        </div>

        {/* Add User to Device Form */}
        <div className="admin-form">
            <h2>Add User to Device</h2>
            <input
            type="text"
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            />
            <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={addUserToDevice}>Add User to Device</button>
        </div>

        {/* Delete User from Device Form */}
        <div className="admin-form">
            <h2>Delete User from Device</h2>
            <input
            type="text"
            placeholder="Device ID"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            />
            <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={deleteUserFromDevice}>Delete User from Device</button>
        </div>

        {/* Message Display */}
        {message && <p className="admin-message">{message}</p>}
        </div>
    );
};

export default Admin;