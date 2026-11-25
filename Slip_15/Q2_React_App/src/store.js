import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducer.js";

const store = configureStore({ reducer: counterReducer });
export default store;
