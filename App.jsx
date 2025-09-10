import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage.jsx';
import CreateTaskPage from './pages/CreateTaskpage.jsx';
import EditTaskPage from './pages/EditTaskpage.jsx';

function App() {
  return (
    <BrowserRouter basename="/Task_management">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateTaskPage />} />
        <Route path="/edit/:id" element={<EditTaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
