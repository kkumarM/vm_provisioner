import * as actionTypes from "../actions/actionTypes";
import Moment from "moment"; 

const initialState = {
    vm_rows: [],
    vm_rows_status: 400,
    selected_hardware: "",
    reservation: Moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)).format('YYYY/MM/DD hh:mm:ss'),
}

export default function processorReducer(state=initialState, action) {
    switch (action.type){
        case actionTypes.UPDATE_VM_HARDWARES:
            return {
                ...state,
                selected_hardware: action.payload,                
            };

        case actionTypes.VM_LIST:
            return{
                ...state, 
                vm_rows: action.payload,
                vm_rows_status: 200
            };
        
        case actionTypes.RESERVATION:
            return {
                ...state, 
                reservation: action.payload,

            };
        default:
            return state;
    }
}