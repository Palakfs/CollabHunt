import React from 'react';
import ProfileDisplayCard from './Profile_Display_Card';
import ContactDetailsFormCard from './Contact_Details_Form';
import SkillFormCard from './Skill_Form_Component';
import ProjectFormCard from './Project_Form_Card';
import ExperienceFormCard from './Experience_Form_Component';

interface EditProfileTemplatePageProps {
  profileData: {
    avatarUrl: string;
    name: string;
    profile_description: string;
  };
}

const EditProfileTemplatePage: React.FC<EditProfileTemplatePageProps> = ({ profileData }) => {
  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <ProfileDisplayCard
          avatarUrl={profileData.avatarUrl}
          name={profileData.name}
          profile_description={profileData.profile_description}
        />
        <div className="w-90">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">
            Your Teams
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-2 mb-2">
            Your Groups
          </button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col max-h-screen overflow-y-auto p-4">
        <div className="m-2">
          <ContactDetailsFormCard />
        </div>
        <div className="m-2">
          <SkillFormCard />
        </div>
        <div className="m-2">
          <ProjectFormCard />
        </div>
        <div className="m-2">
          <ExperienceFormCard />
        </div>
      </div>
    </div>
  );
};

export default EditProfileTemplatePage;
