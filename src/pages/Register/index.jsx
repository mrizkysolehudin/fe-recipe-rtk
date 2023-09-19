import React, { useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const [agreeChecked, setAgreeChecked] = useState(false);
	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (data.password !== data.confirmPassword) {
				Swal.fire({
					title: "error",
					text: "Password and confirm password must be correct. Please try again.",
					icon: "error",
				});
				return;
			}

			if (
				data.name === "" ||
				data.email === "" ||
				data.phone === "" ||
				data.password === "" ||
				data.confirmPassword === ""
			) {
				Swal.fire({
					title: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return;
			}

			http()
				.post(`${baseUrl}/users/register`, data)
				.then(() => {
					Swal.fire({
						title: "Register success",
						text: "Congratulations!",
						icon: "success",
					});

					navigate("/login");
					setIsLoading(false);

					setTimeout(() => {
						window.location.reload();
					}, 1000);
				});
		} catch (error) {
			Swal.fire({
				title: "Register error",
				text: "Please try again...",
				icon: "error",
			});

			setTimeout(() => {
				window.location.reload();
				setIsLoading(false);

				return;
			}, 2000);
		}
	};

	return (
		<div
			id="page-register"
			className="ms-4 ms-sm-0"
			style={{ width: "100dvw", position: "relative" }}>
			<main className="row" style={{ width: "100%", height: "100%" }}>
				<section
					id="content-left"
					className="col-xl-6"
					style={{ position: "relative" }}>
					<img
						src="../assets/images/bg-image-content-left.png"
						className="bg-image-content-left"
						alt="bg-content-left"
					/>
					<div className="bg-left" />
					<img src="../assets/images/logo.png" className="img-logo" alt="logo" />
				</section>
				<section
					id="content-right"
					className="col-lg-12 col-xxl-6 d-flex flex-column align-items-center">
					<div>
						<h1
							className="text-yellow text-center"
							style={{ fontSize: 30, fontWeight: 700 }}>
							Let’s Get Started !
						</h1>
						<h4
							style={{ marginTop: 30, fontSize: 18, fontWeight: 400 }}
							className="text-center text-gray">
							Create new account to access all features
						</h4>

						<form onSubmit={handleSubmit} style={{ marginTop: 37 }}>
							<div>
								<label className="form-label">Name</label>
								<input
									name="name"
									value={data.name}
									onChange={handleChange}
									type="text"
									className="form-control width-form"
									placeholder="Enter name"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div style={{ marginTop: 24 }}>
								<label className="form-label">Email address</label>
								<input
									name="email"
									value={data.email}
									onChange={handleChange}
									type="text"
									className="form-control width-form"
									placeholder="Enter email address"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div style={{ marginTop: 24 }}>
								<label className="form-label">Phone Number</label>
								<input
									name="phone"
									value={data.phone}
									onChange={handleChange}
									type="text"
									className="form-control width-form"
									placeholder="08xxxxxxxxxx"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div style={{ marginTop: 24 }}>
								<label htmlFor="formGroupExampleInput2" className="form-label">
									Create New Password
								</label>
								<input
									name="password"
									value={data.password}
									onChange={handleChange}
									type="password"
									className="form-control width-form"
									placeholder="Create New Password"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div style={{ marginTop: 24 }}>
								<label htmlFor="formGroupExampleInput2" className="form-label">
									New Password
								</label>
								<input
									name="confirmPassword"
									value={data.confirmPassword}
									onChange={handleChange}
									type="password"
									className="form-control width-form"
									placeholder="New Password"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div className="form-check" style={{ marginTop: 24 }}>
								<input
									checked={agreeChecked}
									onChange={() => setAgreeChecked(!agreeChecked)}
									className="form-check-input"
									type="checkbox"
									id="gridCheck"
									style={{ width: 20, height: 20 }}
								/>
								<label
									className="form-check-label"
									htmlFor="gridCheck"
									style={{ fontSize: 16, marginLeft: 14 }}>
									I agree to terms &amp; conditions
								</label>
							</div>
							<button
								disabled={!agreeChecked || isLoading}
								type="submit"
								className="btn btn-warning text-light width-form"
								style={{ marginTop: 39, height: 64, fontSize: 16 }}>
								Register Account
							</button>
						</form>

						<div style={{ marginTop: 16 }}>
							<a
								href="#page-register"
								style={{ fontSize: 12 }}
								className="d-flex justify-content-end">
								Forgot Password ?
							</a>
							<p
								className="d-flex justify-content-center text-lightgray"
								style={{ fontSize: 13, marginTop: 24 }}>
								Already have account?
								<Link to="/login" className="text-yellow ms-1">
									{" "}
									Log in Here{" "}
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default RegisterPage;
