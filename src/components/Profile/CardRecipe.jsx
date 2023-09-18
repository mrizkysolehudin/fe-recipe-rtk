import React from "react";
import { getFirstThreeWords } from "../../utils/getThreeWords";
import { Link } from "react-router-dom";

const CardRecipe = ({ withActionButton, item, handleDelete }) => {
	return (
		<div className="card-recipe" style={{ position: "relative" }}>
			<Link to={`/recipe/${item?.recipe_id}`} className="stretched-link"></Link>

			{withActionButton && (
				<div
					id="wrapper-btn-recipe"
					style={{ zIndex: 1 }}
					className="position-absolute ">
					<div className="d-flex gap-1">
						<Link to={`/recipe/edit/${item?.recipe_id}`}>
							<button className="border-0 text-light bg-success px-3 py-0 rounded">
								Edit
							</button>
						</Link>
						<button
							onClick={() => handleDelete(item?.recipe_id)}
							className="border-0 bg-danger text-light px-2 py-0 rounded">
							Delete
						</button>
					</div>
				</div>
			)}

			<img src={item?.image} alt={item?.title} />
			<p className="col-2 position-absolute text-light">
				{getFirstThreeWords(item?.title)}
			</p>
		</div>
	);
};

export default CardRecipe;
