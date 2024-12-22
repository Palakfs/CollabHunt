import React from 'react';

interface GroupCardProps {
  groupName: string;
  groupAdmin: string;
  groupDescription: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, groupAdmin, groupDescription }) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-9/10">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{groupName}</h2>
          <p className="text-sm text-gray-600">Created by {groupAdmin}</p>
        </div>
      </div>
      <div className="mt-3 text-gray-700">
        {groupDescription}
      </div>
    </div>
  );
};

export default GroupCard;
