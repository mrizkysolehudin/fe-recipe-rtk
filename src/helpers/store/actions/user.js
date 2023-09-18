import { baseUrl } from "../../baseUrl";
import http, { httpFormData } from "../../http";
import {
	EDIT_USER_FAIL,
	EDIT_USER_REQUEST,
	EDIT_USER_SUCCESS,
	FETCH_USER_DETAILS_FAIL,
	FETCH_USER_DETAILS_REQUEST,
	FETCH_USER_DETAILS_SUCCESS,
} from "../constants/user";

export const fetchUserDetailsAction = (id) => async (dispatch) => {
	dispatch({ type: FETCH_USER_DETAILS_REQUEST });

	try {
		const token = localStorage.getItem("token");
		const response = await http(token).get(`${baseUrl}/users/${id}`);

		const result = response.data.data[0];
		dispatch({ type: FETCH_USER_DETAILS_SUCCESS, payload: result });
	} catch (error) {
		dispatch({ type: FETCH_USER_DETAILS_FAIL, error: error.message });
	}
};

export const editUserAction = (data, id) => async (dispatch) => {
	dispatch({ type: EDIT_USER_REQUEST });

	try {
		const token = localStorage.getItem("token");
		const response = await httpFormData(token).put(
			`${baseUrl}/users/${id}`,
			data,
		);

		const result = response.data.data;
		dispatch({ type: EDIT_USER_SUCCESS, payload: result });
	} catch (error) {
		dispatch({ type: EDIT_USER_FAIL, error: error.message });
	}
};
