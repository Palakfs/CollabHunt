import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/slices/userSlice'
import eventReducer from '../features/slices/eventSlice'
import categoryReducer from '../features/slices/categorySlice'
import groupReducer from '../features/slices/groupSlice'
import projectsReducer from '../features/slices/projectsSlice'
import experienceReducer from '../features/slices/experienceSlice'
import profileReducer from '../features/slices/profileSlice'
import commitmentRoleReducer from '../features/slices/commitmentRoleSlice'
import teamReducer from '../features/slices/teamSlice'
import joiningRequestReducer from '../features/slices/joiningRequestSlice'

const store = configureStore({
  reducer: {
    user:userReducer ,
    event:eventReducer,
    category : categoryReducer,
    group : groupReducer,
    projects: projectsReducer,
    experiences : experienceReducer,
    profile : profileReducer,
    commitment : commitmentRoleReducer,
    team : teamReducer,
    joiningRequest : joiningRequestReducer ,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
