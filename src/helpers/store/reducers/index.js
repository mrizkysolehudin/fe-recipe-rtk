import { combineReducers } from "redux";
import { editRecipeReducer, fetchRecipeDetailsReducer } from "./recipe";
import { editUserReducer, fetchUserDetailsReducer } from "./user";

const rootReducer = combineReducers({
	recipeDetails: fetchRecipeDetailsReducer,
	editRecipe: editRecipeReducer,
	userDetails: fetchUserDetailsReducer,
	editUser: editUserReducer,
});

export default rootReducer;
