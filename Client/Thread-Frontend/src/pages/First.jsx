import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

function First({profileUrl}) {
  return (
    <div className="flex flex-col h-screen w-full">
    <header className="top-0 left-0 w-full z-10">
      <Header profileUrl={profileUrl}/>
    </header>
    <main className="flex-grow flex flex-wrap justify-center items-start overflow-y-auto">
      <Outlet />
    </main>
    <footer className="w-full">
      <Footer />
    </footer>
  </div>
  
  )
}

export default First
