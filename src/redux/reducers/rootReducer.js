import recipeReducer from "./recipe/recipeSlice";
import addRecipeReducer from "./recipe/addRecipeSlice";
import editRecipeReducer from "./recipe/editRecipeSlice";
import addUserReducer from "./user/addUserSlice";
import getOneRecipeReducer from "./recipe/getOneRecipe";
import getOneUserReducer from "./user/getOneUser";
import editUserReducer from "./user/editUserSlice";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	userAuth: authReducer,
	getOneUser: getOneUserReducer,
	editUser: editUserReducer,
	addUser: addUserReducer,
	recipe: recipeReducer,
	addRecipe: addRecipeReducer,
	editRecipe: editRecipeReducer,
	getOneRecipe: getOneRecipeReducer,
});

export default rootReducer;
