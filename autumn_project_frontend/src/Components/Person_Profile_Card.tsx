import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

interface PersonProfileCardProps {
  userId: number;
  avatarUrl: string;
}

const PersonProfileCard: React.FC<PersonProfileCardProps> = ({ avatarUrl, userId }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await axiosInstance.get(`/get_user_profile/${userId}`);
        setUsername(profileResponse.data.full_name);
      } catch (err) {
        setErrorState('Error fetching user data');
        console.error('Error fetching user profile:', err);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleViewProfile = () => {
    navigate('/view_profile', { state: { userId } });
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg shadow-md mb-4 m-2">
      <img src={avatarUrl} alt={username || 'User avatar'} className="w-16 h-16 rounded-full mr-4" />
      <div>
        {errorState ? (
          <p className="text-red-500">{errorState}</p>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{username || 'UserName'}</h3>
            <button
              onClick={handleViewProfile}
              className="text-blue-500 hover:underline mt-1 focus:outline-none"
            >
              View Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonProfileCard;
