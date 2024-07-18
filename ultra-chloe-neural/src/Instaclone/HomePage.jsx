import React from 'react';
import './HomePage.css';
import Sidenav from './Sidenav';
import Timeline from './Timeline';


function HomePage() {
  return (
    <div className = 'homepage'>

{/* <video autoPlay muted loop id="bg-video">
            <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
        </video> */}


      <div className='homepage__nav'>

      <Sidenav/>
      </div>
       
       
      <div className='homepage__timeline'>

      <Timeline/>
      </div>
        
      </div>
       
   
  )
}

export default HomePage;
