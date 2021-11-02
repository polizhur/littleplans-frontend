import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import activities from "./activities/reducer";

export default combineReducers({
  appState,
  user,
  activities,
});
