import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Matinee from './Matinee';

const AvatarSelection = () => {
    const [avatars, setAvatars] = useState([
      { image: '/ZoeThumbnail.PNG', name: 'Avatar 1', id: 1 }, // Added id
      { image: '/Moaithumbnail.PNG', name: 'Avatar 2', id: 2 }, // Added id
      { image: '/android1.JPG', name: 'Avatar 3', id: 3 }, // Added id
    ]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const navigate = useNavigate();

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    navigate(`/neural2`);   //this has to be dynamic
  };

  return (
    <div>
      <h1>Select Your Avatar</h1>
      <Matinee avatars={avatars} onAvatarSelect={handleAvatarSelect} />
      {selectedAvatar && (
        <div>
          <h2>Selected Avatar:</h2>
          <img src={selectedAvatar.image} alt={selectedAvatar.name} style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default AvatarSelection;