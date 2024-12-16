import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/thunks/eventThunk';
import { AppDispatch, RootState } from '../Redux/store';
import ProfileDisplayCard from './Profile_Display_Card';
import EventCard from './Event_Card';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../features/thunks/categoryThunk';

interface Category {
  id: number;
  name: string;
}

const EventTemplatePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(
    (state: RootState) => state.category
  );
  const { events, loading, error } = useSelector((state: RootState) => state.event);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0] || null);

  useEffect(() => {
    dispatch(fetchCategories()).catch(() => console.error('Failed to fetch categories'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleAddEvent = () => {
    navigate("/create_event");
  };

  const handleNavigateProfile = () => {
    navigate("/edit_profile")
  };

  const filteredEvents = events.filter((event) => {
    return selectedCategory?.id && event.event_category_id.includes(selectedCategory.id);
  });

  if (categoriesLoading) return <p>Loading categories...</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError}</p>;

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        
        <ProfileDisplayCard 
          avatarUrl="https://via.placeholder.com/150" 
          name="User Name" 
          profile_description="Welcome to your profile!" 
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2" onClick={handleNavigateProfile}>Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Teams</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Groups</button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md ${selectedCategory?.id === category.id ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              eventName={event.event_title}
              eventAdmin={'Admin'}
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
