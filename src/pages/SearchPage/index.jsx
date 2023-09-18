import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirstThreeWords } from "../../utils/getThreeWords";
import "./searchPage.css";
import NoResult from "../../components/Global/NoResult";

const SearchPage = () => {
	const [searchData, setSearchData] = useState([]);

	useEffect(() => {
		const result = localStorage.getItem("searchData");

		if (result) {
			setSearchData(JSON.parse(result));
		}
	}, []);

	return (
		<div
			id="page-home"
			style={{ backgroundColor: "burlywood", width: "100vw", minHeight: "100vh" }}
			className="pt-5">
			<div className="container py-5 ">
				<h1>Search result:</h1>

				<main style={{ width: "80vw" }} className="py-5 my-5">
					<section id="popular-recipe">
						<div className="d-flex flex-wrap row-gap-4">
							{!!searchData?.length ? (
								searchData?.map((item, index) => (
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
								))
							) : (
								<NoResult text="No Result" />
							)}
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default SearchPage;
