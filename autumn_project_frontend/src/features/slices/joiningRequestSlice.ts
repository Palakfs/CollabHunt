import { createSlice } from '@reduxjs/toolkit';
import { createJoiningRequest, fetchJoiningRequests , reviewJoiningRequest } from '../thunks/joiningRequestThunk';

interface JoiningRequest {
  joining_request: number;
  team_id: number;
  is_accepted: boolean;
  is_reviewed: boolean;
  sender_id : number;
}

interface RequestState {
  loading: boolean;
  error: string | null;
  joiningRequests: JoiningRequest[];
}

const initialState: RequestState = {
  loading: false,
  error: null,
  joiningRequests: [],
};

const joiningRequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJoiningRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJoiningRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createJoiningRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to send request';
      })
      .addCase(fetchJoiningRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJoiningRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.joiningRequests = action.payload;
      })
      .addCase(fetchJoiningRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch requests';
      })
      .addCase(reviewJoiningRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewJoiningRequest.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRequest = action.payload;
        const index = state.joiningRequests.findIndex(
          (request) => request.joining_request === updatedRequest.joining_request
        );
        if (index !== -1) {
          state.joiningRequests[index] = updatedRequest;
        }
      })
      .addCase(reviewJoiningRequest.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Failed to review request';
      });
  },
});

export default joiningRequestSlice.reducer;
