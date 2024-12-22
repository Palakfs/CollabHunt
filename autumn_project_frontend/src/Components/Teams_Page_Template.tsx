import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../features/thunks/teamThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import TeamCard from './Team_Card';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const TeamTemplatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { event_id, eventName } = location.state || {}; 

  const { teams, loading, error } = useSelector((state: RootState) => state.team);
  
  useEffect(() => {
    if (event_id) {
      dispatch(fetchTeams({ event_id })).catch(() => console.error('Failed to fetch teams'));
    }
  }, [dispatch, event_id]);

  const handleAddTeam = () => {
    navigate("/create_team", { state: { event_id } }); 
  };

  
    const handleNavigateProfile = () => {
      navigate("/edit_profile")
    };
  
    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>Error loading teams: {error}</p>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
      <ProfileDisplayCard 
          avatarUrl="https://via.placeholder.com/150" 
          name="User Name" 
          profile_description="Welcome to your profile!" 
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2">Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Teams</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Groups</button>
        </div>
      </div>

   
      <div className="w-2/3 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4">{eventName ? `${eventName} - Teams` : 'Teams'}</h1>
        <div className="flex flex-col space-y-4">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              teamName={team.team_name}
              teamAdmin="Admin"
              teamDescription={team.team_description}
              vacancy={team.max_members}
              teamProfileLink=""
            />
          ))}
        </div>
      </div>
      <button
              onClick={handleAddTeam}
              className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
            >
              <FaPlus size={24} />
            </button>
    </div>
  );
};

export default TeamTemplatePage;
