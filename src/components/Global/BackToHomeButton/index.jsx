import React from "react";
import { Link } from "react-router-dom";

const BackToHomeButton = ({
	top,
	right,
	className,
	bottom,
	left,
	fontSize,
}) => {
	return (
		<div style={{ position: "relative" }}>
			<Link
				to="/"
				style={{
					top: top,
					right: right,
					left: left,
					bottom: bottom,
					position: "absolute",
					fontSize: fontSize,
				}}
				className={className}>
				<button className="border-0 text-light bg-warning px-3 pt-0 fw-bold rounded">
					back
				</button>
			</Link>
		</div>
	);
};

export default BackToHomeButton;
