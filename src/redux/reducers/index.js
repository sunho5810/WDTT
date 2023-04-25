import { combineReducers } from "redux";
import membersReducer from "./membersReducer";
import authenticateReducer from "./authenticateReducer";

export default combineReducers({
    members: membersReducer,
    auth: authenticateReducer
})