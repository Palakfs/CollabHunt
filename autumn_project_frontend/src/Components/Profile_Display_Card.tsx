import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

interface ProfileDisplayCardProps {
  avatarUrl: string;
  name: string;
  profile_description: string;
}

interface JwtPayload {
  user_id?: string;
  user_enrol?: string;
}

const ProfileDisplayCard: React.FC<ProfileDisplayCardProps> = ({ avatarUrl, name, profile_description }) => {
  const [userEnrol, setUserEnrol] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      let decodedToken: JwtPayload = {};

      try {
        if (token) {
          decodedToken = jwtDecode<JwtPayload>(token);
          console.log("Decoded Token:", decodedToken);

          const userId = decodedToken.user_id;

          if (userId) {
            try {
              const enrolResponse = await axiosInstance.get(`/get_user_enrol/${userId}`);
              setUserEnrol(enrolResponse.data.user_enrol);

              const profileResponse = await axiosInstance.get(`/get_user_profile/${userId}`);
              setUsername(profileResponse.data.full_name);
            } catch (err) {
              setErrorState('Error fetching user data');
              console.error(err);
            }
          }
        }
      } catch (err) {
        console.error('Failed to decode token:', err);
        setErrorState('Failed to decode token');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="relative flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-4 m-2 w-90 h-72">
      <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full bg-gray-200 mb-3" />
      <h3 className="text-xl font-bold mb-3">{username}</h3>
      <div className="bg-white p-2 rounded-lg shadow-sm w-full text-center mb-1">
        <p className="italic text-gray-700">{profile_description}</p>
      </div>

    

      {userEnrol && (
        <div className="bg-white p-2 rounded-lg shadow-sm w-full text-center mt-3">
          <p className="text-gray-700">Enrolment Number: {userEnrol}</p>
        </div>
      )}

      {errorState && (
        <div className="bg-red-200 p-2 rounded-lg shadow-sm w-full text-center mt-3">
          <p className="text-red-700">{errorState}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileDisplayCard;
