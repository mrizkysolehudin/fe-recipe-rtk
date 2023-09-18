import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import "./recipeDetails.css";
import { Link, useParams } from "react-router-dom";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";
import { splitSentencesToPoints } from "../../utils/splitSentencesToPoints";
import Alert from "../../components/Global/Alert";

const RecipeDetailsPage = () => {
	const { id } = useParams();
	const [dataRecipeDetails, setDataRecipeDetails] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		getDataRecipeDetails(id);
	}, [id]);

	const getDataRecipeDetails = async (id) => {
		setIsLoading(true);

		try {
			const result = await http().get(`${baseUrl}/recipe/${id}`);

			setDataRecipeDetails(result.data.data[0]);
			setIsLoading(false);
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	};

	const ingredients = splitSentencesToPoints(dataRecipeDetails?.ingredients);

	return (
		<div id="page-recipeDetails" style={{ width: "100dvw" }}>
			<Navbar />

			{isLoading ? (
				<div style={{ width: 450, margin: "auto", marginTop: "31vh" }}>
					<Alert type="loading" />
				</div>
			) : isError ? (
				<Alert type="error" />
			) : (
				<main className="container">
					<section>
						<div
							style={{ marginTop: "3vw" }}
							className="d-flex flex-column justify-content-center align-items-center">
							<h1>{dataRecipeDetails?.title}</h1>
							<div id="wrapper-image-details" className="position-relative">
								<img
									id="img-details"
									src={dataRecipeDetails?.image}
									alt={dataRecipeDetails?.title}
								/>
								<div
									className="position-absolute"
									style={{ bottom: "6%", right: "2%" }}>
									<button className="btn btn-warning">
										<img src="../assets/icons/icon-bookmark.svg" alt="icon-bookmark" />
									</button>
									<button className="btn btn-light ms-sm-2">
										<img src="../assets/icons/icon-like.svg" alt="icon-like" />
									</button>
								</div>
							</div>
						</div>
						<div
							id="ingredients"
							className="text-capitalize"
							style={{ marginTop: "5vw", marginLeft: "10vw" }}>
							<h3 style={{ marginBottom: "1vw" }}>Ingredients</h3>

							<div>
								{ingredients?.map((item, index) => {
									return <p key={index}>{`- ${item}`}</p>;
								})}
							</div>
						</div>
						<div
							id="videoStep"
							className="text-capitalize"
							style={{ marginTop: "3vw", marginLeft: "10vw" }}>
							<h3 style={{ marginBottom: "2vw" }}>Video Step</h3>
							<div className="d-grid gap-4">
								<button className="btn btn-warning position-relative">
									<Link to={`/recipe/video/${id}`} className="stretched-link">
										<img src="../assets/icons/icon-play.svg" alt="icon-play" />
									</Link>
								</button>
							</div>
						</div>
					</section>
					<section id="comment" style={{ marginTop: "7vw", marginLeft: "10vw" }}>
						<div className="">
							<textarea
								className="rounded-2 p-sm-3 ps-2 fs-6"
								placeholder="Comment: "
								defaultValue={""}
							/>
							<button
								id="btn-send"
								style={{ width: "21vw", marginLeft: "22vw", marginTop: "1vw" }}
								className="btn btn-warning text-light">
								Send
							</button>
						</div>
						<div id="userComment" style={{ marginTop: "4vw" }}>
							<h3>Comment</h3>
							<div className="d-flex" style={{ marginTop: "2.5vw" }}>
								<img src="../assets/images/avatar-ayudia.png" alt="avatar-ayudia" />
								<div className="text-capitalize" style={{ marginLeft: "2vw" }}>
									<p>Ayudia</p>
									<p className="fw-light">Nice recipe. simple and delicious, thankyou</p>
								</div>
							</div>
						</div>
					</section>
				</main>
			)}

			<Footer />
		</div>
	);
};

export default RecipeDetailsPage;
