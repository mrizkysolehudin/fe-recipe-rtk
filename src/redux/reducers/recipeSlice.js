import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";

export const selectToken = (state) => state.auth.token;

export const getAllRecipesAction = createAsyncThunk(
	"recipe/getAllRecipes",
	async (search, { rejectWithValue }) => {
		try {
			const response = await http().get(`${baseUrl}/recipe?search=${search}`);

			return response.data.data;
		} catch (error) {
			if (error) throw error;
			return rejectWithValue(error);
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
	},
});

export default recipeSlice.reducer;
