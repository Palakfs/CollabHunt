import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


interface YourTeamCardProps {
  team:number,
  team_name: string;
  team_admin_id: number;
  team_description: string;
  max_members: number;
  expectations : string,
  admin_expertise : string,
  commitment_role_id : number,
  event_id : number,
  team_member_id : number[]
}

const YourTeamCard: React.FC<YourTeamCardProps> = ({ team_name, team_admin_id, team_description,max_members,team, admin_expertise , expectations , commitment_role_id , event_id , team_member_id}) => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const profileResponse = await axiosInstance.get(`/event/${event_id}`);
        setEventName(profileResponse.data.event_title);
      } catch (err) {
        setErrorState('Error fetching user data');
        console.error('Error fetching user profile:', err);
      }
    };

    if (event_id) {
      fetchUserData();
    }
  }, [event_id]); 
    
    const handleCardClick = () => {
      navigate("/manage_team", { state: { team_id:team , team_name , team_description , max_members , team_admin_id , expectations , admin_expertise , commitment_role_id , eventName , team_member_id } });
    };
  return (
    <div 
    onClick={handleCardClick}
    className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-3/4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{team_name}</h2>
          <p className="text-sm text-gray-600">Event : {eventName}</p>
        </div>
       {/*<div className="flex flex-col m-1 text-right">
          <p className="text-sm text-gray-600 mb-1">Needs {max_members} members more</p>
        </div>*/}
      </div>
      <div className="mt-3 text-gray-700">
        {team_description}
      </div>
    </div>
  );
};

export default YourTeamCard;
