import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Challenge from './Challenge';
import Neural from './Neural';
import Enigma2 from './Fibernetic/Enigma2';
import InstaApp from './Instaclone/InstaApp';
import ChloeNeuralApp from './LModel/ChloeNeuralApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Challenge />} />
          <Route path="/chloeneuralapp" element={<ChloeNeuralApp />} />
          <Route path="/neural" element={<Neural />} />
          <Route path="/engine" element={<Enigma2 />} />
          <Route path="/instaApp" element={<InstaApp />} />
       </Route>
      </Routes>
    </Router>
  );
}

export default App;