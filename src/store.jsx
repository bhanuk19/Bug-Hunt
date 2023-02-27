import { configureStore } from "@reduxjs/toolkit";
import bugSetReducer from "./reducers/selectBug";
export default configureStore({
  reducer: { selectedBug: bugSetReducer },
});
