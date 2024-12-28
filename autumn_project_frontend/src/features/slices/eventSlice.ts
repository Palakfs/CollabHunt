import { createSlice } from '@reduxjs/toolkit';
import { createEvent, fetchEvents } from '../thunks/eventThunk';

interface EventState {
  loading: boolean;
  error: string | null;
  events: {
    event: number;
    event_title: string;
    event_category_id: number[];
    visible_to_group_id: number[];
    event_description: string;
    registration_deadline: string;
    additional_details_link: string;
    event_admin: string;
  }[];
}

const initialState: EventState = {
  loading: false,
  error: null,
  events: [],
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create event';
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch events';
      });
  },
});

export default eventSlice.reducer;
