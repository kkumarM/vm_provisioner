import {combineReducers} from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    login_parameters : loginReducer,
});

export default rootReducer;
