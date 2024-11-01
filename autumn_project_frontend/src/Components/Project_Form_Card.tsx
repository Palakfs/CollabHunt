import React, { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface Project {
  topic: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: File | null;
}

const ProjectFormCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newTopic, setNewTopic] = useState<string>('');
  const [newField, setNewField] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addProject = () => {
    if (newTopic.trim() && newField.trim() && startDate && endDate && description.trim()) {
      setProjects([
        ...projects,
        {
          topic: newTopic.trim(),
          field: newField.trim(),
          startDate,
          endDate,
          description: description.trim(),
          image,
        },
      ]);
      resetForm();
    }
  };


  const resetForm = () => {
    setNewTopic('');
    setNewField('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setImage(null);
    setIsAdding(false);
  };

  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  
  const removeProject = (indexToRemove: number) => {
    setProjects(projects.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-left text-xl font-bold">Projects</h2>
        <button onClick={() => setIsAdding(true)} className="text-blue-500 text-lg focus:outline-none">
          <AiOutlinePlus />
        </button>
      </div>


      {isAdding && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Project</h3>
              <button onClick={() => setIsAdding(false)} className="text-red-500 focus:outline-none">
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Project Topic"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                placeholder="Field of Project"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addProject}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <ul>
        {projects.map((project, index) => (
          <li key={index} className="flex justify-between items-center mb-2 p-2 border rounded-lg">
            <div>
              <h3 className="font-semibold text-left ml-1">{project.topic} in {project.field}</h3>
              <p className="text-sm text-gray-600 text-left ml-1">
                {project.startDate} - {project.endDate}
              </p>
              <p className="text-sm text-gray-600 text-left ml-1">{project.description}</p>
              
            </div>
            <div className='flex flex-row justify-start items-center m-1'>
            
            {project.image && (
                <img
                  src={URL.createObjectURL(project.image)}
                  alt="Project"
                  className="w-16 h-16 object-cover mt-2 rounded-lg"
                />
              )}
              <button
              onClick={() => removeProject(index)}
              className="text-red-500 focus:outline-none  ml-2 mr-2 p-2"
            >
              <AiOutlineClose />
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectFormCard;
