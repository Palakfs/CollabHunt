import React, { useState } from 'react';
import PersonProfileCard from './Person_Profile_Card';

interface TeamMember {
  id: number;
  avatarUrl: string;
  name: string;
  profileLink: string;
}

interface ManageTeamProps {
  teamName: string;
  admin: TeamMember;
  pendingRequests: TeamMember[];
}

const ManageTeam: React.FC<ManageTeamProps> = ({ teamName, admin, pendingRequests }) => {
  const [requests, setRequests] = useState<TeamMember[]>(pendingRequests);
  const [members, setMembers] = useState<TeamMember[]>([admin]);

  const handleAccept = (member: TeamMember) => {
    setRequests(requests.filter(request => request.id !== member.id));
    setMembers([...members, member]);
  };

  const handleDecline = (memberId: number) => {
    setRequests(requests.filter(request => request.id !== memberId));
  };

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-4">{teamName}</h1>
      
      <div className="flex justify-center space-x-4">

        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-1/2 h-8/10 mt-2 ml-2 mr-3 mb-6">
          <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
          {requests.map((request) => (
            <div key={request.id} className="mb-2 space-x-2 mr-1 ml-1 min-w-10/10">
              <div className='size-7/10 m-1 flex items-center '><PersonProfileCard
                avatarUrl={request.avatarUrl}
                name={request.name}
                profileLink={request.profileLink}
              />
              <button onClick={() => handleAccept(request)} className="tick-icon bg-green-500 text-white font-bold p-2 rounded-full m-1">
            ✓
          </button>
          <button onClick={() => handleDecline(request.id)} className="cross-icon bg-red-500 text-white font-bold p-2 rounded-full m-1">
            ✕
          </button>
          </div>

            </div>
          ))}
        </div>

     
        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-1/2 mt-2 ml-2 mr-3 mb-6 h-8/10">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          {members.map((member) => (
           <div className=' m-1'><PersonProfileCard
              key={member.id}
              avatarUrl={member.avatarUrl}
              name={member.name}
              profileLink={member.profileLink}
            />
            </div>
          ))}
        </div>
      </div>

    
      <div className="flex justify-center mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
          Close Team
        </button>
      </div>
    </div>
  );
};

export default ManageTeam;
