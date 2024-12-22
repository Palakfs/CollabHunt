import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export interface TeamData {
  team_name: string;
  team_description: string;
  expectations: string;
  event_id: number; 
  team_member_id: number[];
  max_members: number;
  admin_expertise: string;
  commitment_role_id: number;
}


export const createTeam = createAsyncThunk<void, TeamData, { rejectValue: string }>(
  'team/create',
  async (teamData, { rejectWithValue }) => {
    try {
      const { event_id, ...data } = teamData; 
      await axiosInstance.post(`/create_team/${event_id}/`, data); 
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to create team');
      }
      return rejectWithValue('Something went wrong');
    }
  }
);


export const fetchTeams = createAsyncThunk<any[], { event_id: number }, { rejectValue: string }>(
  'team/fetchAll',
  async ({ event_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/teams/${event_id}/`); 
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch teams');
    }
  }
);

export {};
