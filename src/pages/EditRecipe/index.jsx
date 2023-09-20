import React, { useEffect, useState } from "react";
import Navbar from "../../components/Global/Navbar";
import Footer from "../../components/Global/Footer";
import "./editRecipe.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRecipeAction } from "../../redux/reducers/recipe/editRecipeSlice";
import { getOneRecipeAction } from "../../redux/reducers/recipe/getOneRecipe";

const EditRecipePage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { isLoading, isEdited } = useSelector((state) => state.editRecipe);
	const { data: currentData } = useSelector((state) => state.getOneRecipe);

	const [image, setImage] = useState("");
	const [showImage, setShowImage] = useState("");

	useEffect(() => {
		dispatch(getOneRecipeAction(id));
	}, [id, dispatch]);

	useEffect(() => {
		if (isEdited) {
			navigate("/myprofile");
		}

		if (currentData) {
			setImage(currentData.image);
			setShowImage(currentData.image);

			setData({
				title: currentData.title,
				ingredients: currentData.ingredients,
				video: currentData.video,
			});
		}
	}, [dispatch, isEdited, navigate, currentData]);

	const [data, setData] = useState({
		title: "",
		ingredients: "",
		video: "",
	});

	const handleChange = (e) => {
		setData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
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

		dispatch(editRecipeAction({ data, image, id }));
	};

	return (
		<div id="page-editRecipe" style={{ width: "100dvw", position: "relative" }}>
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
								src={currentData?.image ?? ""}
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

export default EditRecipePage;
