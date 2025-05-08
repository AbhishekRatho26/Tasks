import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import AddContact from './Pages/AddContact';
import EditContact from './Pages/EditContact';
import ContactDetail from './Pages/ContactDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit" element={<EditContact />} />
        <Route path="/contact/:id" element={<ContactDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
