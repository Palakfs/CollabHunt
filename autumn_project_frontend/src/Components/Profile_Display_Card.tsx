import React from 'react';

interface ProfileDisplayCardProps {
  avatarUrl: string;
  name: string; 
  profile_description: string; 
}

const ProfileDisplayCard: React.FC<ProfileDisplayCardProps> = ({ avatarUrl, name, profile_description }) => {
  return (
    <div className="relative flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-4 m-2 w-90 h-72">
      <div className="absolute top-2 right-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-sky-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 010 2.828l-10 10a1 1 0 01-.293.207l-4 2a1 1 0 01-1.32-1.32l2-4a1 1 0 01.207-.293l10-10a2 2 0 012.828 0zM16 4l-1 1-2-2 1-1a1 1 0 011.414 0L16 4zm-3 3L7 13 5 11l6-6 2 2z" />
          </svg>
        </button>
      </div>

      
      <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full bg-gray-200 mb-3" />

      
      <h3 className="text-xl font-bold mb-3">{name}</h3>

      
      <div className="bg-white p-2 rounded-lg shadow-sm w-full text-center mb-1">
        <p className="italic text-gray-700">{profile_description}</p>
      </div>
    </div>
  );
};

export default ProfileDisplayCard;
