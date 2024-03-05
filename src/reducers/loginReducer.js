import * as actionTypes from "../actions/actionTypes"; 

const initialState = {
    username:"",
    password:"",
    isAuthenticated:"",
    error_msg:"",
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_LOGIN_DETAILS:
            return {
                ...state, 
                username: action.payload.username,
                password: action.payload.password, 
            }; 
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: action.payload, 
            }
            default:
                return state;
    }
}