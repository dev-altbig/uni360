

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your components
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Add_professor from './components/Add_professor';
import Add_department from './components/Add_department';
// import Orders from './components/Add_professor';
// import Orders from './pages/Orders'; // Example for a future page

// Import Bootstrap CSS and Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DepartmentList from './components/DepartmentList';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

          <Route path="Add_professor" element={<Add_professor />}/>
          <Route path="Add_department" element={<Add_department />}/>
          <Route path="DepartmentList" element={< DepartmentList/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;