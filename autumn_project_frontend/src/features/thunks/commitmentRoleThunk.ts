import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchCommitmentRoles = createAsyncThunk(
  'commitmentRole/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/commitment_roles/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch commitment roles');
    }
  }
);

export{}

