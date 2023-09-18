import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div
			className="d-grid align-items-center justify-content-center w-100 text-center bg-yellow position-absolute"
			style={{ height: "100vh" }}>
			<div className="position-absolute" style={{ top: "10vh", left: "6vw" }}>
				<button onClick={() => navigate("/")} className="btn btn-secondary ">
					back
				</button>
			</div>

			<div>
				<h1 className="">Page Not Found</h1>
				<p>Sorry, the page you are looking for does not exist.</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
