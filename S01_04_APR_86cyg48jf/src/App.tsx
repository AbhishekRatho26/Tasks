
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddTransaction from './Pages/AddTransaction';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<AddTransaction />} />
    <Route path="/edit/:id" element={<AddTransaction />} />
  </Routes>
);

export default App;
