import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./refreshSlice";

const store = configureStore({
  reducer: {
    refresh: refreshReducer,
  },
});

export default store;
