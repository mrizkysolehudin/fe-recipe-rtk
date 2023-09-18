import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirstThreeWords } from "../../utils/getThreeWords";
import "./searchPage.css";
import NoResult from "../../components/Global/NoResult";
import axios from "axios";
import { baseUrl } from "../../helpers/baseUrl";

const SearchPage = () => {
	const [searchData, setSearchData] = useState([]);
	const [sort, setSort] = useState("ASC");
	const [page, setPage] = useState(1);
	const limit = 5;
	const [pagination, setPagination] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const result = localStorage.getItem("searchData");

		if (result) {
			setSearchData(JSON.parse(result));
			localStorage.removeItem("searchData");
		}

		getData();
		// eslint-disable-next-line
	}, [sort, page]);

	const getData = async () => {
		axios
			.get(`${baseUrl}/recipe?sort=${sort}&page=${page}&limit=${limit}`)
			.then((response) => {
				setSearchData(response.data.data);
				setPagination(response.data.pagination);
			});
	};

	const previousPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const nextPage = () => {
		if (pagination?.totalPage > page) {
			setPage((prev) => prev + 1);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const numberPageItems = [];
	for (let i = 1; i <= pagination?.totalPage; i++) {
		const isCurrentPage = i === pagination?.currentPage;

		const pageItem = (
			<li key={i} className={`page-item ${isCurrentPage ? "active" : ""}`}>
				{isCurrentPage ? (
					<span className="page-link" style={{ fontSize: 13 }}>
						{i}
					</span>
				) : (
					<button
						className="page-link"
						onClick={() => setPage(i)}
						style={{ fontSize: 13 }}>
						{i}
					</button>
				)}
			</li>
		);
		numberPageItems.push(pageItem);
	}

	const dataFilter = searchData?.filter((item) => {
		return item?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
	});

	return (
		<div
			id="page-home"
			style={{ backgroundColor: "#efc81a", width: "100vw", minHeight: "100vh" }}
			className="pt-5">
			<div className="container py-5 ">
				<h1 className="d-md-none ">Search result:</h1>

				<div className="d-flex align-items-center justify-content-between">
					<h1 className="d-none d-md-block">Search result:</h1>

					<div className="gap-2 d-flex">
						{sort === "ASC" ? (
							<button className="btn btn-dark fw-bold" onClick={() => setSort("DESC")}>
								sort
							</button>
						) : (
							<button className="btn btn-dark fw-bold" onClick={() => setSort("ASC")}>
								sort
							</button>
						)}

						<input
							type="text"
							className="form-control"
							placeholder="search recipe"
							onChange={(e) => setSearchTerm(e.target.value)}
							value={searchTerm}
						/>
					</div>
				</div>

				<main style={{ width: "90vw" }} className="py-5 my-5">
					<section id="popular-recipe">
						<div className="d-flex flex-wrap row-gap-4 gap-4 justify-content-center">
							{!!searchData?.length ? (
								dataFilter?.map((item, index) => (
									<Link
										key={index}
										to={`/recipe/${item?.recipe_id}`}
										className="col-xl-2 col-md-2 col-12"
										style={{ position: "relative" }}>
										<img
											src={item?.image}
											alt={item?.title}
											style={{
												objectFit: "contain",
												height: "100%",
											}}
										/>

										<div style={{ marginTop: -50 }}>
											<p className="fs-6 text-center">{getFirstThreeWords(item?.title)}</p>
										</div>
									</Link>
								))
							) : (
								<NoResult text="No Result" />
							)}
						</div>
					</section>
				</main>

				<section className="d-grid justify-content-center">
					<nav aria-label="Page navigation example">
						<ul className="pagination">
							<li className="page-item">
								<button
									onClick={previousPage}
									style={{ fontSize: 13 }}
									className="page-link">
									Prev
								</button>
							</li>

							{numberPageItems}

							<li className="page-item">
								<button
									onClick={nextPage}
									style={{ fontSize: 13 }}
									className="page-link">
									Next
								</button>
							</li>
						</ul>
					</nav>
				</section>
			</div>
		</div>
	);
};

export default SearchPage;
