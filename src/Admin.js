import React, { useState } from 'react';
import './Admin.css';
import { Auth } from 'aws-amplify';

const Admin = () => {
    const [deviceName, setDeviceName] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Additional state variables for device details
    const [deviceLocation, setDeviceLocation] = useState('');
    const [deviceType, setDeviceType] = useState('');
    const [roomTemperature, setRoomTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [lightStatus, setLightStatus] = useState('');

    // Helper function to validate inputs
    const validateInput = (fields) => {
        for (const field of fields) {
            if (!field.value) {
                setMessage(`Error: ${field.name} is required.`);
                return false;
            }
        }
        return true;
    };

    // Add Device
    const addDevice = async () => {
        if (!validateInput([
            { name: 'Device ID', value: deviceId },
            { name: 'Device Name', value: deviceName },
            { name: 'Location', value: deviceLocation },
            { name: 'Device Type', value: deviceType }
        ])) return;

        setLoading(true);
        try {
            // Check if the user is authenticated
            const user = await Auth.currentAuthenticatedUser();
            if (!user) {
                throw new Error('User is not authenticated');
            }

            // Get the current session and the ID token
            const session = await Auth.currentSession();
            const token = session.getIdToken().getJwtToken();
            
            const response = await fetch('https://api.iotlink.click/device', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    id: deviceId,
                    deviceName,
                    location: deviceLocation,
                    deviceType,
                    roomTemperature: parseFloat(roomTemperature),
                    humidity: parseFloat(humidity),
                    lightStatus
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to add device');
            setMessage(`Device added: ${JSON.stringify(data)}`);
            setDeviceName('');
            setDeviceId('');
            setDeviceLocation('');
            setDeviceType('');
            setRoomTemperature('');
            setHumidity('');
            setLightStatus('');
        } catch (error) {
            setMessage(`Error adding device: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Delete Device
    const deleteDevice = async () => {
        if (!validateInput([{ name: 'Device ID', value: deviceId }])) return;

        setLoading(true);
        try {
            const response = await fetch(`https://api.iotlink.click/device/${deviceId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete device');
            setMessage(`Device deleted: ${JSON.stringify(data)}`);
            setDeviceId('');
        } catch (error) {
            setMessage(`Error deleting device: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Add Device to User
    const addDeviceToUser = async () => {
        if (!validateInput([{ name: 'Device ID', value: deviceId }, { name: 'User ID', value: userId }])) return;
    
        setLoading(true);
        try {
            const response = await fetch('https://api.iotlink.click/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: userId, 
                    deviceId: deviceId 
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to add device to user');
            setMessage(`Device added to user: ${JSON.stringify(data)}`);
            setDeviceId('');
            setUserId('');
        } catch (error) {
            setMessage(`Error adding device to user: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Delete Device from User
    const deleteDeviceFromUser = async () => {
        if (!validateInput([{ name: 'Device ID', value: deviceId }, { name: 'User ID', value: userId }])) return;
    
        setLoading(true);
        try {
            const response = await fetch('https://api.iotlink.click/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: userId, 
                    deviceId: deviceId
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Failed to delete device from user');
            setMessage(`Device deleted from user: ${JSON.stringify(data)}`);
            setDeviceId('');
            setUserId('');
        } catch (error) {
            setMessage(`Error deleting device from user: ${error.message}`);
        } finally {
            setLoading(false);
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
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Device Name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={deviceLocation}
                    onChange={(e) => setDeviceLocation(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Device Type"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="number"
                    placeholder="Room Temperature"
                    value={roomTemperature}
                    onChange={(e) => setRoomTemperature(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="number"
                    placeholder="Humidity"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="Light Status"
                    value={lightStatus}
                    onChange={(e) => setLightStatus(e.target.value)}
                    disabled={loading}
                />
                <button onClick={addDevice} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Device'}
                </button>
            </div>

            {/* Delete Device Form */}
            <div className="admin-form">
                <h2>Delete Device</h2>
                <input
                    type="text"
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    disabled={loading}
                />
                <button onClick={deleteDevice} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Device'}
                </button>
            </div>

            {/* Add Device to User Form */}
            <div className="admin-form">
                <h2>Add Device to User</h2>
                <input
                    type="text"
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    disabled={loading}
                />
                <button onClick={addDeviceToUser} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Device to User'}
                </button>
            </div>

            {/* Delete Device from User Form */}
            <div className="admin-form">
                <h2>Delete Device from User</h2>
                <input
                    type="text"
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    disabled={loading}
                />
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    disabled={loading}
                />
                <button onClick={deleteDeviceFromUser} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Device from User'}
                </button>
            </div>

            {/* Message Display */}
            {message && <p className="admin-message">{message}</p>}
        </div>
    );
};

export default Admin;