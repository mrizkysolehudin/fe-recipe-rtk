import React from "react";

const Alert = ({ type }) => {
	if (type === "loading")
		return (
			<div className="alert alert-primary w-75 fw-bold text-primary" role="alert">
				Please wait a moment...
			</div>
		);

	if (type === "error")
		return (
			<div
				style={{ width: "fit-content" }}
				className="alert alert-danger fw-bold text-danger"
				role="alert">
				<div>Something went wrong.</div>
				Please try again later...
			</div>
		);
};

export default Alert;
