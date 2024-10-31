import React from 'react';

interface PersonProfileCardProps {
  avatarUrl: string;
  name: string; 
  profileLink: string; 
}

const PersonProfileCard: React.FC<PersonProfileCardProps> = ({ avatarUrl, name, profileLink }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg shadow-md mb-4 m-2 size-3/6">
      <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <a href={profileLink} className="text-blue-500 hover:underline">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default PersonProfileCard;
