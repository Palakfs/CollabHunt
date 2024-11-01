import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const SkillFormCard: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setIsAdding(false);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-xl font-bold">Skills</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="text-blue-500 text-lg focus:outline-none"
        >
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
          <button
            onClick={addSkill}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      )}
      
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="text-red-500 focus:outline-none"
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillFormCard;
