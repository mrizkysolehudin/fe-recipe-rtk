import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../helpers/http";
import { baseUrl } from "../../../helpers/baseUrl";
import Swal from "sweetalert2";

const resetEditRecipe = createAction("recipe/reset/editRecipe");

export const editRecipeAction = createAsyncThunk(
	"recipe/editRecipe",
	async ({ data, image, id }, { rejectWithValue, dispatch }) => {
		try {
			const user_id = localStorage.getItem("user_id");
			const token = localStorage.getItem("token");
			if (!token) {
				Swal.fire({
					title: "Edit recipe fail",
					text: "Please re-login and try again later...",
					icon: "error",
				});
				return rejectWithValue("No token");
			}

			if (
				data.title === "" ||
				data.ingredients === "" ||
				data.video === "" ||
				image === ""
			) {
				Swal.fire({
					title: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return rejectWithValue("Input is empty");
			}

			const formData = new FormData();
			formData.append("user_id", user_id);
			formData.append("title", data?.title);
			formData.append("ingredients", data?.ingredients);
			formData.append("video", data?.video);
			formData.append("image", image);

			const response = await http(token).put(`${baseUrl}/recipe/${id}`, formData);

			if (response.data.data) {
				Swal.fire({
					title: "Edit recipe success",
					text: "Congratulations!",
					icon: "success",
				});

				dispatch(resetEditRecipe());
			}
		} catch (error) {
			if (error.response && error.response.status === 413) {
				Swal.fire({
					title: "Input image error",
					text: "File size should be less than 2MB",
					icon: "error",
				});

				return rejectWithValue("Input image recipe error");
			}

			Swal.fire({
				title: "Edit recipe error",
				text: "Please try again later...",
				icon: "error",
			});

			return rejectWithValue("Add recipe error");
		}
	},
);

const editRecipeSlice = createSlice({
	name: "editRecipe",
	initialState: {
		isEdited: false,
		isLoading: false,
		isError: false,
	},
	extraReducers: (builder) => {
		builder.addCase(editRecipeAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(resetEditRecipe, (state, action) => {
			state.isEdited = true;
		});

		builder.addCase(editRecipeAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isEdited = false;
		});

		builder.addCase(editRecipeAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default editRecipeSlice.reducer;
