import { createSlice } from '@reduxjs/toolkit';
import { createTeam, fetchTeams,getTeam , fetchAllTeams } from '../thunks/teamThunk';

interface TeamState {
  loading: boolean;
  error: string | null;
  teams: {
    team: number;
    team_name: string;
    team_description: string;
    team_member_id: number[];
    event_id: number;
    max_members:number;
    commitment_role_id:number;
    expectations: string;
    admin_expertise: string;
    team_admin_id: number; 
  }[];
}

const initialState: TeamState = {
  loading: false,
  error: null,
  teams: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to create team';
      })
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch teams';
      })
      .addCase(fetchAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch teams';
      })
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false;
        const team = action.payload; 
        state.teams = state.teams.map((t) => (t.team === team.team ? team : t));
    })
      .addCase(getTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Failed to fetch team';
      });
  },
});

export default teamSlice.reducer;
