import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
const middleware = [thunk];

const store = createStore(
    rootReducer, { isAuthenticated: false },
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;