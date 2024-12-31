
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfiles } from '../thunks/profileThunk';

interface Profile {
  username: number;
  full_name: string;
  
}

interface ProfileState {
  profiles: Profile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action: PayloadAction<Profile[]>) => {
        state.loading = false;
        state.profiles = action.payload;  
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
