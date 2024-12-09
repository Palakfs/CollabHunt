import React from 'react';

interface TeamCardProps {
  teamName: string;
  teamAdmin: string;
  teamProfileLink: string;
  teamDescription: string;
  vacancy: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, teamAdmin, teamDescription, vacancy, teamProfileLink }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-3/4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{teamName}</h2>
          <p className="text-sm text-gray-600">Created by {teamAdmin}</p>
        </div>
        <div className="flex flex-col m-1 text-right">
          <p className="text-sm text-gray-600 mb-1">Needs {vacancy} members more</p>
          <a href={teamProfileLink} className="text-blue-500 hover:underline">
            View Team Profile
          </a>
        </div>
      </div>
      <div className="mt-3 text-gray-700">
        {teamDescription}
      </div>
    </div>
  );
};

export default TeamCard;
