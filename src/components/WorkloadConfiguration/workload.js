import React, { useEffect } from "react";
import {
    Grid,
    FormControl,
    FormLabel,
    NativeSelect,
    FormGroup,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as workloadAction from "../../actions/workloadAction"

function WorkloadConfig(props) {
    const dispatch = useDispatch();

    const { workload_configuration } = useSelector((state) => state.workload_parameters)
    
    const handleWorkloadConfig = (e) => {
        let config_values = workload_configuration;
        let val = e.target.value;

        config_values = { ...config_values, teams: e.target.value };
        console.log(workload_configuration, "conf values")
        dispatch(workloadAction.setWorkloadConfvalues(config_values))
    }
    return (
        
        <div className="py-10">

        <Grid container id="edge_container" className="m-4 w-full px-5">
            <Grid items xs={3}>
                <FormGroup row className="flex justify-between">                 

                    <FormLabel className="text-xl font-extrabold">Team</FormLabel>
                    
                    <FormControl className="space-x-4">
                        <NativeSelect
                        value={workload_configuration.teams}
                        onChange={(e) => handleWorkloadConfig(e)}
                        name="teams"
                        >           
                        <option value="IQEG">IQEG</option>
                        <option value="CQI">CQI</option>
                        <option value="DeviceVue">DeviceVue</option>
                        <option value="S3">S3</option>
                        <option value="Automation">Automation</option>
                        <option value="QA & Verification">QA & Verification</option>
                        <option value="INDA">INDA</option>
                        <option value="HCL-Pump">HCL-Pump</option>
                         {/* {        
                             teams.map((item, index) => {
                                 return (
                                     <option value={item} key={index}>
                                     {item}
                                     </option>
                                     );
                                    } */}
                            
                                                
                        
                        </NativeSelect>

                    </FormControl>

                </FormGroup>
            </Grid>
        </Grid>
        </div>
        
    );
}

export default WorkloadConfig;
