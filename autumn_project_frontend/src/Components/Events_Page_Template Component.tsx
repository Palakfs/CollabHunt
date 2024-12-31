import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/thunks/eventThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import EventCard from './Event_Card';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../features/thunks/categoryThunk';
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

interface Category {
  id: number;
  name: string;
}

const EventTemplatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state: RootState) => state.category
  );
  const { events, error } = useSelector((state: RootState) => state.event);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  if (loading || categoriesLoading) return <div>Loading...</div>;
  if (categoriesError) return <div>Error loading categories: {categoriesError}</div>;
  if (error) return <div>Error loading events: {error}</div>;

  const handleAddEvent = () => navigate('/create_event');
  const handleNavigateProfile = () => navigate('/edit_profile');
  const handleAddGroup = () => navigate('/create_group');
  const handleGroup = () => navigate('/groups');
  const handleTeam = () => navigate('/teams');
  const handleYourTeams = () => navigate('/your_teams');

  const filteredEvents = events.filter((event) =>
    selectedCategory?.id && event.event_category_id.includes(selectedCategory.id)
  );

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profile?.avatar_url || 'https://via.placeholder.com/150'}
          name={profile?.full_name || 'User Name'}
          profile_description={'Welcome to your profile!'}
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
            onClick={handleYourTeams}
          >
            Your Teams
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
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory?.id === category.id ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              event_id={event.event}
              eventName={event.event_title}
              eventAdmin={event.event_admin}
              eventDescription={event.event_description}
              eventDeadline={new Date(event.registration_deadline).toLocaleDateString()}
              linkForMoreDetails={event.additional_details_link}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleAddEvent}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default EventTemplatePage;
