import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import "./editUser.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { httpFormData } from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetailsAction } from "../../helpers/store/actions/user";

const EditUserPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.userDetails.data);

	const token = localStorage.getItem("token");

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [image, setImage] = useState("");
	const [showImage, setShowImage] = useState("");

	useEffect(() => {
		if (id) {
			dispatch(fetchUserDetailsAction(id));
		}
	}, [id, dispatch]);

	const [data, setData] = useState({
		name: currentUser?.name ?? "",
		email: currentUser?.email ?? "",
		phone: currentUser?.phone ?? "",
	});

	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleChangeImage = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setShowImage(reader?.result);
		};
		reader?.readAsDataURL(file);

		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (
				data.name === "" ||
				data.email === "" ||
				data.phone === "" ||
				image === ""
			) {
				Swal.fire({
					name: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return;
			}

			const formData = new FormData();
			formData.append("user_id", id);
			formData.append("name", data?.name);
			formData.append("email", data?.email);
			formData.append("phone", data?.phone);
			formData.append("photo", image);

			httpFormData(token)
				.put(`${baseUrl}/users/${id}`, formData)
				.then(() => {
					Swal.fire({
						name: "Edit user success",
						text: "Congratulations!",
						icon: "success",
					});

					navigate("/myprofile");
					setIsLoading(false);

					setTimeout(() => {
						window.location.reload();
					}, 1000);
				});
		} catch (error) {
			setIsLoading(false);
			setIsError(true);

			Swal.fire({
				name: "Edit user error",
				text: "Please try again later...",
				icon: "error",
			}).then(() => {
				setIsError(false);
			});

			setTimeout(() => {
				window.location.reload();
				setIsLoading(false);

				return;
			}, 2000);
		}
	};

	return (
		<div id="page-editUser" style={{ width: "100dvw", position: "relative" }}>
			<Navbar />

			<main className="mx-auto col-8">
				<form
					onSubmit={handleSubmit}
					className="d-grid gap-4"
					style={{ marginTop: "8dvw" }}>
					<div className="position-relative">
						<input
							onChange={handleChangeImage}
							id="image"
							className="form-control opacity-0"
							type="file"
							name="image"
						/>
						<div
							id="bg-wrapper-add-photo"
							className="position-absolute top-0 w-100 rounded-3 d-flex flex-column justify-content-center align-items-center"
							style={{ zIndex: -2 }}>
							<img
								id="icon-gallery"
								src="/assets/icons/icon-gallery.svg"
								alt="icon-gallery"
								className=""
							/>
							<p className="mt-sm-3">Edit Photo</p>
						</div>

						{!!image ? (
							<img
								src={showImage ?? ""}
								alt="show"
								style={{ zIndex: -1, objectFit: "contain" }}
								className="position-absolute top-0 w-100 h-100 rounded-3 "
							/>
						) : (
							<img
								src={currentUser?.image ?? ""}
								alt="show"
								style={{ zIndex: -1, objectFit: "contain" }}
								className="position-absolute top-0 w-100 h-100 rounded-3 "
							/>
						)}
					</div>
					<input
						name="name"
						value={data.name}
						onChange={handleChange}
						id="name"
						type="text"
						className="form-control ps-sm-4 rounded-3"
						placeholder="Name"
					/>
					<input
						name="email"
						value={data.email}
						onChange={handleChange}
						id="email"
						className="form-control ps-sm-4 rounded-3"
						placeholder="Email"
					/>
					<input
						name="phone"
						value={data.phone}
						onChange={handleChange}
						id="phone"
						type="text"
						className="form-control ps-sm-4 rounded-3"
						placeholder="Phone"
					/>
					<button
						id="btn-post"
						type="submit"
						disabled={isLoading || isError}
						className="btn btn-warning text-light fw-semibold mx-auto"
						style={{ width: "21dvw", marginTop: "5dvw" }}>
						Post
					</button>
				</form>
			</main>

			<Footer />
		</div>
	);
};

export default EditUserPage;
