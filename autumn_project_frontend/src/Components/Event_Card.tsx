import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';


interface EventCardProps {
  event_id: number;
  eventName: string;
  eventAdmin: string;
  linkForMoreDetails: string;
  eventDescription: string;
  eventDeadline: string;
}

const EventCard: React.FC<EventCardProps> = ({ eventName, eventAdmin, eventDescription, eventDeadline, linkForMoreDetails, event_id }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const profileResponse = await axiosInstance.get(`/get_user_profile/${eventAdmin}`);
        setUsername(profileResponse.data.full_name);
      } catch (err) {
        setErrorState('Error fetching user data');
        console.error('Error fetching user profile:', err);
      }
    };

    if (eventAdmin) {
      fetchUserData();
    }
  }, [eventAdmin]); 
  
  const handleCardClick = () => {
    navigate("/teams", { state: { event_id , eventName } });
  };
  return (
    
    <div 
    onClick={handleCardClick}
    className="bg-gray-100 rounded-lg shadow-md mb-4 p-4 m-2 w-9/10">
      <div className="flex justify-between items-start">
        <div className="flex flex-col m-1">
          <h2 className="text-lg font-semibold mb-1">{eventName}</h2>
          <p className="text-sm text-gray-600">Added by {username}</p>
        </div>
        <div className="flex flex-col m-1 text-right">
          <p className="text-sm text-gray-600 mb-1">Event Deadline: {eventDeadline}</p>
          <a href={linkForMoreDetails} className="text-blue-500 hover:underline">
            Link For More Details
          </a>
        </div>
      </div>
      <div className="mt-3 text-gray-700">
        {eventDescription}
      </div>
    </div>
  );
};

export default EventCard;
