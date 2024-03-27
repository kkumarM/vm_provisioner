import React from 'react'
import * as actionTypes from "./actionTypes"
import axios from "axios";
import Moment from 'moment';

export const sendProvisioningData = (item) => {
    let username = localStorage.getItem("user");

  return (dispatch) => {
    dispatch(provisioningStatus("VM Provisioning is in progress..."));
    axios 
    .post(actionTypes.BASE_URL + "provisioning", item)
    .then((response) => {
        console.log(response, "sucess resp");
        dispatch(provisioningStatus(response.data));
        dispatch(updateJobStatus("Completed"));

    })
    .catch((err) => {
        dispatch(updateJobStatus("InComplete"));
        console.log(err, "error resp");
    })
  }    
  
};

export const provisioningStatus = (data) => {
    return {
        type: actionTypes.PROVISIONING_STATUS,
        payload: data,
    }
};

export const updateJobStatus = (status) => {
    return {
        type: actionTypes.SET_BENCHMARK_STATUS, 
        payload:status, 
    }
}; 

export const appendJob = (obj) => {
    return {
        type: actionTypes.APPEND_JOB,
        payload:obj,
    }
}; 

export const updateJobArray = (jobs_array) => {
    return {
        type: actionTypes.UPDATE_JOBS_ARRAY,
        payload: jobs_array,
    }
}; 

export const startVMSuccess = (data) => {
    return {
        type : actionTypes.VM_START,
        payload: data,
    }
}; 

export const stopVMSuccess = (data) => {
    return {
        type : actionTypes.VM_STOP, 
        payload: data,
    }
}; 

export const resetVMSuccess = (data) => {
    return {
        type: actionTypes.VM_RESET,
        payload: data,
    }
}; 

