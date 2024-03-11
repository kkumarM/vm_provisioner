import axios from "axios";
import * as actionTypes from "./actionTypes"; 

export const setTeamConfvalues = (config_values) => {
    return {
        type: actionTypes.SET_TEAM_VALUES,
        payload: config_values
    }
}