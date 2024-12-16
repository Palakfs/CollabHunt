import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export interface GroupData {
    group_name: string;
    member_id: number[];
    group_description: string;
  }

  export const createGroup = createAsyncThunk<void, GroupData, { rejectValue: string }>(
    'group/create',
    async (groupData, { rejectWithValue }) => {
      try {
        await axiosInstance.post('/create_group/', groupData);
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || 'Failed to create group');
        }
        return rejectWithValue('Something went wrong');
      }
    }
  );
  


export const fetchGroups = createAsyncThunk(
    'group/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get('/groups/');
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch groups');
      }
    }
  );
  
  export{}

  