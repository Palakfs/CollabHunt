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
import GroupTemplatePage from './Components/Groups_Page_Template';
import ContactDetailsFormCard from './Components/Contact_Details_Form';
import SkillFormCard from './Components/Skill_Form_Component';
import ExperienceFormCard from './Components/Experience_Form_Component';
import ProjectFormCard from './Components/Project_Form_Card';
import EditProfileTemplatePage from './Components/Edit_Profile_Component';

export {}; 

function App() {
  const sampleProfileData = {
    avatarUrl: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    profile_description: 'A brief description about John.',
  };
  
  return (
    <div className="App">
    <EditProfileTemplatePage profileData={sampleProfileData} />
  </div>
  );
}

export default App;