import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../redux/reducers/authSlice";

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = useSelector((state) => state?.userAuth);

	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		if (token) {
			setIsLogin(true);
		}
	}, [dispatch, token]);

	const handleLogout = () => {
		dispatch(logoutAction());
		Swal.fire({
			text: "Logout success",
			icon: "success",
		});

		navigate("/");

		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<header id="all-header" style={{ width: "100%" }}>
			<nav
				className="navbar navbar-expand  ms-lg-5 justify-content-between"
				tyle="padding-top: 3dvw">
				<div className="container-fluid ps-sm-5">
					<ul className="navbar-nav gap-sm-5 gap-2">
						<li className="nav-item">
							<Link to="/" className="nav-link fw-bold text-secondary">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/recipe/add"
								className="nav-link fw-bold text-secondary"
								href="./pages/addRecipePage.html">
								Add Recipe
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to={`/myprofile`}
								className="nav-link fw-bold text-secondary"
								href="./pages/profilePage.html">
								Profile
							</Link>
						</li>
					</ul>
				</div>

				{!isLogin ? (
					<div id="btn-login" style={{ marginRight: "8dvw" }}>
						<Link to="/login" className="d-flex text-light">
							<img src="../../../assets/icons/icon-person.svg" alt="icon-person" />
							<p className="mt-3 ms-2">Login</p>
						</Link>
					</div>
				) : (
					<div id="btn-logout" style={{ marginRight: "8dvw" }}>
						<button
							onClick={handleLogout}
							className="btn text-light btn-danger pt-0 pb-1">
							Logout
						</button>
					</div>
				)}
			</nav>
		</header>
	);
};

export default Navbar;
