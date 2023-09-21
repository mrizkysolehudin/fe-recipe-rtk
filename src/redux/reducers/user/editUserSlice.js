import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpFormData } from "../../../helpers/http";
import { baseUrl } from "../../../helpers/baseUrl";
import Swal from "sweetalert2";

const resetEditUser = createAction("user/reset/editUser");

export const editUserAction = createAsyncThunk(
	"user/editUser",
	async ({ data, image, id }, { rejectWithValue, dispatch }) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				Swal.fire({
					title: "Edit user fail",
					text: "Please re-login and try again later...",
					icon: "error",
				});
				return rejectWithValue("No token");
			}

			if (
				data.name === "" ||
				data.email === "" ||
				data.phone === "" ||
				image === ""
			) {
				Swal.fire({
					name: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return rejectWithValue("Input is empty");
			}

			const formData = new FormData();
			formData.append("user_id", id);
			formData.append("name", data?.name);
			formData.append("email", data?.email);
			formData.append("phone", data?.phone);
			formData.append("photo", image);

			const response = await httpFormData(token).put(
				`${baseUrl}/users/${id}`,
				formData,
			);

			if (response.data.data) {
				Swal.fire({
					name: "Edit user success",
					text: "Congratulations!",
					icon: "success",
				});
				setTimeout(() => {
					window.location.reload();
				}, 1000);

				dispatch(resetEditUser());
			}
		} catch (error) {
			Swal.fire({
				name: "Edit user error",
				text: "Please try again later...",
				icon: "error",
			});

			return rejectWithValue("Edit user error");
		}
	},
);

const editRecipeSlice = createSlice({
	name: "editUser",
	initialState: {
		isEdited: false,
		isLoading: false,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(editUserAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(resetEditUser, (state, action) => {
			state.isEdited = true;
		});

		builder.addCase(editUserAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isEdited = false;
		});

		builder.addCase(editUserAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default editRecipeSlice.reducer;
