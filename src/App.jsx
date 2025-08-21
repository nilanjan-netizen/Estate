import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react"

import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Testimonails from './components/Testimonails'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Home from './components/Home'
// import Sorter from './components/Buy/Sorter'
import ResultsPage from './components/Cart/Cart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Result from './components/Buy/Result'
import Propertylinks from './components/Buy/Resultpage'
// import PropertyFilterForm from './components/Buy/Sorter'

import Cart from './components/Cart/Cart'
import ChatBox from './components/Chatbot'




const MainLayout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <Header/>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />

   
      <SignedIn>
        <Routes>
          {/* Home page with layout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />

          {/* Other pages with layout */}
          <Route path="/About" element={<MainLayout><About /></MainLayout>} />
          <Route path="/Projects" element={<MainLayout><Projects /></MainLayout>} />
          <Route path="/Testimonials" element={<MainLayout><Testimonails /></MainLayout>} />
          <Route path="/Sorter" element={<MainLayout>< Result/></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact/></MainLayout>} />






          <Route path="/Partners" element={<MainLayout><Propertylinks /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
        <Route path="/chat" element={<MainLayout><ChatBox /></MainLayout>} />
        <Route path="/map" element={<MainLayout><Map /></MainLayout>} />

          {/* Agar koi galat path likhe to redirect home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </SignedIn>






      <SignedOut>
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <Routes>
        {/* Sirf SignIn component render karna */}
        <Route path="/sign-in" element={<SignIn />} />
        {/* Unknown route ke liye bhi SignIn show karna */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  </div>
</SignedOut>

    </div>
  )
}

export default App
