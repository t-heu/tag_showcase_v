import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import Home from './screen/home'
import Label from './screen/label'

const RoutesRoot: React.FC = () => {
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
