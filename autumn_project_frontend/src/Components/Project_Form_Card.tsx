import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { fetchUserProjects, addProject, deleteProject } from '../features/thunks/projectsThunk';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  user_id: number;
}

const ProjectFormCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, error } = useSelector((state: RootState) => state.projects);

  const [newTopic, setNewTopic] = useState<string>('');
  const [newField, setNewField] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [profileId, setProfileId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setProfileId(decodedToken.user_id);

        if (decodedToken.user_id) {
          dispatch(fetchUserProjects(decodedToken.user_id));
        }
      } catch (error) {
        console.error('Failed to decode token or fetch user projects:', error);
      }
    } else {
      console.error('User not authenticated. Access token missing.');
    }
  }, [dispatch]);

  const handleAddProject = () => {
    if (!profileId) {
      console.error('User not authenticated. Cannot add project.');
      return;
    }

    const newProject = {
      project_title: newTopic.trim(),
      project_description: description.trim(),
      start_date: startDate,
      end_date: endDate,
      field: newField.trim(),
      profile: profileId,
      attachments_url: imagePreview, 
    };

    dispatch(addProject(newProject));
    resetForm();
  };

  const resetForm = () => {
    setNewTopic('');
    setNewField('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setImage(null);
    setImagePreview(null);
    setIsAdding(false);
  };

  const handleDeleteProject = (projectId: number) => {
    dispatch(deleteProject(projectId));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

   
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
                placeholder="Project Title"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                placeholder="Field of Project"
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg"
                />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full p-2 border rounded-lg"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded-lg" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2" />
              )}
              <button
                onClick={handleAddProject}
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
        {projects.map((project) => (
          <li
            key={project.project}
            className="flex justify-between items-center mb-2 p-2 border rounded-lg"
          >
            <div>
              <h3 className="font-semibold text-left ml-1">
                {project.project_title} in {project.field}
              </h3>
              <p className="text-sm text-gray-600 text-left ml-1">
                {project.start_date} - {project.end_date}
              </p>
              <p className="text-sm text-gray-600 text-left ml-1">{project.project_description}</p>
              {project.attachments_url && (
                <img
                  src={project.attachments_url}
                  alt="Project Attachment"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>
            <button
              onClick={() => handleDeleteProject(project.project)}
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

export default ProjectFormCard;
