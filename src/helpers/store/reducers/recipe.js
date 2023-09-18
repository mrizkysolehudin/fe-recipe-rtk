import {
	EDIT_RECIPE_FAIL,
	EDIT_RECIPE_REQUEST,
	EDIT_RECIPE_SUCCESS,
	FETCH_RECIPE_DETAILS_FAIL,
	FETCH_RECIPE_DETAILS_REQUEST,
	FETCH_RECIPE_DETAILS_SUCCESS,
} from "../constants/recipe";

const initialState = {
	data: null,
	isLoading: false,
	error: null,
};

export const fetchRecipeDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_RECIPE_DETAILS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_RECIPE_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case FETCH_RECIPE_DETAILS_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const editRecipeReducer = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_RECIPE_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case EDIT_RECIPE_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case EDIT_RECIPE_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
