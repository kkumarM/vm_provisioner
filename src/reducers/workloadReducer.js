import * as actionTypes from "../actions/actionTypes"

const initialState = {
  workload_configuration: {  
    teams: "",
    mdap_version: ""}
    
}; 

export default function workloadReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_TEAM_VALUES:
        return {
            ...state,
            workload_configuration: action.payload,
        }; 
        case actionTypes.SET_VERSION_VALUES:
            return {
                ...state,
                workload_configuration: action.payload,
            }
        default:
            return state;
    }
}