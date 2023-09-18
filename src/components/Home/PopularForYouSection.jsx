import React from "react";
import { Link } from "react-router-dom";
import Alert from "../Global/Alert";

const PopularForYouSection = ({ dataRecipe, isLoading, isError }) => {
	const popularItem = Math.floor(Math.random() * dataRecipe?.length) ?? 0;

	return (
		<section className="pt-5 pt-md-0" style={{ marginTop: "10dvw" }}>
			<h3
				style={{
					borderLeft: "1.2dvw solid",
					height: "7dvw",
					paddingLeft: "1.5dvw",
				}}
				className="fw-bold border-warning align-items-center d-flex">
				Popular For You !
			</h3>
			<div className="d-md-flex" style={{ marginTop: "5dvw" }}>
				{isLoading ? (
					<Alert type="loading" />
				) : isError ? (
					<Alert type="error" />
				) : (
					<>
						<div
							id="wrapper-img-popular-for-you"
							className="col-12 col-md-6 mt-5 mt-md-0 ms-5 ms-md-0 ps-5 ps-md-0 position-relative">
							<img
								className=""
								style={{ width: "41.5dvw", height: "41.5dvw", objectFit: "contain" }}
								src={dataRecipe[popularItem]?.image}
								alt="img-popular-for-you"
							/>
							<div
								id="border-box-yellow"
								className="border-3 border-warning border rounded-3"
								style={{
									position: "absolute",
									width: "32vw",
									height: "41vw",
									top: "3.5dvw",
									zIndex: -1,
									transform: "translateX(13dvw)",
								}}
							/>
						</div>
						<div
							className="col-12 col-md-6"
							style={{ marginTop: "11dvw", paddingLeft: "10dvw" }}>
							<h2 className="fw-semibold col-10 position-relative">
								{dataRecipe[popularItem]?.title} (Quick &amp; Easy)
							</h2>
							<p className="col-10 col-md-8">
								Quick + Easy {dataRecipe[popularItem]?.title} in a hurry? That's right!
							</p>
							<Link
								to={`/recipe/${dataRecipe[popularItem]?.recipe_id}`}
								className="btn btn-warning text-light btn-learn-more">
								Learn More
							</Link>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default PopularForYouSection;
