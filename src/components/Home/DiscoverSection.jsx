import React from "react";

const DiscoverSection = ({ searchTerm, handleChangeSearch, handleKeyDown }) => {
	return (
		<section id="discover" className="row">
			<div className="col-12 col-md-6" style={{ marginTop: "16dvw" }}>
				<h1 className="ms-5 ms-md-0">
					Discover Recipe <br />
					&amp; Delicious Food
				</h1>
				<div className="position-relative">
					<input
						value={searchTerm}
						onChange={handleChangeSearch}
						onKeyDown={handleKeyDown}
						type="text"
						style={{
							width: "33.5dvw",
							height: "4.5dvw",
							fontSize: "1dvw",
							paddingLeft: "4dvw",
						}}
						className="form-control border-2 bg-body-secondary d-none d-md-block"
						placeholder="Search restaurant, food"
					/>
					<img
						src="./assets/icons/icon-search.svg"
						alt="icon-search"
						style={{ width: "1dvw", left: "2.5dvw", top: "1.7dvw" }}
						className="position-absolute"
					/>
				</div>
			</div>
			<div
				id="wrapper-img-discover"
				className="col-12 col-md-6 ms-5 ms-md-0"
				style={{ marginTop: "5.5dvw" }}>
				<img
					id="img-discover"
					className=""
					src="./assets/images/home/img-discover.png"
					alt="img-discover"
				/>
			</div>
		</section>
	);
};

export default DiscoverSection;
