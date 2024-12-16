import React, { useState, useEffect } from 'react';
import ProfileDisplayCard from './Profile_Display_Card';
import ContactDetailsFormCard from './Contact_Details_Form';
import SkillFormCard from './Skill_Form_Component';
import ProjectFormCard from './Project_Form_Card';
import ExperienceFormCard from './Experience_Form_Component';
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

const EditProfileTemplatePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profile?.avatar_url||"https://via.placeholder.com/150"}
          name={profile?.full_name || 'User Name'}
          profile_description={'Welcome to your profile!'}
        />
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
