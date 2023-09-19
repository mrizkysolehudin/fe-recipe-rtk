import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";
import Swal from "sweetalert2";

export const selectToken = (state) => state.auth.token;

export const getAllRecipesAction = createAsyncThunk(
	"recipe/getAllRecipes",
	async (search, { rejectWithValue }) => {
		try {
			const response = await http().get(`${baseUrl}/recipe?search=${search}`);

			return response.data.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

export const deleteRecipeAction = createAsyncThunk(
	"recipe/deleteRecipe",
	async (id, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				Swal.fire({
					title: "Delete recipe fail",
					text: "Please re-login and try again later...",
					icon: "error",
				});
				return rejectWithValue("No token");
			}

			await http(token).delete(`${baseUrl}/recipe/${id}`);

			Swal.fire({
				title: "Delete recipe success",
				text: "Congratulations!",
				icon: "success",
			});
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			Swal.fire({
				title: "Delete recipe fail",
				text: "Please try again later...",
				icon: "error",
			});

			return rejectWithValue(error.message);
		}
	},
);

const recipeSlice = createSlice({
	name: "recipe",
	initialState: {},
	extraReducers: (builder) => {
		builder.addCase(getAllRecipesAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(getAllRecipesAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action?.payload;
		});

		builder.addCase(getAllRecipesAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});

		// delete
		builder.addCase(deleteRecipeAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(deleteRecipeAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isDelete = true;
		});

		builder.addCase(deleteRecipeAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default recipeSlice.reducer;
