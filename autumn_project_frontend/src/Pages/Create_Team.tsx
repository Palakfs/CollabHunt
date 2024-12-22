import React , {useEffect , useState} from 'react';
import FormComponent from '../Components/Form'; 
import { useNavigate } from "react-router-dom";
import { fetchCommitmentRoles } from '../features/thunks/commitmentRoleThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { createTeam } from '../features/thunks/teamThunk';
import { useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

interface LocationState {
  event_id: number;
}

interface JwtPayload {
  user_id?: number;
}

const CreateTeamForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { commitments, loading: commitmentsLoading } = useSelector((state: RootState) => state.commitment);
  const { loading: eventLoading, error: eventError } = useSelector((state: RootState) => state.team);
  const navigate = useNavigate();
  const location = useLocation();
  const { event_id } = location.state as LocationState || {};
  const [userId, setUserId] = useState<number | null>(null);

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
      dispatch(fetchCommitmentRoles()).catch(() => console.error('Failed to fetch commitment roles'));
    }, [dispatch]);
  

    const fields = [
        { label: 'Team Name', type: 'text', placeholder: 'Enter the team name' }, 
        { label: 'Team Description', type: 'text', placeholder: 'Enter the team description', isTextArea: true }, 
        { label: 'Your Expertise', type: 'text', placeholder: 'Enter your expertise in the event domain', isTextArea: true }, 
        { label: 'Expectations From Team Members', type: 'text', placeholder: 'Enter your expectations from team members', isTextArea: true },
        { label: 'Your Commitment Level', type: 'select', options: commitments.map((cat) => cat.name) },
        { label: 'Maximum Number Of Members', type: 'number', placeholder: 'Enter the maximum capacity of your team ' },
    ];
    const handleSubmit = (data: { [key: string]: any }) => {
            const selectedCommitment = commitments.find((cat) => cat.name === data['Your Commitment Level']);
            const teamMemberId = userId ? [userId] : [];
          
            const payload = {
              "team_name": data['Team Name'],
              'commitment_role_id': selectedCommitment ? selectedCommitment.id : 0,  
              "expectations": data['Expectations From Team Members'] || "",  
              "team_description": data['Team Description'],
              "max_members": data['Maximum Number Of Members'],
              "admin_expertise": data['Your Expertise'] || "",
              "event_id": event_id,
              "team_member_id":teamMemberId,
            };
        
            console.log('Payload:', payload);
        
        
            dispatch(createTeam(payload))
              .unwrap()
              .then(() => {
                alert('Team created successfully');
                navigate("/teams"); 
              })
              .catch((err) => {
                console.error('Error creating team:', err);
                if (err.response && err.response.data) {
                  console.log('Server Error Response:', err.response.data);
                }
              });
              
          };
        
          if (commitmentsLoading) return <p>Loading...</p>;
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
          <FormComponent fields={fields} onSubmit={handleSubmit} />
        </div>
      );
    };
    
    export default CreateTeamForm;
    

