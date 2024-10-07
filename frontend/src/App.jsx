// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClassList from './components/ClassList';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import AddGrade from './components/AddGrade';
import StudentAverage from './components/StudentAverage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Třídy</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ClassList />} />
          <Route path="/classes/:classId/students" element={<StudentList />} />
          <Route path="/classes/:classId/add-student" element={<AddStudent />} />
          <Route path="/students/:studentId/add-grade" element={<AddGrade />} />
          <Route path="/students/:studentId/average" element={<StudentAverage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
