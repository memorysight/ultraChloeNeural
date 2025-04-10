import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Challenge from './Challenge';
import Neural from './Neural';
import Neural2 from './Neural2';
import Enigma2 from './Fibernetic/Enigma2';
import InstaApp from './Instaclone/InstaApp';
import Matinee from './Matinee/Matinee'; // Import Matinee component
import AvatarSelection from './Matinee/AvatarSelection'; //New component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Challenge />} />
          <Route path="/neural" element={<Neural />} />
          <Route path="/neural2" element={<Neural2 />} />
          <Route path="/engine" element={<Enigma2 />} />
          <Route path="/instaApp" element={<InstaApp />} />
          <Route path="/avatars" element={<AvatarSelection />} /> {/* Add Matinee route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;