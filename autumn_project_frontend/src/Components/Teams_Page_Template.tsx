import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeams } from '../features/thunks/teamThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import TeamCard from './Team_Card';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  user_id: string;
}

interface ProfileData {
  full_name: string | null;
  avatar_url: string|null;
  contact_number: number | null;
  email: string | null;
  skills: string[];
}



const TeamTemplatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate()

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        setUserId(decodedToken.user_id);

        const response = await axiosInstance.get(`/get_user_profile/${decodedToken.user_id}/`);
        setProfile(response.data);
      } else {
        throw new Error('Access token missing.');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const location = useLocation();
  const { event_id, eventName } = location.state || {}; 

  const { teams, error } = useSelector((state: RootState) => state.team);
  
  useEffect(() => {
    if (event_id) {
      dispatch(fetchTeams({ event_id })).catch(() => console.error('Failed to fetch teams'));
    }
  }, [dispatch, event_id]);

  const handleAddTeam = () => {
    navigate("/create_team", { state: { event_id } }); 
  };

  const handleYourTeams = () =>{
    navigate('/your_teams')
  }

  
    const handleNavigateProfile = () => {
      navigate("/edit_profile")
    };

  
    const handleGroup = () => {
      navigate('/groups')
    }
  
    if (loading) return <p>Loading teams...</p>;
    if (error) return <p>Error loading teams: {error}</p>;

  return (
    <div className="flex w-full min-h-screen p-4 bg-blue-100">
      
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
      <ProfileDisplayCard
          avatarUrl={profile?.avatar_url||"https://via.placeholder.com/150"}
          name={profile?.full_name || 'User Name'}
          profile_description="Welcome to your profile!"
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2" onClick={handleNavigateProfile}>Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2" onClick={handleYourTeams}>Your Teams</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2" onClick={handleGroup}>Your Groups</button>
        </div>
      </div>

   
      <div className="w-2/3 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4">{eventName ? `${eventName} - Teams` : 'Teams'}</h1>
        <div className="flex flex-col space-y-4">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              team={team.team}
              team_name={team.team_name}
              team_admin_id={team.team_admin_id}
              team_description={team.team_description}
              max_members={team.max_members}
              expectations={team.expectations}
              admin_expertise={team.admin_expertise}
              commitment_role_id={team.commitment_role_id}
              team_member_id={team.team_member_id}
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
