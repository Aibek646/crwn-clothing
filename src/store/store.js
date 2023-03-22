import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware
} from "redux";

import { rootReducer } from "./root-reducer";
// import logger from "redux-logger";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("currentState", store.getState());

    next(action);

    console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

// const middleWares = [logger];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composeEnhancers);
