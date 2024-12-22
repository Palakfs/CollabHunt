import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchProfiles = createAsyncThunk(
    'profiles/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/profiles/');  
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch profiles');
        }
    }
);
