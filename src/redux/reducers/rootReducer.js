import recipeReducer from "./recipeSlice";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	userAuth: authReducer,
	recipe: recipeReducer,
});

export default rootReducer;
