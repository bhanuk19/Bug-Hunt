import { createSlice } from "@reduxjs/toolkit";
export const bugSetter = createSlice({
  name: "selectedBug",
  initialState: {
    value: null,
  },
  reducers: {
    setSelected: (state, action) => {
      state.value = action.payload
    },
    
  },
});
export const { setSelected } = bugSetter.actions;
export default bugSetter.reducer;
