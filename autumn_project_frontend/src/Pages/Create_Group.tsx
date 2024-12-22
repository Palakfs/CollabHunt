import React, { useEffect, useState } from 'react';
import FormComponent from '../Components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { createGroup } from '../features/thunks/groupThunk';
import { fetchProfiles } from '../features/thunks/profileThunk';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

interface JwtPayload {
  user_id?: number;
}

interface Profile {
  username: number;
  full_name: string;
}

const CreateGroupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profiles, loading: profilesLoading } = useSelector((state: RootState) => state.profile);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        if (decodedToken?.user_id) {
          setUserId(Number(decodedToken.user_id));
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

 
  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

 
  const filteredProfiles: Profile[] = profiles.filter(
    (profile: Profile) => profile.username !== userId
  );

  
  const fields = [
    { label: 'Group Name', type: 'text', placeholder: 'Enter the group name' },
    {
      label: 'Group Description',
      type: 'text',
      placeholder: 'Enter the group description',
      isTextArea: true,
    },
    {
      label: 'Add Group Members',
      type: 'select',
      options: filteredProfiles.map((profile) => profile.full_name), 
      isMultiple: true,
    },
  ];


  const handleSubmit = (data: { [key: string]: any }) => {
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
  
    
    const selectedMembers = data['Add Group Members'] || [];  

    
    const selectedUsernames = profiles
      .filter((profile) => selectedMembers.includes(profile.full_name))
      .map((profile) => profile.username);

    const groupData = {
      group_name: data['Group Name'],
      group_description: data['Group Description'],
      group_admin: userId,
      member_id: selectedUsernames,
    };
  
    console.log('Submitting Group Data:', groupData);
    dispatch(createGroup(groupData))
      .unwrap()
      .then(() => {
        alert('Group created successfully');
        navigate("/groups");
      })
      .catch((error) => {
        console.error('Error creating group:', error);
      });
  };

  

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <FormComponent fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateGroupForm;
