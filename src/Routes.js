import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Devices from './Devices';
import DeviceDetails from './DeviceDetails';
import Admin from './Admin'

const AppRoutes = ({ signOut, user }) => {
    return (
        <Routes>
            <Route path="/home" element={<Home signOut={signOut} user={user} />} />
            <Route path="/devices" element={<Devices user={user} />} />
            <Route path="/devices/:id" element={<DeviceDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />  {/* This is a catch-all for undefined routes */}
        </Routes>
    );
};

export default AppRoutes;
