import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Challenge from './Challenge';
import Neural from './Neural';
import Enigma2 from './Fibernetic/Enigma2'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Challenge />} />
          {/* <Route path="/phoebe" element={<Phoebe />} /> */}
          <Route path="/neural" element={<Neural />} />
          <Route path="/Fibernetic/enigma2" element={<Enigma2 />} />
       </Route>
      </Routes>
    </Router>
  );
}

export default App;