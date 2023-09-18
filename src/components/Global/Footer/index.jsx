import React from "react";

const Footer = () => {
	return (
		<footer
			id="footer"
			className="bg-yellow text-center d-flex align-items-center flex-column justify-content-between"
			style={{ marginTop: 100, width: "100%" }}>
			<div>
				<h1>Eat, Cook, Repeat</h1>
				<h5 className="pt-4">Share your best recipe by uploading here !</h5>
			</div>
			<div className="d-flex text-center justify-items-center align-items-center gap-3">
				<a href="#footer">Product</a>
				<a href="#footer">Company</a>
				<a href="#footer">Learn More</a>
				<a href="#footer">Get In Touch</a>
			</div>
		</footer>
	);
};

export default Footer;
