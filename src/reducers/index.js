import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import workloadReducer from "./workloadReducer";
import hardwareReducer from "./hardwareReducer";
import summaryReducer from "./summaryReducer";

const rootReducer = combineReducers({
    login_parameters : loginReducer,
    workload_parameters : workloadReducer,
    hardware_parameters: hardwareReducer,
    summary_parameteres: summaryReducer,
});

export default rootReducer;
