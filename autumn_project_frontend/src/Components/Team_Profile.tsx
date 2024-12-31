import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeam } from '../features/thunks/teamThunk';
import { fetchCommitmentRoles } from '../features/thunks/commitmentRoleThunk';
import { AppDispatch, RootState } from '../Redux/store';
import PersonProfileCard from './Person_Profile_Card';
import { useLocation, useNavigate } from 'react-router-dom';
import { createJoiningRequest } from '../features/thunks/joiningRequestThunk';
import {jwtDecode} from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

const TeamProfile: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface JwtPayload {
    user_id?: string;
  }

  interface ProfileData {
    full_name: string | null;
    avatar_url: string | null;
    contact_number: number | null;
    email: string | null;
    skills: string[];
  }

  const { state } = location;
  const {
    team_id,
    team_name,
    team_description,
    max_members,
    team_admin_id,
    expectations,
    admin_expertise,
    commitment_role_id,
    team_member_id = [], 
  } = state || {};

  const { teams, loading, error } = useSelector((state: RootState) => state.team);
  const { commitments } = useSelector((state: RootState) => state.commitment);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(true); 
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const decodedToken = jwtDecode<JwtPayload>(token);
          const userId = decodedToken.user_id ? Number(decodedToken.user_id) : null; 
          setCurrentUserId(userId);
  
          if (team_admin_id) {
            const response = await axiosInstance.get(`/get_user_profile/${team_admin_id}/`);
            setProfile(response.data);
          }
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
    if (team_id) {
      dispatch(getTeam({ team_id })).catch(() => console.error('Failed to fetch team'));
    }
    dispatch(fetchCommitmentRoles());
  }, [dispatch, team_id]);

  const commitmentRoleName = commitments.find((role) => role.id === commitment_role_id)?.name || 'Unknown';

  if (!team_id) {
    return <p>Error: Team ID not provided.</p>;
  }

  if (loading) {
    return <p>Loading team details...</p>;
  }

  if (error) {
    return <p>Error loading team details: {error}</p>;
  }

  const handleSubmit = () => {
    if (team_member_id.includes(currentUserId)) {
      setErrorMessage('You are already a part of the team.');
      return;
    }

    const payload = {
      team_id,
      is_reviewed: false,
      is_accepted: false,
    };

    console.log('Payload:', payload);

    dispatch(createJoiningRequest(payload))
      .unwrap()
      .then(() => {
        alert('Request sent successfully');
        navigate('/teams');
      })
      .catch((err) => {
        console.error('Error creating team:', err);
        if (err.response && err.response.data) {
          console.log('Server Error Response:', err.response.data);
        }
      });
  };

  return (
    <div className="bg-blue-100 min-h-screen min-w-full flex items-center justify-between">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{team_name}</h1>
        <p className="text-gray-700 mb-4 text-center">{team_description}</p>
        <p><strong>Expectations:</strong> {expectations}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Team Admin</h2>
          <PersonProfileCard
            userId={team_admin_id}
            avatarUrl={profile?.avatar_url||"https://via.placeholder.com/150"}
            
          />
          <p><strong>Commitment Level:</strong> {commitmentRoleName}</p>
          <p><strong>Expertise:</strong> {admin_expertise}</p>
        </div>

        <div className="flex flex-col justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
          >
            Send Joining Request
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
