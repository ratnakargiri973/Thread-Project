import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import First from './pages/First'
import { AuthProvider } from './contexts/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import VerifyOtp from './pages/VerifyOtp'
import ChangePassword from './pages/ChangePassword'
import ProfilePicture from './components/ProfilePicture'
import ProfileContext from './contexts/ProfileContext'

function AppWrapper(){
  return(
    <ProfileContext>
      <First />
    </ProfileContext>
  )
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: "/verify-otp",
      element: <VerifyOtp/>
    },
    {
      path: "/change-password",
      element: <ChangePassword />
    },
    {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppWrapper />
      </ProtectedRoute>
      ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/profile-picture",
        element: <ProfilePicture />
      }
    ]
  }])
  return (
   <AuthProvider>
     <RouterProvider router={router}/>
   </AuthProvider>
  )
}

export default App
