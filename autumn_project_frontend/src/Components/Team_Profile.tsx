import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTeam } from '../features/thunks/teamThunk';
import { fetchCommitmentRoles } from '../features/thunks/commitmentRoleThunk';
import { AppDispatch, RootState } from '../Redux/store';
import PersonProfileCard from './Person_Profile_Card';
import { useLocation } from 'react-router-dom';

const TeamProfile: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { state } = location;
  const {
    team_id,
    team_name,
    team_description,
    max_members,
    team_admin,
    expectations,
    admin_expertise,
    commitment_role_id,
  } = state || {};

  const { teams, loading, error } = useSelector((state: RootState) => state.team);
  const { commitments } = useSelector((state: RootState) => state.commitment);

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

  return (
    <div className="bg-blue-100 min-h-screen min-w-full flex items-center justify-between">
      <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl w-full mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">{team_name}</h1>
        <p className="text-gray-700 mb-4 text-center">{team_description}</p>
        <p><strong>Expectations:</strong> {expectations}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Team Admin</h2>
          <PersonProfileCard
            avatarUrl=""
            name={team_admin || 'Admin'}
            profileLink=""
          />
          <p><strong>Commitment Level:</strong> {commitmentRoleName}</p>
          <p><strong>Expertise:</strong> {admin_expertise}</p>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send Joining Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
