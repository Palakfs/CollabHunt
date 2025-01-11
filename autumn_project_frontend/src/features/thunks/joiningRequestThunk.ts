import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export interface joiningRequestData{
    team_id : number;
    is_accepted : boolean;
    is_reviewed : boolean;
}

export interface JoiningRequest {
  joining_request: number;
  team_id: number;
  is_accepted: boolean;
  is_reviewed: boolean;
  sender_id: number;
}




export const fetchJoiningRequests = createAsyncThunk<any[], { team_id: number }, { rejectValue: string }>(
    'team/fetchJoiningRequests',
    async ({ team_id }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/requests/${team_id}/`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch joining requests');
      }
    }
  );
  


  export const createJoiningRequest = createAsyncThunk<void, joiningRequestData, { rejectValue: string }>(
    'request/create',
    async (joiningRequestData, { rejectWithValue }) => {
      try {
        const { team_id, ...data } = joiningRequestData; 
        await axiosInstance.post(`/create_request/${team_id}/`, data); 
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message || 'Failed to send request');
        }
        return rejectWithValue('Something went wrong');
      }
    }
  );

  export const reviewJoiningRequest = createAsyncThunk<
  JoiningRequest,
  { requestId: number; is_accepted: boolean },
  { rejectValue: string }
>(
  'joiningRequest/review',
  async ({ requestId, is_accepted }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/review_request/${requestId}/`, {
        is_reviewed: true,
        is_accepted,
      });
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to review request');
    }
  }
);
