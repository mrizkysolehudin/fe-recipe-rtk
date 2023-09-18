import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";
import BackToHomeButton from "../../components/Global/BackToHomeButton";

const LoginPage = () => {
	const navigate = useNavigate();

	const [agreeChecked, setAgreeChecked] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (data.email === "" || data.password === "") {
				Swal.fire({
					title: "Input error",
					text: "Please, input your email and password!",
					icon: "error",
				});

				return;
			}

			const response = await http().post(`${baseUrl}/users/login`, data);
			localStorage.setItem("token", response.data.data.token);
			localStorage.setItem("user_id", response.data.data.user_id);

			Swal.fire({
				title: "Login success",
				text: "Congratulations! You are now logged in.",
				icon: "success",
			});

			navigate("/");

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			Swal.fire({
				title: "Login error",
				text: "Wrong password or email. Please try again.",
				icon: "error",
			});
		}
	};

	return (
		<div id="page-login" style={{ width: "100dvw", position: "relative" }}>
			{/* <BackToHomeButton
				top="73vw"
				left="4vw"
				fontSize={12}
				className="d-sm-none d-block"
			/> */}
			<BackToHomeButton
				top="60vw"
				left="4vw"
				fontSize={12}
				className="d-block d-md-none"
			/>
			<BackToHomeButton
				top="31vw"
				left="4vw"
				fontSize={12}
				className="d-block d-lg-none"
			/>
			<BackToHomeButton
				top="20vw"
				left="3vw"
				className="d-none d-lg-block d-xl-none"
			/>
			<BackToHomeButton top="20vw" right="3vw" className="d-none d-xl-block" />

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
							Welcome
						</h1>
						<h4
							style={{ marginTop: 30, fontSize: 18, fontWeight: 400 }}
							className="text-center text-gray">
							Log in into your exiting account
						</h4>

						<form
							onSubmit={handleSubmit}
							className="ms-4 ms-sm-0"
							style={{ marginTop: 37 }}>
							<div>
								<label className="form-label">E-mail</label>
								<input
									name="email"
									onChange={handleChange}
									type="text"
									className="form-control width-form"
									placeholder="examplexxx@gmail.com"
									style={{ marginTop: 14, height: 64, fontSize: 14 }}
								/>
							</div>
							<div style={{ marginTop: 24 }}>
								<label htmlFor="formGroupExampleInput2" className="form-label">
									Password
								</label>
								<input
									name="password"
									onChange={handleChange}
									type="password"
									className="form-control width-form"
									placeholder="Password"
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
								disabled={!agreeChecked}
								type="submit"
								className="btn btn-warning text-light width-form"
								style={{ marginTop: 39, height: 64, fontSize: 16 }}>
								Log in
							</button>
						</form>
						<div style={{ marginTop: 16 }}>
							<a
								href="#page-login"
								style={{ fontSize: 12 }}
								className="d-flex justify-content-end">
								Forgot Password ?
							</a>
							<p
								className="d-flex justify-content-center text-lightgray"
								style={{ fontSize: 13, marginTop: 24 }}>
								Don’t have an account?
								<Link to="/register" className="text-yellow ms-1">
									{" "}
									Sign Up{" "}
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default LoginPage;
