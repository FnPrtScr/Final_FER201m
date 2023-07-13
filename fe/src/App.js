import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link, RouterProvider, BrowserRouter } from 'react-router-dom'
import { appRoutes } from './services/routes'

function App() {
  return (
    <RouterProvider router={appRoutes}/>
  )
}

export default App

