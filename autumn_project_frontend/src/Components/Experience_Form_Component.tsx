import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchUserExperiences, addExperience, deleteExperience } from '../features/thunks/experiencesThunk';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number;
}

const ExperienceFormCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { experiences, loading, error } = useSelector((state: RootState) => state.experiences);

  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setProfileId(decodedToken.user_id);

        if (decodedToken.user_id) {
          dispatch(fetchUserExperiences(decodedToken.user_id));
        }
      } catch (error) {
        console.error('Failed to decode token or fetch user experiences:', error);
      }
    } else {
      console.error('User not authenticated. Access token missing.');
    }
  }, [dispatch]);

  const handleAddExperience = () => {
    if (!profileId) {
      console.error('User not authenticated. Cannot add experience.');
      return;
    }

    const newExperience = {
      experience_title: newTitle.trim(),
      experience_description: newDescription.trim(),
      profile: profileId,
    };

    dispatch(addExperience(newExperience));
    resetForm();
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setIsAdding(false);
  };

  const handleDeleteExperience = (experienceId: number) => {
    dispatch(deleteExperience(experienceId));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-xl font-bold">Experiences</h2>
        <button onClick={() => setIsAdding(true)} className="text-blue-500 text-lg focus:outline-none">
          <AiOutlinePlus />
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Experience</h3>
              <button onClick={() => setIsAdding(false)} className="text-red-500 focus:outline-none">
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Experience Title"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Experience Description"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleAddExperience}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {experiences.map((experience) => (
          <li
            key={experience.experience}
            className="flex justify-between items-center mb-2 p-2 border rounded-lg"
          >
            <div>
              <h3 className="font-semibold text-left ml-1">{experience.experience_title}</h3>
              <p className="text-sm text-gray-600 text-left ml-1">{experience.experience_description}</p>
            </div>
            <button
              onClick={() => handleDeleteExperience(experience.experience)}
              className="text-red-500 focus:outline-none ml-2 p-2"
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceFormCard;
