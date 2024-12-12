import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: { refresh: false },
  reducers: {
    toggleRefresh: (state) => {
      state.refresh = !state.refresh; // Toggle the refresh state
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload; // Set refresh explicitly
    },
  },
});

export const { toggleRefresh, setRefresh } = refreshSlice.actions;
export default refreshSlice.reducer;
