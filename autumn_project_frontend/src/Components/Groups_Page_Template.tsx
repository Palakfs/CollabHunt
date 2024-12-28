import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../features/thunks/groupThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import GroupCard from './Group_Card'; 

const GroupTemplatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { groups, loading, error } = useSelector((state: RootState) => state.group);

  useEffect(() => {
    dispatch(fetchGroups()).catch(() => console.error('Failed to fetch groups'));
  }, [dispatch]);

  const handleAddGroup = () => {
    navigate("/create_group");
  };

  const handleNavigateProfile = () => {
    navigate("/edit_profile")
  };

  const handleYourTeams = () =>{
    navigate('/your_teams')
  }

  const handleEvents = () =>{
    navigate('/events')
  }

  if (loading) return <p>Loading groups...</p>;
  if (error) return <p>Error loading groups: {error}</p>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard 
          avatarUrl="https://via.placeholder.com/150" 
          name="User Name" 
          profile_description="Welcome to your profile!" 
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2" onClick={handleNavigateProfile}>Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2" onClick={handleYourTeams}>Your Teams</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2" onClick={handleEvents}>Events</button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Your Groups</h2>
        <div className="mt-4 flex flex-col space-y-4">
          {groups.map((group) => (
            <GroupCard
              groupName={group.name}
              groupDescription={group.group_description}
              groupAdmin={group.group_admin}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleAddGroup}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default GroupTemplatePage;
