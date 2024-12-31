import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';
import { FiEdit } from 'react-icons/fi';

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
  const [userId, setUserId] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(avatarUrl || null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      let decodedToken: JwtPayload = {};

      try {
        if (token) {
          decodedToken = jwtDecode<JwtPayload>(token);
          console.log('Decoded Token:', decodedToken);

          const userIdFromToken = decodedToken.user_id || null;
          setUserId(userIdFromToken); 

          if (userIdFromToken) {
            try {
              const enrolResponse = await axiosInstance.get(`/get_user_enrol/${userIdFromToken}`);
              setUserEnrol(enrolResponse.data.user_enrol);

              const profileResponse = await axiosInstance.get(`/get_user_profile/${userIdFromToken}`);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage || !userId) {
      setErrorState('No image selected or user ID missing.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar_url', selectedImage);

    

    try {
      await axiosInstance.patch(`/get_user_profile/${userId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile image updated successfully!');
    } catch (error) {
      console.error('Error updating profile image:', error);
      setErrorState('Error updating profile image');
    }
  };

  return (
    <div className="relative flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-4 m-2 w-90 h-72">
      <div className="relative">
        <img
          src={previewImage || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-24 h-24 rounded-full bg-gray-200 mb-3 object-cover"
        />
        <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer">
          <FiEdit />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
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
      {selectedImage && (
        <button
          onClick={handleImageUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Upload Image
        </button>
      )}
    </div>
  );
};

export default ProfileDisplayCard;
