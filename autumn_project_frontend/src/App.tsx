import React from 'react';
import './App.css';
import LoginPage from './Pages/Login';
import AddEventForm from './Pages/Add_an_event'; 
import CreateTeamForm from './Pages/Create_Team';
import CreateGroupForm from './Pages/Create_Group';
import PersonProfileCard from './Components/Person_Profile_Card';
import ManageTeam from './Components/Manage_Team';

export {}; 

function App() {
  
  const teamName = "TEAM NAME";
  const admin = {
    id: 1,
    avatarUrl: "https://via.placeholder.com/150",
    name: "Admin Name",
    profileLink: "/profile/admin",
  };

  const pendingRequests = [
    {
      id: 2,
      avatarUrl: "https://via.placeholder.com/150",
      name: "Person Name 1",
      profileLink: "/profile/1",
    },
    {
      id: 3,
      avatarUrl: "https://via.placeholder.com/150",
      name: "Person Name 2",
      profileLink: "/profile/2",
    },
    {
      id: 4,
      avatarUrl: "https://via.placeholder.com/150",
      name: "Person Name 3",
      profileLink: "/profile/3",
    },
  ];

  return (
    <div>
      <ManageTeam teamName={teamName} admin={admin} pendingRequests={pendingRequests} />
    </div>
  );
}

export default App;