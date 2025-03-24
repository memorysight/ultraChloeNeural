import React, { useState, useRef, useEffect } from 'react';
import './Matinee.css'; // Import your CSS file

// const tiles=[
//     { image: 'image1.jpg', title: 'Tile 1', description: 'Description 1' },
//     { image: 'image2.jpg', title: 'Tile 2', description: 'Description 2' },
//     { image: 'image3.jpg', title: 'Tile 3', description: 'Description 3' },
//     { image: 'image4.jpg', title: 'Tile 4', description: 'Description 4' },
//     { image: 'image5.jpg', title: 'Tile 5', description: 'Description 5' },
//     { image: 'image6.jpg', title: 'Tile 6', description: 'Description 6' },
   
//   ]

const Matinee = ({ tiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tiles.length);
    }, 5000); // Change 5000 to adjust scroll speed (milliseconds)

    return () => clearInterval(intervalId);
  }, [tiles.length]);

  const handleTileClick = (index) => {
    setCurrentIndex(index);
  };


  const visibleTiles = tiles.slice(currentIndex, currentIndex + 6);

  return (
    <div className="matinee-container" ref={containerRef}>
      <p>TestingMatinee</p>
      <div className="matinee-tiles">
        {visibleTiles.map((tile, index) => (
          <div key={index} className="matinee-tile" style={{ backgroundImage: `url(${tile.image})` }}>
            <div className="matinee-tile-text">
              <h3>{tile.title}</h3>
              <p>{tile.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="matinee-thumbnails">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`matinee-thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleTileClick(index)}
            style={{ backgroundImage: `url(${tile.image})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Matinee;