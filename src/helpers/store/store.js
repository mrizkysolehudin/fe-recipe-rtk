import {
	legacy_createStore as createStore,
	compose,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// const initialState = {
// 	userAuth: {
// 		token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
// 	},
// };

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
	rootReducer,
	composerEnhancer(applyMiddleware(...middleware)),
);

export default store;
