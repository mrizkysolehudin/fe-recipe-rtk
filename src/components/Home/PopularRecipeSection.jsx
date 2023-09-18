import React from "react";
import { Link } from "react-router-dom";
import { getFirstThreeWords } from "../../utils/getThreeWords";
import Alert from "../Global/Alert";

const PopularRecipeSection = ({ dataRecipe, isLoading, isError }) => {
	return (
		<section
			id="popular-recipe"
			className="pt-5 pt-md-0 ps-4 ps-md-0"
			style={{ marginTop: "10dvw", marginRight: "6dvw" }}>
			<h3
				style={{
					borderLeft: "1.2dvw solid",
					height: "7dvw",
					paddingLeft: "1.5dvw",
				}}
				className="fw-bold border-warning align-items-center d-flex">
				Popular Recipe
			</h3>

			<div className="row" style={{ rowGap: "3.7dvw", marginTop: "5.6dvw" }}>
				{isLoading ? (
					<Alert type="loading" />
				) : isError ? (
					<Alert type="error" />
				) : (
					<>
						{dataRecipe?.slice(0, 6)?.map((item, index) => (
							<Link
								key={index}
								to={`/recipe/${item?.recipe_id}`}
								className="col-xl-4 col-md-6 col-12"
								style={{ position: "relative" }}>
								<img
									src={item?.image}
									alt={item?.title}
									style={{
										objectFit: "contain",
										height: "100%",
									}}
								/>
								<p className="col-3 position-absolute">
									{getFirstThreeWords(item?.title)}
								</p>
							</Link>
						))}
					</>
				)}
			</div>
		</section>
	);
};

export default PopularRecipeSection;
