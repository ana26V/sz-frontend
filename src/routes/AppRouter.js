import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../screens/HomeScreen'
import BookingScreen from '../screens/BookingScreen'
import Register from '../screens/Register'
import Login from '../screens/Login'
import ApartmentList from '../screens/ApartmentsList'
import ApBookings from '../screens/APBookings'
import Profile from '../screens/Profile'
import AdminScreen from '../screens/AdminScreen'
function AppRouter() {
    return (
        < Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/apartments" element={<ApartmentList />} />
            <Route path="/book/:roomid/:fromDate/:toDate" element={<BookingScreen />} />
            <Route path="/bookAP/:apartmentId/:fromDate/:toDate" element={<ApBookings />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminScreen />} />
        </Routes>
    )
}

export default AppRouter