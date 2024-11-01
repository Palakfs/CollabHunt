import React, { useState } from 'react';
import ProfileDisplayCard from './Profile_Display_Card';
import EventCard from './Event_Card';

interface TemplatePageProps {
  categories: string[];
  events: {
    category: string;
    eventName: string;
    eventAdmin: string;
    eventDescription: string;
    eventDeadline: string;
    linkForMoreDetails: string;
  }[];
  profileData: {
    avatarUrl: string;
    name: string;
    profile_description: string;
  };
}

const EventTemplatePage: React.FC<TemplatePageProps> = ({ categories, events, profileData }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredEvents = events.filter(event => event.category === selectedCategory);

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
     
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        
        <ProfileDisplayCard
          avatarUrl={profileData.avatarUrl}
          name={profileData.name}
          profile_description={profileData.profile_description}
        />
       <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2">Add Skills, Projects, and Experience</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Teams</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">Your Groups</button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-col space-y-4">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              eventName={event.eventName}
              eventAdmin={event.eventAdmin}
              eventDescription={event.eventDescription}
              eventDeadline={event.eventDeadline}
              linkForMoreDetails={event.linkForMoreDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventTemplatePage;
