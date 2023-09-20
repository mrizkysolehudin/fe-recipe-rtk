import recipeReducer from "./recipeSlice";
import addRecipeReducer from "./addRecipeSlice";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	userAuth: authReducer,
	recipe: recipeReducer,
	addRecipe: addRecipeReducer,
});

export default rootReducer;
