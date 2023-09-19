import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginAction: (state) => {
			const token = localStorage.setItem("token");
			state.token = token;
		},

		logoutAction: (state) => {
			localStorage.removeItem("token");
			state.token = null;
		},
	},
});

export const { logoutAction, loginAction } = authSlice.actions;

export default authSlice.reducer;
