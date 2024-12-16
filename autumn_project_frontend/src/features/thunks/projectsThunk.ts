import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const BASE_URL = '/projects/'; 


export interface Project {
  project: number;
  project_title: string;
  project_description: string;
  start_date?: string;
  end_date?: string;
  attachments_url?: string;
  field?: string;
  profile: number; 
}


export const fetchUserProjects = createAsyncThunk<Project[], number>(
  'projects/fetchUserProjects',
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Project[]>(`${BASE_URL}?profile=${profileId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch projects');
    }
  }
);

interface AddProjectPayload {
    project_title: string;
    project_description: string;
    start_date: string;
    end_date: string;
    field: string;
    profile: number;
    attachments_url?: string | null; 
  }

export const addProject = createAsyncThunk<Project, AddProjectPayload>(
  'projects/addProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Project>(BASE_URL, projectData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to add project');
    }
  }
);


export const deleteProject = createAsyncThunk<number, number>(
  'projects/deleteProject',
  async (projectId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/projects/${projectId}/`);
      return projectId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete project');
    }
  }
);
