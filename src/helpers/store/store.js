import {
	legacy_createStore as createStore,
	compose,
	applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
	persistedReducer,
	composerEnhancer(applyMiddleware(...middleware)),
);

export default store;
