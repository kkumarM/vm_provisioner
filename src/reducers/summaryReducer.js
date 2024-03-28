import * as actionTypes from "../actions/actionTypes";

const initialState = {
    all_jobs:[],
    provisioning_status:"",
    vm_reserved_status:"",
    vm_start_status:"",
    vm_start_resp:"",
    vm_stop_status:"",
    vm_stop_resp:"",
    vm_reset_status:"",
    vm_reset_resp:"",
    saved_jobs:{},
    saved_jobs_status:400,
    added_jobs_resp:"",
    vm_start_resp_status:"",
    vm_stop_resp_status:"",
    vm_reset_resp_status:"",
};

export default function summaryReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_VM_STATUS:
            return {
                ...state, 
                vm_reserved_status: action.payload,
            };
        case actionTypes.APPEND_JOB:
            return {
                ...state,
                all_jobs: [...state.all_jobs, action.payload],
            };
        case actionTypes.UPDATE_JOBS_ARRAY:
            return {
                ...state, 
                all_jobs: action.payload,
            };
        case actionTypes.PROVISIONING_STATUS:
            return{
                ...state,
                provisioning_status: action.payload
            };
        case actionTypes.VM_START:
            return {
                ...state, 
                vm_start_status: action.payload.data,
                vm_start_resp: "VM_Started",
                vm_start_resp_status: action.payload.status
            };
        case actionTypes.VM_STOP:
            return {
                ...state,
                vm_stop_status: action.payload.data,
                vm_stop_resp: "VM_Stopped",
                vm_stop_resp_status: action.payload.status
            };
        case actionTypes.VM_RESET:
            return {
                ...state,
                vm_reset_status: action.payload,
                vm_reset_resp: "VM_Resetted"  ,
                vm_reset_resp_status: action.payload.status
            }; 
        case actionTypes.JOBS_LIST:
            return {
                ...state,
                saved_jobs: action.payload.data,
                saved_jobs_status: 200
            };
        case actionTypes.SAVED_JOBS_STATUS:
            return {
                ...state,
                added_jobs_resp: action.payload,
            };
        case actionTypes.SET_ADD_JOB_STATUS:
            return {
                ...state,
                added_jobs_resp: action.payload
            };
        case actionTypes.SET_VM_RESET_STATUS:
            return {
                ...state,
                vm_reset_resp_status: action.payload,
                vm_reset_status: "",
                vm_reset_resp: ""  ,
            };
        default:
            return state;
    }
}