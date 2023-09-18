import {
	EDIT_USER_FAIL,
	EDIT_USER_REQUEST,
	EDIT_USER_SUCCESS,
	FETCH_USER_DETAILS_FAIL,
	FETCH_USER_DETAILS_REQUEST,
	FETCH_USER_DETAILS_SUCCESS,
} from "../constants/user";

const initialState = {
	data: null,
	isLoading: false,
	error: null,
};

export const fetchUserDetailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_DETAILS_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case FETCH_USER_DETAILS_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case FETCH_USER_DETAILS_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};

export const editUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case EDIT_USER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case EDIT_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
			};
		case EDIT_USER_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
