import { combineReducers } from "redux";
import membersReducer from "./membersReducer";
import authenticateReducer from "./authenticateReducer";
import teamsReducer from "./teamsReducer";

export default combineReducers({
    members: membersReducer,
    auth: authenticateReducer,
    teams: teamsReducer
})