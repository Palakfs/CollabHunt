import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { createEventRoute } from '../../route';

export interface EventData {
  event_title: string;
  event_category_id: number[];
  visible_to_group_id: number[];
  event_description: string;
  registration_deadline: string;
  additional_details_link: string;
}

export const createEvent = createAsyncThunk<void, EventData, { rejectValue: string }>(
  'event/create',
  async (eventData, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/create_event/', eventData);
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to create event');
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const fetchEvents = createAsyncThunk(
  'event/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/events/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export{}
