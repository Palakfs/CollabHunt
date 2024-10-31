import React from 'react';
import PersonProfileCard from './Person_Profile_Card';

interface TeamAdmin {
  avatarUrl: string; 
  name: string; 
  profileLink: string; 
  commitmentLevel: string; 
  expertise: string;
}

interface TeamProfileProps {
  teamName: string; 
  description: string; 
  expectations: string; 
  admin: TeamAdmin;
}

const TeamProfile: React.FC<TeamProfileProps> = ({ teamName, description, expectations, admin }) => {
  return (
    <div className='bg-blue-100 min-h-screen min-w-full flex items-center justify-between'>
      <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl w-full mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-4">{teamName}</h1>
        <p className="text-gray-700 mb-4 text-center">{description}</p>
        <p><strong>Expectations:</strong> {expectations}</p>
        
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Team Admin</h2>
          <PersonProfileCard 
            avatarUrl={admin.avatarUrl} 
            name={admin.name} 
            profileLink={admin.profileLink} 
          />
          <p><strong>Commitment Level :</strong> {admin.commitmentLevel}</p>
          <p><strong>Expertise:</strong> {admin.expertise}</p>
        </div>

       
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Joining Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
