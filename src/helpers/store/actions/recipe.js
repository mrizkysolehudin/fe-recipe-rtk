import { baseUrl } from "../../baseUrl";
import http, { httpFormData } from "../../http";
import {
	EDIT_RECIPE_FAIL,
	EDIT_RECIPE_REQUEST,
	EDIT_RECIPE_SUCCESS,
	FETCH_RECIPE_DETAILS_FAIL,
	FETCH_RECIPE_DETAILS_REQUEST,
	FETCH_RECIPE_DETAILS_SUCCESS,
} from "../constants/recipe";

export const fetchRecipeDetailsAction = (id) => async (dispatch) => {
	dispatch({ type: FETCH_RECIPE_DETAILS_REQUEST });

	try {
		const response = await http().get(`${baseUrl}/recipe/${id}`);

		const result = response.data.data[0];
		dispatch({ type: FETCH_RECIPE_DETAILS_SUCCESS, payload: result });
	} catch (error) {
		dispatch({ type: FETCH_RECIPE_DETAILS_FAIL, error: error.message });
	}
};

export const editRecipeAction = (data, id) => async (dispatch) => {
	dispatch({ type: EDIT_RECIPE_REQUEST });

	try {
		const token = localStorage.getItem("token");
		const response = await httpFormData(token).put(
			`${baseUrl}/recipe/${id}`,
			data,
		);

		const result = response.data.data;
		dispatch({ type: EDIT_RECIPE_SUCCESS, payload: result });
	} catch (error) {
		dispatch({ type: EDIT_RECIPE_FAIL, error: error.message });
	}
};
