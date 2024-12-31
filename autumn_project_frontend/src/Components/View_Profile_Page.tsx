import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { fetchUserProjects } from '../features/thunks/projectsThunk';
import { fetchUserExperiences } from '../features/thunks/experiencesThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Redux/store'; 

interface ProfileData {
  full_name: string | null;
  avatar_url: string | null;
  contact_number: number | null;
  email: string | null;
  skills: string[];
}

interface Project {
  project_title: string;
  project_description: string;
  start_date: string;
  end_date: string;
  attachments_url?: string;
}

interface Experience {
  experience_title: string;
  experience_description: string;
}

const ViewProfilePage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = location.state?.userId;

  const { projects, loading: projectsLoading, error: projectsError } = useSelector(
    (state: any) => state.projects
  );
  const { experiences, loading: experiencesLoading, error: experiencesError } = useSelector(
    (state: any) => state.experiences
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userId) throw new Error('User ID is not provided.');

        const response = await axiosInstance.get(`/get_user_profile/${userId}/`);
        console.log(response.data);
        setProfile(response.data);

        dispatch(fetchUserProjects(userId));
        dispatch(fetchUserExperiences(userId));
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex w-full h-screen p-4 bg-blue-100">
      <div className="w-1/3 flex flex-col space-y-4 p-4 flex-grow">
        <div className="relative flex flex-col items-center bg-blue-100 rounded-lg shadow-md p-4 m-2 w-90 h-72">
          <div className="relative">
            <img
              src={profile?.avatar_url || 'https://via.placeholder.com/150'}
              alt={profile?.full_name || 'User Name'}
              className="w-24 h-24 rounded-full bg-gray-200 mb-3 object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-3">{profile?.full_name || 'User Name'}</h3>
          <div className="bg-white p-2 rounded-lg shadow-sm w-full text-center mb-1">
            <p className="italic text-gray-700">Viewing Profile</p>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col max-h-screen overflow-y-auto p-4">
        {profile && (
          <>
            <div className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Contact Details</h2>
              <p>
                <strong>Contact Number:</strong> {profile.contact_number || 'N/A'}
              </p>
              <p>
                <strong>Email:</strong> {profile.email || 'N/A'}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-bold mb-2">Skills</h2>
              <ul>
                {profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
                ) : (
                  <p>No skills added.</p>
                )}
              </ul>
            </div>

            <div className="p-4 border rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-bold mb-2">Projects</h2>
              {projects?.length > 0 ? (
                <ul>
                  {projects.map((project: Project, index: number) => (
                    <li key={index} className="mb-4">
                      <div className='flex justify-between align-center'>
                        <div className='mr-96'>
                          <h3 className="font-semibold">{project.project_title}</h3>
                          <p className="text-sm text-gray-600">{project.project_description}</p>
                          <p className="text-sm text-gray-600">
                            {project.start_date} - {project.end_date}
                          </p>
                        </div>
                        <div className='ml-20 mr-4'>
                          {project.attachments_url && (
                            <img
                              src={project.attachments_url}
                              alt="Project Attachment"
                              className="w-20 h-20 object-cover mt-2"
                            />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No projects available.</p>
              )}
            </div>

            <div className="p-4 border rounded-lg shadow-md mt-4">
              <h2 className="text-xl font-bold mb-2">Experiences</h2>
              {experiences?.length > 0 ? (
                <ul>
                  {experiences.map((experience: Experience, index: number) => (
                    <li key={index} className="mb-4">
                      <h3 className="font-semibold">{experience.experience_title}</h3>
                      <p className="text-sm text-gray-600">{experience.experience_description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No experiences available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProfilePage;
