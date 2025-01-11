import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface GroupCardProps {
  groupName: string;
  groupAdmin: string;
  groupDescription: string;
}

const GroupCard: React.FC<GroupCardProps> = ({ groupName, groupAdmin, groupDescription }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const profileResponse = await axiosInstance.get(`/get_user_profile/${groupAdmin}`);
        setUsername(profileResponse.data.full_name);
      } catch (err) {
        setErrorState('Error fetching user data');
        console.error('Error fetching user profile:', err);
      }
    };

    if (groupAdmin) {
      fetchUserData();
    }
  }, [groupAdmin]); 
  return (
    <div className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-9/10">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{groupName}</h2>
          <p className="text-sm text-gray-600">Created by {username}</p>
        </div>
      </div>
      <div className="mt-3 text-gray-700">
        {groupDescription}
      </div>
    </div>
  );
};

export default GroupCard;
