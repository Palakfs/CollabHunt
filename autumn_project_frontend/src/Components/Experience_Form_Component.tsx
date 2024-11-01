import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface Experience {
  title: string;
  description: string;
}

const ExperienceFormCard: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addExperience = () => {
    if (newTitle.trim() && newDescription.trim()) {
      setExperiences([
        ...experiences,
        { title: newTitle.trim(), description: newDescription.trim() },
      ]);
      setNewTitle('');
      setNewDescription('');
      setIsAdding(false);
    }
  }
  
  const removeExperience = (indexToRemove: number) => {
    setExperiences(experiences.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-xl font-bold">Experiences</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="text-blue-500 text-lg focus:outline-none"
        >
          <AiOutlinePlus />
        </button>
      </div>
      
      {isAdding && (
        <div className="mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addExperience}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
          >
            Add Experience
          </button>
        </div>
      )}
      
      <ul>
        {experiences.map((experience, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
            <div>
              <h3 className="font-semibold">{experience.title}</h3>
              <p className="text-sm text-gray-600">{experience.description}</p>
            </div>
            <button
              onClick={() => removeExperience(index)}
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

export default ExperienceFormCard;
