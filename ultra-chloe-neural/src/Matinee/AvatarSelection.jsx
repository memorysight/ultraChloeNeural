import React, { useState } from 'react';
import Matinee from './Matinee';

const AvatarSelection = () => {
  const [avatars, setAvatars] = useState([
    { image: '/Moaithumbnail.PNG', name: 'Avatar 1', name: 'Avatar 1' },
    { image: '/ZoeThumbnail.PNG', name: 'Avatar 2' },
    { image: '/android1.JPG', name: 'Avatar 3' },
   
  ]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    //Do something with selectedAvatar, such as storing in local storage, sending to backend, etc.
    console.log('Selected avatar:', avatar);
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