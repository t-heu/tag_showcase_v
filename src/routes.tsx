import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
// import ReactGA from 'react-ga';

import Home from './screen/home'
import Label from './screen/label'

// ReactGA.initialize('G-NKGFE1C8RE');

const RoutesRoot = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="label" element={<Label />} />
      </Routes>
    </HashRouter>
  )
}

export default RoutesRoot
