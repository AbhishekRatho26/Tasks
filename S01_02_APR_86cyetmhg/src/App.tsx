import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import RecipeForm from './pages/RecipeForm';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
              <Route path="/add-recipe" element={<RecipeForm />} />
              <Route path="/edit-recipe/:id" element={<RecipeForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;