import React from 'react';
import './Matinee.css';

const Matinee = ({ avatars, onAvatarSelect }) => {
  const handleAvatarClick = (index) => {
    onAvatarSelect(avatars[index]);
  };

  return (
    <div className="matinee-container">
      <div className="matinee-thumbnails">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className="matinee-thumbnail"  // No need for active class here.
            onClick={() => handleAvatarClick(index)}
            style={{ backgroundImage: `url(${avatar.image})` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Matinee;