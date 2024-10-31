import studentSlice from './studentSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    student: studentSlice,
  },
});
