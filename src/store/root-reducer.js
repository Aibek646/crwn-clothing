import { useReducer } from "react";
import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: useReducer
});
