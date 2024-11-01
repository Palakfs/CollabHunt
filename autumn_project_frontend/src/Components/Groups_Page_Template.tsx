import React from 'react';
import ProfileDisplayCard from './Profile_Display_Card';
import GroupCard from './Group_Card';

interface GroupTemplatePageProps {
  groups: {
    groupName: string;
    groupAdmin: string;
    groupDescription: string;
    numberOfMmembers: string;
  }[];
  profileData: {
    avatarUrl: string;
    name: string;
    profile_description: string;
  };
}

const GroupTemplatePage: React.FC<GroupTemplatePageProps> = ({ groups, profileData, }) => {
  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profileData.avatarUrl}
          name={profileData.name}
          profile_description={profileData.profile_description}
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2">Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Teams</button>
        </div>
      </div>

   
      <div className="w-2/3 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4">Groups You're Part Of</h1>
        <div className="flex flex-col space-y-4">
          {groups.map((group, index) => (
            <GroupCard
              key={index}
              groupName={group.groupName}
              groupAdmin={group.groupAdmin}
              groupDescription={group.groupDescription}
              numberOfMembers={group.numberOfMmembers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupTemplatePage;
