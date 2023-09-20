import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";
import Swal from "sweetalert2";

const resetAddRecipe = createAction("recipe/reset/addRecipe");

export const addRecipeAction = createAsyncThunk(
	"recipe/addRecipe",
	async ({ data, image }, { rejectWithValue, dispatch }) => {
		try {
			const user_id = localStorage.getItem("user_id");
			const token = localStorage.getItem("token");
			if (!token) {
				Swal.fire({
					title: "Add recipe fail",
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

			const response = await http(token).post(`${baseUrl}/recipe`, formData);

			if (response?.data?.data) {
				Swal.fire({
					title: "Add recipe success",
					text: "Congratulations!",
					icon: "success",
				});
			}

			dispatch(resetAddRecipe());
		} catch (error) {
			Swal.fire({
				title: "Add recipe error",
				text: "Please try again later...",
				icon: "error",
			});

			return rejectWithValue("Add recipe error");
		}
	},
);

const addRecipeSlice = createSlice({
	name: "addRecipe",
	initialState: {
		isCreated: false,
		isLoading: false,
		isError: false,
	},
	extraReducers: (builder) => {
		// add
		builder.addCase(addRecipeAction.pending, (state, action) => {
			state.isLoading = true;
		});

		builder.addCase(resetAddRecipe, (state, action) => {
			state.isCreated = true;
		});

		builder.addCase(addRecipeAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isCreated = false;
		});

		builder.addCase(addRecipeAction.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = action?.payload;
		});
	},
});

export default addRecipeSlice.reducer;
