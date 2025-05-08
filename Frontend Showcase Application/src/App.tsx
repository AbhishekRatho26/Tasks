import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import GlobalStyles from './components/common/GlobalStyles';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Demo from './pages/Demo';
import AddProject from './pages/AddProject';
import ProjectDetailsPage from './pages/ProjectDetails';

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;