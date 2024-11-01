import React from 'react';
import './App.css';
import LoginPage from './Pages/Login';
import AddEventForm from './Pages/Add_an_event'; 
import CreateTeamForm from './Pages/Create_Team';
import CreateGroupForm from './Pages/Create_Group';
import PersonProfileCard from './Components/Person_Profile_Card';
import ManageTeam from './Components/Manage_Team';
import EventCard from './Components/Event_Card';
import ProfileDisplayCard from './Components/Profile_Display_Card';
import EventTemplatePage from './Components/Events_Page_Template Component';
import TeamCard from './Components/Team_Card';
import TeamTemplatePage from './Components/Teams_Page_Template';

export {}; 

function App() {
  const sampleProfileData = {
    avatarUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    profile_description: "This is the user's description."
  };

  const sampleTeams = [
    {
      teamName: "Team Alpha",
      teamAdmin: "Alice Smith",
      teamDescription: "A team focused on AI and Machine Learning.",
      vacancy: "2",
      teamProfileLink: "/team-alpha",
      eventName: "Hackathon 2024"
    },
    {
      teamName: "Team Beta",
      teamAdmin: "Bob Johnson",
      teamDescription: "A team working on Web Development projects.",
      vacancy: "3",
      teamProfileLink: "/team-beta",
      eventName: "Hackathon 2024"
    }
  ];

  const sampleEventName = "Hackathon 2024";

  return (
    <div>
      <TeamTemplatePage
        teams={sampleTeams}
        profileData={sampleProfileData}
        eventName={sampleEventName}
      />
    </div>
  );
};

export default App;