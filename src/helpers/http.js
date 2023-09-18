import axios from "axios";

const http = (token = null) => {
	const headers = {};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return axios.create({
		headers,
	});
};

export const httpFormData = (token = null) => {
	const headers = {
		"Content-Type": "multipart/form-data",
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	return axios.create({
		headers,
	});
};

export default http;
