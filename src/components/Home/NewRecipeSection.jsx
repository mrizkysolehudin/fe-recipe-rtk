import React from "react";
import { Link } from "react-router-dom";
import Alert from "../Global/Alert";

const NewRecipeSection = ({ dataRecipe, isLoading, isError }) => {
	const latestRecipe = dataRecipe?.length - 1 ?? 5;

	return (
		<section
			className="position-relative pt-5 pt-md-0"
			style={{ marginTop: "10dvw" }}>
			<div
				className="d-none d-md-block"
				style={{
					backgroundColor: "#efc81a",
					width: "24vw",
					height: "40vw",
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: -1,
					marginLeft: "-118px",
					marginTop: "12dvw",
				}}
			/>
			<h3
				style={{
					borderLeft: "1.2dvw solid",
					height: "7dvw",
					paddingLeft: "1.5dvw",
				}}
				className="fw-bold border-warning align-items-center d-flex">
				New Recipe
			</h3>

			{isLoading ? (
				<Alert type="loading" />
			) : isError ? (
				<Alert type="error" />
			) : (
				<>
					<div className="d-md-flex" style={{ marginTop: "9dvw" }}>
						<div
							id="wrapper-img-new-recipe"
							className="col-12 col-md-6 mt-5 mt-md-0 ms-5 ms-md-0 ps-5 ps-md-0 position-relative">
							<img
								className=""
								style={{ width: "40dvw", height: "40dvw", objectFit: "contain" }}
								src={dataRecipe[latestRecipe]?.image}
								alt="img-new-recipe"
							/>
						</div>
						<div
							className="col-12 col-md-6"
							style={{ marginTop: "11dvw", paddingLeft: "10dvw" }}>
							<h2 className="fw-semibold col-10 position-relative">
								{dataRecipe[latestRecipe]?.title} (Quick &amp; Easy)
							</h2>
							<p className="col-8">
								Quick + Easy {dataRecipe[latestRecipe]?.title} in a hurry? That's right!
							</p>
							<Link
								to={`/recipe/${dataRecipe[latestRecipe]?.recipe_id}`}
								className="btn btn-warning text-light">
								Learn More
							</Link>
						</div>
					</div>
				</>
			)}
		</section>
	);
};

export default NewRecipeSection;
