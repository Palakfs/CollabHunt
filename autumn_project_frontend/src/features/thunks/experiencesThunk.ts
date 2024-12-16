import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

const BASE_URL = '/experiences/'; 

export interface Experience {
  experience: number;
  experience_title: string;
  experience_description: string;
  profile: number; 
}

export const fetchUserExperiences = createAsyncThunk<Experience[], number>(
  'experiences/fetchUserExperiences',
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<Experience[]>(`${BASE_URL}?profile=${profileId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch experiences');
    }
  }
);

interface AddExperiencePayload {
  experience_title: string;
  experience_description: string;
  profile: number;
}

export const addExperience = createAsyncThunk<Experience, AddExperiencePayload>(
  'experiences/addExperience',
  async (experienceData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<Experience>(BASE_URL, experienceData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to add experience');
    }
  }
);

export const deleteExperience = createAsyncThunk<number, number>(
  'experiences/deleteExperience',
  async (experienceId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/experiences/${experienceId}/`);
      return experienceId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete experience');
    }
  }
);
