// import React from 'react';
// import './HomePage.css';
// import Sidenav from './Sidenav';
// import Timeline from './Timeline';
// import Neural from '../Neural';


// function HomePage() {
//   return (
//     <div className = 'homepage'>

// {/* <video autoPlay muted loop id="bg-video">
//             <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
//         </video> */}


//       <div className='homepage__nav'>

//       <Sidenav/>
//       </div>
       
       
//       <div className='homepage__timeline'>
//       <Neural />
//       <Timeline/>
//       </div>
        
//       </div>
       
   
//   )
// }

// export default HomePage;








import React from 'react';
import './HomePage.css';
import Sidenav from './Sidenav';
import Timeline from './Timeline';
import Neural from '../Neural';

function HomePage() {
  return (
    <div className='homepage'>
      {/* <video autoPlay muted loop id="bg-video">
                <source src="Hal9muchBetterFinal2.mp4" type="video/mp4" />
            </video> */}
      <div className='homepage__nav'>
        <Sidenav />
      </div>
      <div className='homepage__timeline'>
   
        {/* <div className='homepage_banner'>
               <Neural width={'1em'} height={'1em'} />
        </div> */}
        <Timeline />
      </div>
    </div>
  );
}

export default HomePage;
