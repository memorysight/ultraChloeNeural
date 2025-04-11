import React from 'react';
import './Matinee.css';

const Matinee = ({ avatars, onAvatarSelect }) => {
  return (
    <div>
      {avatars.map((avatar) => (
        <div key={avatar.id} onClick={() => onAvatarSelect(avatar)}>
          <img src={avatar.image} alt={avatar.name} style={{ width: '100px' }} />
          <p>{avatar.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Matinee;