import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../../helpers/http";
import { baseUrl } from "../../../helpers/baseUrl";

export const getOneUserAction = createAsyncThunk(
	"user/getOneUser",
	async (id, { rejectWithValue }) => {
		try {
			const response = await http().get(`${baseUrl}/users/${id}`);

			return response.data.data[0];
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);

const getOneUserSlice = createSlice({
	name: "getOneUser",
	initialState: {
		isLoading: false,
		isError: false,
		data: null,
	},
	extraReducers: (builder) => {
		builder.addCase(getOneUserAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(getOneUserAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action?.payload;
		});

		builder.addCase(getOneUserAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default getOneUserSlice.reducer;
