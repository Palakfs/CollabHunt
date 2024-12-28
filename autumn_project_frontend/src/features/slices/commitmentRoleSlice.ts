import { createSlice } from '@reduxjs/toolkit';
import { fetchCommitmentRoles } from '../thunks/commitmentRoleThunk';

interface CommitmentRoleState {
  commitments: { id: number; name: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: CommitmentRoleState = {
  commitments: [],
  loading: false,
  error: null,
};

const commitmentRoleSlice = createSlice({
  name: 'commitment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommitmentRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommitmentRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.commitments = action.payload.map((cat: any) => ({
          id: cat.commitment_role,
          name: cat.role_name,
        }));
      })
      .addCase(fetchCommitmentRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commitmentRoleSlice.reducer;
