import recipeReducer from "./recipe/recipeSlice";
import addRecipeReducer from "./recipe/addRecipeSlice";
import editRecipeReducer from "./recipe/editRecipeSlice";
import getOneRecipeReducer from "./recipe/getOneRecipe";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	userAuth: authReducer,
	recipe: recipeReducer,
	addRecipe: addRecipeReducer,
	editRecipe: editRecipeReducer,
	getOneRecipe: getOneRecipeReducer,
});

export default rootReducer;
