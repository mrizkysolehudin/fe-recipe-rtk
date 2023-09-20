import React, { useEffect, useState } from "react";
import "./home.css";
import DiscoverSection from "../../components/Home/DiscoverSection";
import PopularForYouSection from "../../components/Home/PopularForYouSection";
import NewRecipeSection from "../../components/Home/NewRecipeSection";
import PopularRecipeSection from "../../components/Home/PopularRecipeSection";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipesAction } from "../../redux/reducers/recipe/recipeSlice";

const HomePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		data: dataRecipe,
		isLoading,
		isError,
	} = useSelector((state) => state.recipe);

	const [searchTerm, setSearchTerm] = useState([]);

	useEffect(() => {
		dispatch(getAllRecipesAction(searchTerm));
	}, [searchTerm, dispatch]);

	const handleSearch = (e) => {
		e.preventDefault();

		const searchData = dataRecipe?.filter((item) => {
			return item?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
		});

		setSearchTerm(e.target.value);
		localStorage.setItem("searchData", JSON.stringify(searchData));

		setTimeout(() => {
			navigate(`/search-page?search=${searchTerm}`);
		}, 1000);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch(e);
		}
	};

	return (
		<div id="page-home" style={{ position: "relative", width: "100dvw" }}>
			<Navbar />

			<div
				style={{
					backgroundColor: "#efc81a",
					width: "29vw",
					height: "66vw",
					position: "absolute",
					top: 0,
					right: 0,
					zIndex: -1,
				}}
			/>

			<main
				style={{ width: "100dvw", paddingLeft: "6dvw", marginRight: "6dvw" }}
				className="">
				<div
					style={{
						backgroundColor: "#efc81a",
						width: "29vw",
						height: "66vw",
						position: "absolute",
						top: 0,
						right: 0,
						zIndex: -1,
					}}
				/>

				<DiscoverSection
					searchTerm={searchTerm}
					handleChangeSearch={(e) => setSearchTerm(e.target.value)}
					handleKeyDown={handleKeyDown}
				/>

				<PopularForYouSection
					dataRecipe={dataRecipe}
					isLoading={isLoading}
					isError={isError}
				/>
				<NewRecipeSection
					dataRecipe={dataRecipe}
					isLoading={isLoading}
					isError={isError}
				/>
				<PopularRecipeSection
					dataRecipe={dataRecipe}
					isLoading={isLoading}
					isError={isError}
				/>
			</main>

			<Footer />
		</div>
	);
};

export default HomePage;
