import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Neural from './Neural';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/phoebe" element={<Phoebe />} /> */}
          <Route path="/neural" element={<Neural />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;