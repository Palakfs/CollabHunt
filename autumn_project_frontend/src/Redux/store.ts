import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/slices/userSlice'
import eventReducer from '../features/slices/eventSlice'
import categoryReducer from '../features/slices/categorySlice'
import groupReducer from '../features/slices/groupSlice'
import projectsReducer from '../features/slices/projectsSlice'
import experienceReducer from '../features/slices/experienceSlice'

const store = configureStore({
  reducer: {
    user:userReducer ,
    event:eventReducer,
    category : categoryReducer,
    group : groupReducer,
    projects: projectsReducer,
    experiences : experienceReducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
