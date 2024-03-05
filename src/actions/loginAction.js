import * as actionTypes from "./actionTypes"; 
import axios from "axios";

export const setLoginDetails = (user_data) => {
    return {
        type: actionTypes.SET_LOGIN_DETAILS, 
        payload: user_data,
    };
}

export const verifyLogin = (user_data) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
    }

    return (dispatch) => {
        console.log(user_data, "user_Data")
        axios.post(actionTypes.BASE_URL + "login", user_data, {headers:headers})
        .then((resp) => {
            console.log(resp, "success resp"); 
            if (resp.data.status === "Login Successful") {
                localStorage.setItem("isUserAuthenticated", true);
                localStorage.setItem("authorization", resp.data.token);
                sessionStorage.setItem("isLogged", true);
                localStorage.setItem("user",user_data.username);
                dispatch(loginSuccess(true));
                dispatch(invalidUsername(""));
            } else if (resp.data === "Invalid Username or Password") { 
                dispatch(invalidUsername(resp.data));
            }
        })
        .catch((err) => {
            console.log(err, "error resp")
        });
    };
};

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: data,
    };
}; 

export const invalidUsername = (data) => {
    return {
        type: actionTypes.INVALID_USERNAME, 
        payload: data, 
    }
}