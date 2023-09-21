import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../helpers/http";
import { baseUrl } from "../../../helpers/baseUrl";
import Swal from "sweetalert2";

const resetAddUser = createAction("user/reset/addUser");

export const addUserAction = createAsyncThunk(
	"user/addUser",
	async ({ data }, { rejectWithValue, dispatch }) => {
		try {
			if (data.password !== data.confirmPassword) {
				Swal.fire({
					title: "error",
					text: "Password and confirm password must be correct. Please try again.",
					icon: "error",
				});
				return rejectWithValue("Password and confirm password must be correct.");
			}

			if (
				data.name === "" ||
				data.email === "" ||
				data.phone === "" ||
				data.password === "" ||
				data.confirmPassword === ""
			) {
				Swal.fire({
					title: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return rejectWithValue("Input is empty");
			}

			const response = await http().post(`${baseUrl}/users/register`, data);

			if (response.data.data) {
				Swal.fire({
					title: "Register success",
					text: "Congratulations!",
					icon: "success",
				});

				setTimeout(() => {
					window.location.reload();
				}, 1000);

				dispatch(resetAddUser());
			}
		} catch (error) {
			Swal.fire({
				title: "Register error",
				text: "Please try again...",
				icon: "error",
			});

			return rejectWithValue("Add user error");
		}
	},
);

const addUserSlice = createSlice({
	name: "addUser",
	initialState: {
		isCreated: false,
		isLoading: false,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(addUserAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(resetAddUser, (state, action) => {
			state.isCreated = true;
		});

		builder.addCase(addUserAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isCreated = false;
		});

		builder.addCase(addUserAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default addUserSlice.reducer;
