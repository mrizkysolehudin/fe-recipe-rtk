import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import RecipeDetailsPage from "../pages/RecipeDetails";
import ProfilePage from "../pages/Profile";
import AddRecipePage from "../pages/AddRecipe";
import RegisterPage from "../pages/Register";
import VideoDetailsPage from "../pages/VideoDetails";
import EditRecipePage from "../pages/EditRecipe";
import PrivateRoute from "../components/Global/PrivateRoute";
import EditUserPage from "../pages/EditUser";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFound";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* public routes */}
				<Route>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route path="/search-page" element={<SearchPage />} />
					<Route path="/recipe/:id" element={<RecipeDetailsPage />} />
					<Route path="/recipe/video/:id" element={<VideoDetailsPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Route>

				{/* private routes */}
				<Route element={<PrivateRoute />}>
					<Route path="/recipe/add" element={<AddRecipePage />} />
					<Route path="/recipe/edit/:id" element={<EditRecipePage />} />

					<Route path="/myprofile" element={<ProfilePage />} />
					<Route path="/edit/profile/:id" element={<EditUserPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
