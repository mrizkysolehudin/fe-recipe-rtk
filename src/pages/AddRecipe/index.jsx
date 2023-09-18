import React, { useState } from "react";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import "./addRecipe.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import http from "../../helpers/http";
import { baseUrl } from "../../helpers/baseUrl";

const AddRecipePage = () => {
	const navigate = useNavigate();
	const user_id = localStorage.getItem("user_id");
	const token = localStorage.getItem("token");

	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState("");
	const [showImage, setShowImage] = useState("");

	const [data, setData] = useState({
		title: "",
		ingredients: "",
		video: "",
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
			setShowImage(reader.result);
		};
		reader.readAsDataURL(file);

		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (
				data.title === "" ||
				data.ingredients === "" ||
				data.video === "" ||
				image === ""
			) {
				Swal.fire({
					title: "Input error",
					text: "Please, input all data",
					icon: "error",
				});

				return;
			}

			const formData = new FormData();
			formData.append("user_id", user_id);
			formData.append("title", data?.title);
			formData.append("ingredients", data?.ingredients);
			formData.append("video", data?.video);
			formData.append("image", image);

			http(token)
				.post(`${baseUrl}/recipe`, formData)
				.then(() => {
					Swal.fire({
						title: "Add recipe success",
						text: "Congratulations!",
						icon: "success",
					});

					navigate("/");
					setIsLoading(false);

					setTimeout(() => {
						window.location.reload();
					}, 1000);
				});
		} catch (error) {
			setIsLoading(false);

			Swal.fire({
				title: "Add recipe error",
				text: "Please try again later...",
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
		<div id="page-addRecipe" style={{ width: "100dvw", position: "relative" }}>
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
								src="../assets/icons/icon-gallery.svg"
								alt="icon-gallery"
								className=""
							/>
							<p className="mt-sm-3">Add Photo</p>
						</div>

						{showImage && (
							<img
								src={showImage ?? ""}
								alt="show"
								style={{ zIndex: -1, objectFit: "contain" }}
								className="position-absolute top-0 w-100 h-100 rounded-3 "
							/>
						)}
					</div>
					<input
						name="title"
						value={data.title}
						onChange={handleChange}
						id="title"
						type="text"
						className="form-control ps-sm-4 rounded-3"
						placeholder="Title"
					/>
					<textarea
						name="ingredients"
						value={data.ingredients}
						onChange={handleChange}
						id="ingredients"
						className="form-control ps-sm-4 pt-sm-3 rounded-3"
						placeholder="Ingredients"
					/>
					<input
						name="video"
						value={data.video}
						onChange={handleChange}
						id="video"
						type="text"
						className="form-control ps-sm-4 rounded-3"
						placeholder="Video"
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

export default AddRecipePage;
