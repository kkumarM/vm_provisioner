import * as actionTypes from "./actionTypes";
import axios from "axios";

export const updateReservation = (reservation) => {
    return {
        type : actionTypes.RESERVATION,
        payload : reservation,
    };
};

export const getVMList = () => {
    let username = localStorage.getItem("user");
    const headers = {
        'Authorization': 'Bearer' + localStorage.getItem('authorization'),
    }
    return (dispatch) => {
        axios
        .get(actionTypes.BASE_URL + "select_hw?user=" + username,{headers: headers})
        .then((response) => {
            console.log(response, "vm list success response")
            dispatch({
                type: actionTypes.VM_LIST,
                payload: response.data,
            });
        })
        .catch((error) => console.log(error, "error response"))
    };
};