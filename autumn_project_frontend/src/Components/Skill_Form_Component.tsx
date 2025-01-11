import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../utils/axiosInstance';

interface JwtPayload {
  user_id: string;
}

interface SkillFormCardProps {
  currentSkills: string[];
  onSkillsUpdate: () => void;
}

const SkillFormCard: React.FC<SkillFormCardProps> = ({ currentSkills, onSkillsUpdate }) => {
  const [skills, setSkills] = useState<string[]>(currentSkills);
  const [newSkill, setNewSkill] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSkill = async () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      setIsAdding(false);

      await updateSkills(updatedSkills);
    }
  };

  const removeSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);

    await updateSkills(updatedSkills);
  };

  
  const updateSkills = async (updatedSkills: string[]) => {
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      let userId: string | null = null;

      if (token) {
        const decodedToken = jwtDecode<JwtPayload>(token);
        userId = decodedToken.user_id;
      } else {
        throw new Error('User not authenticated. Access token missing.');
      }

      if (userId) {
      
        await axiosInstance.patch(`/get_user_profile/${userId}/`, {
          skills: updatedSkills,
        });
        setError(null);
        onSkillsUpdate(); 
      }
    } catch (err) {
      console.error('Failed to update skills:', err);
      setError('Failed to update skills.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-xl font-bold">Skills</h2>
        <button onClick={() => setIsAdding(true)} className="text-blue-500 text-lg focus:outline-none">
          <AiOutlinePlus />
        </button>
      </div>

      {isAdding && (
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter skill"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={addSkill} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            Add
          </button>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
            <span>{skill}</span>
            <button onClick={() => removeSkill(skill)} className="text-red-500 focus:outline-none">
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => updateSkills(skills)}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default SkillFormCard;
