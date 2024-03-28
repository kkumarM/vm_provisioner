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
        payload: status,
    }
};

export const appendJob = (obj) => {
    return {
        type: actionTypes.APPEND_JOB,
        payload: obj,
    }
};

export const updateJobsArray = (jobs_array) => {
    return {
        type: actionTypes.UPDATE_JOBS_ARRAY,
        payload: jobs_array,
    }
};

export const startVMSuccess = (data) => {
    return {
        type: actionTypes.VM_START,
        payload: data,
    }
};

export const stopVMSuccess = (data) => {
    return {
        type: actionTypes.VM_STOP,
        payload: data,
    }
};

export const resetVMSuccess = (data) => {
    return {
        type: actionTypes.VM_RESET,
        payload: data,
    }
};

export const startVM = (vm_data) => {
    // const headers = {
    //     'Authorization': 'Bearer ' + localStorage.getItem('authorizaton'),
    // }

    return (dispatch) => {
        dispatch(startVMSuccess("VM is Starting..."))
        axios
            .post(actionTypes.BASE_URL + "startVM", vm_data)
            .then((resp) => {
                // dispatch(viewJobs());
                console.log(resp, "success resp");
                dispatch(startVMSuccess(resp));
            })
            .catch((err) => {
                console.log(err, "error resp");
            });
    };
};

export const stopVM = (vm_data) => {
    // const headers = {
    //     'Authorization': 'Bearer ' + localStorage.getItem('authorizaton'),
    // }

    return (dispatch) => {
        dispatch(stopVMSuccess("VM is Stopping..."))
        axios
            .post(actionTypes.BASE_URL + "stopVM", vm_data,)
            .then((resp) => {
                // dispatch(viewJobs());
                console.log(resp, "success resp");
                dispatch(stopVMSuccess(resp));
            })
            .catch((err) => {
                console.log(err, "error resp");
            });
    };
};


export const resetVM = (data) => {
    // const headers = {
    //     'Authorization': 'Bearer ' + localStorage.getItem('authorizaton'),
    // }

    return (dispatch) => {
        dispatch(resetVMSuccess("VM is resetting..."))
        axios
            .post(actionTypes.BASE_URL + "resetVM", data)
            .then((resp) => {
                console.log(resp, "success resp");
                dispatch(resetVMSuccess(resp));
            })
            .catch((err) => {
                console.log(err, "error resp");
            });
    };
};

export const addJobs = (ip, workload_name, description, item, benchmark_status, control, real_time_monitoring, node_access, res_day, results) => {
    let username = localStorage.getItem("user");

    const data = {
        user: username,
        IP: ip,
        workload: workload_name,
        last_executed: Moment().format("YYYY/MM/DD hh:mm:ss A"),
        description: description,
        summary: item, status: benchmark_status, controls: control,
        real_time_monitoring: real_time_monitoring,
        node_access: node_access, reservation: res_day,
        results
    }
    // const headers = {
    //     'Authorization': 'Bearer ' + localStorage.getItem('authorizaton'),
    // }

    return (dispatch) => {
        axios
            .post(
                actionTypes.BASE_URL +
                'add_workloads', data,
                // { headers: headers }
            )
            .then((resp) => {
                console.log(resp, "Job added successfully.");
                // dispatch(viewJobs());
                dispatch({
                    type: actionTypes.SAVED_JOBS_STATUS,
                    payload: resp.status,
                });
            })
            .catch((error) => {
                console.log(error, "error resp")
            });
    };
};

export const viewJobs = () => {
    let username = localStorage.getItem("user");
    // const headers = {
    //     'Authorization': 'Bearer ' + localStorage.getItem('authorizaton'),
    // }

    return (dispatch) => {
        axios
            .get(actionTypes.BASE_URL + "view_workloads?user=" + username)
            .then((resp) => {
                console.log(resp)
                dispatch({
                    type: actionTypes.JOBS_LIST,
                    payload: resp.data,
                });
                // dispatch({
                //   type: actionTypes.JOBS_LIST_STATUS,
                //   payload: resp.status,
                // });
            })
            .catch((err) => {
                console.log(err, "error resp");
            });
    };
};

export const updateAddJobStatus = (status) => {
    return {
        type: actionTypes.SET_ADD_JOB_STATUS,
        payload: status,
    };
};

export const updateResetVmStatus = (status) => {
    return {
        type: actionTypes.SET_VM_RESET_STATUS,
        payload: status,
    };
};