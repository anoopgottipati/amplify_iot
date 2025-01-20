import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Devices from './Devices';
import DeviceDetails from './DeviceDetails';
import Admin from './Admin'

const AppRoutes = ({ signOut, user, isAdmin }) => {
    return (
        <Routes>
            <Route path="/home" element={<Home signOut={signOut} user={user} />} />
            <Route path="/devices" element={<Devices user={user} />} />
            <Route path="/devices/:id" element={<DeviceDetails />} />

            {isAdmin ? (
                <Route path="/admin" element={<Admin />} />
            ) : (
                <Route path="/admin" element={<Navigate to="/not-authorized" />} />
            )}

            <Route path="*" element={<NotFound />} />  {/* This is a catch-all for undefined routes */}
        </Routes>
    );
};

export default AppRoutes;
