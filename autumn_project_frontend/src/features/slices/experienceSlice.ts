import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserExperiences, addExperience, deleteExperience } from '../thunks/experiencesThunk';

export interface Experience {
  experience: number;
  experience_title: string;
  experience_description: string;
  profile: number; 
}

interface ExperiencesState {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperiencesState = {
  experiences: [],
  loading: false,
  error: null,
};

const experiencesSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserExperiences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserExperiences.fulfilled, (state, action: PayloadAction<Experience[]>) => {
        state.loading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchUserExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExperience.fulfilled, (state, action: PayloadAction<Experience>) => {
        state.loading = false;
        state.experiences.push(action.payload);
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExperience.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.experiences = state.experiences.filter(
          (experience) => experience.experience !== action.payload
        );
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default experiencesSlice.reducer;
