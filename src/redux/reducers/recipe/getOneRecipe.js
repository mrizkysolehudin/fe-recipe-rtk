import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../helpers/http";
import { baseUrl } from "../../../helpers/baseUrl";

export const getOneRecipeAction = createAsyncThunk(
	"recipe/getOneRecipe",
	async (id, { rejectWithValue }) => {
		try {
			const response = await http().get(`${baseUrl}/recipe/${id}`);

			return response.data.data[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const getOneRecipeSlice = createSlice({
	name: "getOneRecipe",
	initialState: {
		isLoading: false,
		isError: false,
		data: null,
	},
	extraReducers: (builder) => {
		builder.addCase(getOneRecipeAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(getOneRecipeAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action?.payload;
		});

		builder.addCase(getOneRecipeAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default getOneRecipeSlice.reducer;
