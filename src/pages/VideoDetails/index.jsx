import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/Navbar";
import "./videoDetails.css";
import { baseUrl } from "../../helpers/baseUrl";
import http from "../../helpers/http";
import { Link, useParams } from "react-router-dom";
import Alert from "../../components/Global/Alert";
import { formatDate } from "../../utils/formatDate";
import NoResult from "../../components/Global/NoResult";

const VideoDetailsPage = () => {
	const { id } = useParams();
	const [dataRecipeDetails, setDataRecipeDetails] = useState([]);
	const [isLoadingRecipeDetails, setIsLoadingRecipeDetails] = useState(false);
	const [isErrorRecipeDetails, setIsErrorRecipeDetails] = useState(false);
	const [dataAllRecipes, setDataAllRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getDataRecipeDetails(id);
		getDataRecipe();
	}, [id]);

	const getDataRecipeDetails = async (id) => {
		setIsLoadingRecipeDetails(true);

		try {
			const result = await http().get(`${baseUrl}/recipe/${id}`);

			setDataRecipeDetails(result.data.data[0]);
			setIsLoadingRecipeDetails(false);
		} catch (error) {
			setIsErrorRecipeDetails(true);
			setIsLoadingRecipeDetails(false);
		}
	};

	const getDataRecipe = async () => {
		setIsLoading(false);

		try {
			const result = await http().get(`${baseUrl}/recipe`);

			setDataAllRecipes(result.data.data);
			setIsLoading(false);
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	};

	return (
		<div
			id="page-videoDetails"
			className="position-relative"
			style={{ minHeight: "100vh", width: "100dvw" }}>
			<Navbar />

			<main
				className="d-lg-flex justify-content-between mx-auto gap-3 gap-md-3"
				style={{ width: "80dvw", marginTop: "5vw", paddingBottom: "5vw" }}>
				{isLoadingRecipeDetails ? (
					<div style={{ width: 450, margin: "auto", marginTop: "31vh" }}>
						<Alert type="loading" />
					</div>
				) : isErrorRecipeDetails ? (
					<Alert type="error" />
				) : dataRecipeDetails?.video &&
				  dataRecipeDetails.video.startsWith("https://youtube.com/embed/") ? (
					<section id="currentStep" className="col-12 col-lg-7">
						<div className="col-12">
							<iframe
								title="recipe"
								src={dataRecipeDetails?.video}
								frameBorder={0}
								allowFullScreen=""
							/>

							<h5 className="mt-3">
								{dataRecipeDetails?.title}
								{/* <span className="d-block">Cut the condiment and then mix it </span> */}
							</h5>
							<p>{formatDate(dataRecipeDetails?.created_at)}</p>
						</div>
					</section>
				) : (
					<div
						id="no-iframe"
						className="d-flex justify-content-center align-items-center">
						<NoResult text="No Video" />
					</div>
				)}

				<section id="nextStep">
					<h2 className="mt-4 mt-lg-0">Other Recipes</h2>
					<div className="col-12 col-lg-3 d-flex d-lg-inline flex-wrap column-gap-4 column-gap-lg-0 row-gap-md-2 row-gap-lg-0">
						{isLoading ? (
							<Alert type="loading" />
						) : isError ? (
							<Alert type="error" />
						) : !!dataAllRecipes.length ? (
							dataAllRecipes.slice(0, 3).map((item, index) => (
								<div key={index} className="col-5 col-lg-12">
									<Link to={`/recipe/${item?.recipe_id}`}>
										<img src={item?.image} alt="" />
										<h6>
											{item?.title}
											{/* <span className="d-block"> Roast beef until it’s medium rare </span> */}
										</h6>
										<p>
											{item?.creator} - {formatDate(item?.created_at)}
										</p>
									</Link>
								</div>
							))
						) : (
							<NoResult />
						)}
					</div>
				</section>
			</main>
		</div>
	);
};

export default VideoDetailsPage;
