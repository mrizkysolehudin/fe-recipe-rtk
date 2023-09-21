import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import "./editUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserAction } from "../../redux/reducers/user/getOneUser";
import { editUserAction } from "../../redux/reducers/user/editUserSlice";

const EditUserPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.getOneUser.data);
	const { isLoading, isEdited } = useSelector((state) => state.editUser);

	const [image, setImage] = useState("");
	const [showImage, setShowImage] = useState("");

	useEffect(() => {
		if (id) {
			dispatch(getOneUserAction(id));
		}

		if (isEdited) {
			navigate("/myprofile");
		}
	}, [id, dispatch, isEdited, navigate]);

	useEffect(() => {
		if (currentUser) {
			setImage(currentUser.photo);
			setShowImage(currentUser.photo);

			setData({
				name: currentUser.name,
				email: currentUser.email,
				phone: currentUser.phone,
			});
		}
	}, [dispatch, currentUser]);

	const [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
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

		dispatch(editUserAction({ data, image, id }));
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
						disabled={isLoading}
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
