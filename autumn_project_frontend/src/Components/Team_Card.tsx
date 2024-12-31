import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


interface TeamCardProps {
  team:number,
  team_name: string;
  team_admin_id: number;
  team_description: string;
  max_members: number;
  expectations : string,
  admin_expertise : string,
  commitment_role_id : number,
  team_member_id : number[]
}

const TeamCard: React.FC<TeamCardProps> = ({ team_name, team_admin_id, team_description,max_members,team, admin_expertise , expectations , commitment_role_id , team_member_id}) => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const profileResponse = await axiosInstance.get(`/get_user_profile/${team_admin_id}`);
        setUsername(profileResponse.data.full_name);
      } catch (err) {
        setErrorState('Error fetching user data');
        console.error('Error fetching user profile:', err);
      }
    };

    if (team_admin_id) {
      fetchUserData();
    }
  }, [team_admin_id]); 

    const handleCardClick = () => {
      navigate("/team", { state: { team_id:team , team_name , team_description , max_members , team_admin_id , expectations , admin_expertise , commitment_role_id, team_member_id} });
    };
  return (
    <div 
    onClick={handleCardClick}
    className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-3/4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{team_name}</h2>
          <p className="text-sm text-gray-600">Created by {username}</p>
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

export default TeamCard;
