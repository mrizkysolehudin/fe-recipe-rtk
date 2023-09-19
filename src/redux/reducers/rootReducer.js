import recipeReducer from "./recipeSlice";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	auth: authReducer,
	recipe: recipeReducer,
});

export default rootReducer;
