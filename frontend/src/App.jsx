import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import your components
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Add_professor from './components/Add_professor';
import Add_department from './components/Add_department';
import DepartmentList from './components/DepartmentList';
import ProfessorList from './components/ProfessorList';
import StudentList from './components/StudentList';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Login route remains public */}
        <Route path="/Login" element={<Login />} />

        {/* The Layout component now acts as a wrapper for all protected content */}
        <Route path="/" element={<Layout />}>
          
          {/* Dashboard: Accessible to both 'admin' and 'professor' */}
          <Route 
            index 
            element={
              <ProtectedRoute allowedRoles={['admin', 'professor']}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin-Only Routes */}
          <Route 
            path="Add_department" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Add_department />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="DepartmentList" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DepartmentList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="Add_professor" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Add_professor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="ProfessorList" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProfessorList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="StudentList"
            element={
              <ProtectedRoute allowedRoles={['admin','professor']}>
                <StudentList  />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;