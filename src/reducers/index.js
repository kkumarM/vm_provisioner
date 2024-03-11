import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import workloadReducer from "./workloadReducer";

const rootReducer = combineReducers({
    login_parameters : loginReducer,
    workload_parameters : workloadReducer,
});

export default rootReducer;
