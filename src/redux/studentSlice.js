
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((value) => value.id !== action.payload);
    },
    clear: (state) => {
      state.value.length = 0;
    },
    update: (state, action) => {
      const index = state.value.findIndex((value) => value.id === action.payload.id);
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
    updateName: (state, action) => {
      const index = state.value.findIndex((value) => value.id === action.payload.id);
      if (index !== -1) {
        state.value[index].name = action.payload.name;
      }
    },
    updateAge: (state, action) => {
      const index = state.value.findIndex((value) => value.id === action.payload.id);
      if (index !== -1) {
        state.value[index].age = action.payload.age;
      }
    },
  },
});

export const { add, remove, clear, update, updateName, updateAge } = studentSlice.actions;
export default studentSlice.reducer;
