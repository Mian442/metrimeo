import { createStore, applyMiddleware, compose } from "redux";
import MainReducer from "../reducer/MainReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const MainStore = createStore(MainReducer, applyMiddleware(thunk));

export default MainStore;
