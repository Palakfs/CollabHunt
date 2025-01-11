import React, { useState, useEffect } from 'react';
import ProfileDisplayCard from './Profile_Display_Card';
import ContactDetailsFormCard from './Contact_Details_Form';
import SkillFormCard from './Skill_Form_Component';
import ProjectFormCard from './Project_Form_Card';
import ExperienceFormCard from './Experience_Form_Component';
import axiosInstance from '../utils/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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

const EditProfileTemplatePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate()

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleGroup = () => navigate('/groups');
  const handleEvents = () => navigate('/events');
  const handleYourTeams = () => navigate('/your_teams');

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profile?.avatar_url||"https://via.placeholder.com/150"}
          name={profile?.full_name || 'User Name'}
          profile_description={'Welcome to your profile!'}
        />
        <div className="w-90">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2 mt-2"
            onClick={handleEvents}
          >
            Events
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

      <div className="w-2/3 flex flex-col max-h-screen overflow-y-auto p-4">
        {profile && <ContactDetailsFormCard profile={profile} onProfileUpdate={fetchProfile} />}
        {profile && <SkillFormCard currentSkills={profile.skills} onSkillsUpdate={fetchProfile} />}
        <ProjectFormCard />
        <ExperienceFormCard />
      </div>
    </div>
  );
};

export default EditProfileTemplatePage;
