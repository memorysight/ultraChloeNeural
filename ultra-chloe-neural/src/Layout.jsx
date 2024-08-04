import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import '../src/App.css';


function Layout() {
  return (
    <div>
      <header>
        <h1>Zoe: Advanced AI System</h1>
        <nav>
          <ul>
            <li><a href="/"><SearchIcon /> Zoe's Game</a></li>
            <li><a href="/chloeneuralapp"><ExploreIcon /> Chloe</a></li>
            <li><a href="/neural"><AddCircleOutlineIcon /> Neural</a></li>
            <li><a href="/engine"><FavoriteIcon /> Engine</a></li>
            <li><a href="/instaApp"><ManageSearchIcon /> InstaApp</a></li>
            <li><a href="/svguiapp"><MenuIcon /> SVGUIApp</a></li>
            
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;