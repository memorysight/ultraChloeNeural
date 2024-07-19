import React from 'react';
import "./Sidenav.css";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SearchIcon from '@mui/icons-material/Search';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import Neural from '../Neural';

 function Sidenav() {
    return (
        <div>
             <img className = "sidenav__logo" src="https://i.ibb.co/Z2HVmW1/cellularmitoros.jpg" alt="" 
          />

          <div className = "sidenav__buttons">
          <button className = "sidenav__button">
            <HomeIcon/>
            <span>Home</span>
           
          </button>
        

         
          <button className = "sidenav__button">
            <ExploreIcon/>
            <span>Explore</span>

          </button>
        
         
          <button className = "sidenav__button">
            <SearchIcon/>
            <span>Search</span>

          </button>
        
    
          <button className = "sidenav__button">
            <ManageSearchIcon/>
            <span>Manage</span>

          </button>
        
  
          <button className = "sidenav__button">
            <SlideshowIcon/>
            <span>Reels</span>

          </button>
       
          <button className = "sidenav__button">
            <ChatIcon/>
            <span>Chat</span>

          </button>
          </div>
  
          <button className = "sidenav__button">
            <AddCircleOutlineIcon/>
            <span>Create</span>

          </button>
   
          <button className = "sidenav__button">
            <FavoriteIcon/>
            <span>NiceTits</span>

          </button>

          <button className = "sidenav__button">
            <AddCircleOutlineIcon/>
            <span>NiceTits</span>

          </button>



          <button className = "sidenav__more">
            <MenuIcon/>
            <span>Menu</span>

          </button>

         


          </div>

          

    );
}
export default Sidenav;

    
