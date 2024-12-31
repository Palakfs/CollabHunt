import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeams } from '../features/thunks/teamThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import YourTeamCard from './Your_Team_Card';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

interface JwtPayload {
  user_id: string;
}

interface ProfileData {
  full_name: string | null;
  avatar_url: string | null;
  contact_number: number | null;
  email: string | null;
  skills: string[];
}

const YourTeams: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(true); 
  const { teams, loading: teamsLoading, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
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
        setProfileLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchAllTeams()).catch(() => console.error('Failed to fetch teams'));
  }, [dispatch]);

  const handleNavigateProfile = () => {
    navigate('/edit_profile');
  };

  const handleGroup = () => {
    navigate('/groups');
  };

  const handleEvents = () => {
    navigate('/events');
  };

  if (teamsLoading || profileLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading teams: {error}</p>;
  if (!userId) return <p>Loading user information...</p>;

  const userTeams = teams.filter((team) => team.team_admin_id === Number(userId));

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profile?.avatar_url||"https://via.placeholder.com/150"}
          name={profile?.full_name || 'User Name'}
          profile_description="Welcome to your profile!"
        />
        <div className="w-90">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2"
            onClick={handleNavigateProfile}
          >
            Add Skills, Projects, and Experience
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2"
            onClick={handleEvents}
          >
            Events
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2"
            onClick={handleGroup}
          >
            Your Groups
          </button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4">Your Teams</h1>
        <div className="flex flex-col space-y-4">
          {userTeams.map((team, index) => (
            <YourTeamCard
              key={index}
              team={team.team}
              team_name={team.team_name}
              team_admin_id={team.team_admin_id}
              team_description={team.team_description}
              max_members={team.max_members}
              expectations={team.expectations}
              admin_expertise={team.admin_expertise}
              commitment_role_id={team.commitment_role_id}
              event_id={team.event_id}
              team_member_id={team.team_member_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourTeams;
