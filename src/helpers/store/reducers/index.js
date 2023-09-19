import { combineReducers } from "redux";
import { editRecipeReducer, fetchRecipeDetailsReducer } from "./recipe";
import { editUserReducer, fetchUserDetailsReducer } from "./user";

const initialState = {
	token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const rootReducer = combineReducers({
	auth: (state = initialState) => state,
	recipeDetails: fetchRecipeDetailsReducer,
	editRecipe: editRecipeReducer,
	userDetails: fetchUserDetailsReducer,
	editUser: editUserReducer,
});

export default rootReducer;
