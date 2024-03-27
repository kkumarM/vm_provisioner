import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as hardwareActions from "../../actions/hardwareActions";

const Dashboard = () => {
    let hw =[];
    let ip = "";
    let status = "";
    let node_access = [];

    const dispatch = useDispatch();
    
    const { selected_hardware, vm_rows, reservation } = useSelector(
        (state) => state.hardware_parameters
    ); 

    const [state, setState] = React.useState({
        open:false,
        sel_job: {},
        
    });

    for (let i = 0; i < vm_rows.resp_data.length; i++) {
        if (vm_rows.resp_data[i]["System_ID"] === selected_hardware) {
            // ip = vm_rows.resp_data[i]["IP"];
            status = vm_rows.resp_data[i]["Status"];
            // localStorage.setItem('res_day', vm_rows.resp_data[i]["Res_day"]);
            hw = [{
                System_ID: selected_hardware,
                IP: ip,
                reservation: reservation,
                Status: status,

            }]
        } else {
            status = "";
        }
    };
    // frame the current job object for adding to the cart
    const current_job = {
        hardware_configuration : {
            selected_hardware: hw,
        },
    };
    const showJob = (item) => {
            setState({ ...state, open:true, sel_job: { ...item }});
        }
    const handleClose = () => {
        setState({ ...state, open:false});
    }; 

    const handlePlayBtn = (item, index) => {
        const formData = new FormData();
        localStorage.setItem("indexing", index);
        
        dispatch();
    }

  return (
    <div>
      
    </div>
  )
}

export default Dashboard
