import React, { useEffect } from 'react';
import PersonProfileCard from './Person_Profile_Card';
import { useNavigate } from 'react-router-dom';
import { fetchJoiningRequests, reviewJoiningRequest } from '../features/thunks/joiningRequestThunk';
import { getTeam } from '../features/thunks/teamThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../Redux/store';

const ManageTeamPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { team_id, team_name, max_members, team_admin } = state || {};

  const { joiningRequests, loading, error } = useSelector((state: RootState) => state.joiningRequest);

  
  useEffect(() => {
    if (team_id) {
      dispatch(fetchJoiningRequests({ team_id }))
        .unwrap()
        .catch(() => console.error('Failed to fetch joining requests'));

      dispatch(getTeam({ team_id }));
    }
  }, [dispatch, team_id]);

  
  const teamMembers = useSelector((state: RootState) =>
    state.team.teams.find((team) => team.team === team_id)?.team_member_id || []
  );

  
  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>Error loading requests: {error}</p>;

  const handleAccept = (requestId: number) => {
    dispatch(reviewJoiningRequest({ requestId, is_accepted: true }))
      .unwrap()
      .then(() => dispatch(fetchJoiningRequests({ team_id })));
  };

  const handleDecline = (requestId: number) => {
    dispatch(reviewJoiningRequest({ requestId, is_accepted: false }))
      .unwrap()
      .then(() => dispatch(fetchJoiningRequests({ team_id })));
  };

  const handleTeams = () => {
    navigate('/your_teams');
  };

  return (
    <div className="bg-blue-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-4">{team_name}</h1>

      <div className="flex justify-center space-x-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-1/2 h-8/10 mt-2 ml-2 mr-3 mb-6">
          <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
          {joiningRequests.map((joiningRequest) => (
            <div key={joiningRequest.joining_request} className='justify-between w-500' >
              <div className="flex items-center mr-4">
                <div className="flex-1"><PersonProfileCard
                  avatarUrl=""
                  profileLink=""
                  userId={joiningRequest.sender_id}
                />
                </div>
                <div className='flex items-center'>
                <button
                  onClick={() => handleAccept(joiningRequest.joining_request)}
                  className="tick-icon bg-green-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center ml-2"
                >
                  ✓
                </button>
                <button
                  onClick={() => handleDecline(joiningRequest.joining_request)}
                  className="cross-icon bg-red-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center ml-2"
                >
                  ✕
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg shadow-md w-1/2 mt-2 ml-2 mr-3 mb-6 h-8/10">
          <h2 className="text-lg font-semibold mb-2">Team Members</h2>
          {teamMembers.map((memberId) => (
            <PersonProfileCard key={memberId} avatarUrl="" profileLink="" userId={memberId} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleTeams}
        >
          Close Team
        </button>
      </div>
    </div>
  );
};

export default ManageTeamPage;
