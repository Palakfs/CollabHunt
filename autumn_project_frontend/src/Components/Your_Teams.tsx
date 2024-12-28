import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeams } from '../features/thunks/teamThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import YourTeamCard from './Your_Team_Card';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  user_id: string;
}

const YourTeams: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const { teams, loading, error } = useSelector((state: RootState) => state.team);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      setUserId(decodedToken.user_id);
    }
  }, []); 

  useEffect(() => {
    dispatch(fetchAllTeams()).catch(() => console.error('Failed to fetch teams'));
  }, [dispatch]); 

  const handleNavigateProfile = () => {
    navigate('/edit_profile');
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>Error loading teams: {error}</p>;
  if (!userId) return <p>Loading user information...</p>;

  const userTeams = teams.filter((team) => team.team_admin_id === Number(userId));

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl="https://via.placeholder.com/150"
          name="User Name"
          profile_description="Welcome to your profile!"
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2">
            Add Skills, Projects, and Experience
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">
            Your Teams
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourTeams;
