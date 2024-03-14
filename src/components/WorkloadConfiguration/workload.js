import React, { useEffect, useState } from "react";
import {
    Grid,
    FormControl,
    FormLabel,
    NativeSelect,
    FormGroup,
    Box,
    Typography,
    TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Select, Option } from "@material-tailwind/react";
import * as workloadAction from "../../actions/workloadAction"

function WorkloadConfig(props) {
    const dispatch = useDispatch();
    const [submit, SetSubmit] = useState();

    const { workload_configuration } = useSelector((state) => state.workload_parameters)
    
    const handleTeamConfig = (e) => {
        let config_values = workload_configuration;        

        config_values = { ...config_values, teams: e.target.value };
        dispatch(workloadAction.setTeamConfvalues(config_values))
    }

    const handleVersionConfig = (e) => {
        let version = workload_configuration;        

        version = { ...version, mdap_version: e.target.value };
        console.log(version, "conf values")
        dispatch(workloadAction.setVersionConfvalues(version))
    }

    const handleComment = (e) => {
        let comment = workload_configuration;
        comment = { ...comment, comment: e.target.value };
        dispatch(workloadAction.setCommentValue(comment))
    }

    const handleSubmit = () => {
        SetSubmit()
        console.log("Button Clicked")

    }
       return (
        
        <div className="flex py-10 px-20  mx-auto justify-between items-center">

        <div container id="edge_container" className="px-4  mx-auto border border-red-500">
            <div className="flex w-full justify-between">
                <FormGroup row className="flex justify-between">                 

                    <FormLabel className="font-bold text-2xl mt-2 mx-10">Team :</FormLabel>
                    
                    <FormControl className="flex">
                        <NativeSelect
                        value={workload_configuration.teams}
                        onChange={(e) => handleTeamConfig(e)}
                        name="teams"
                        variant="standard"
                        className="bg-red shadow-md shadow-blue-300 rounded-sm bg-slate-400 px-2 w-72"
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

                <FormGroup row className="flex  justify-between">

                    <FormLabel className="font-bold text-2xl mt-2 mx-10">Mdap Version :</FormLabel>
                    
                    <FormControl className="flex">
                        <NativeSelect
                        value={workload_configuration.version}
                        onChange={(e) => handleVersionConfig(e)}
                        name="teams"
                        variant="standard"
                        className="bg-red shadow-md shadow-blue-300 rounded-sm bg-slate-400 px-2 w-72"
                        >           
                        <option value="3.1.0">3.1.0</option>
                        <option value="4.1.6">4.1.6</option>
                        <option value="4.2.3">4.2.3</option>
                        <option value="4.3">4.3</option>
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

                
            </div>
            <Grid conainer className="w-full mt-10">
                <Grid item xs={12}>
                    <Typography variant="h8">Additional Comments:</Typography>
                    <div className="mx-auto">

                    <TextField 
                    fullWidth
                    name="comments"
                    value={workload_configuration.comments}
                    onChange={(e) => handleComment(e)}
                    variant="outlined"
                    
                    />                        
                    </div>
                </Grid>
            </Grid>
            <div className=" px-80 mt-10 mx-auto">
            <button className="bg-blue-500 rounded-xl px-4 py-2 text-white"
            onClick={() => handleSubmit()}>Submit</button>
            </div>                            
        </div>

    
    
    </div>
        
    ); 
    // return (
    //     <div className="flex w-72 mx-auto flex-col gap-6">
    //         <Select color='blue' 
    //         // variant="outlined"
    //         label="Select Team" 
    //         value={workload_configuration.teams}
    //         onChange={(e) => handleWorkloadConfig(e)}
    //         name="teams" >
    //             <Option>IQEG</Option>
    //             <Option> CQI </Option>
    //             <Option> DeviceVue </Option>
    //             <Option> S3  </Option>
    //             <Option> Automation </Option>
    //             <Option> QA & Verification </Option>
    //             <Option> INDA </Option>
    //             <Option> HCL - Pump </Option>
    //         </Select>
    //     </div>
    // );

    
}

export default WorkloadConfig;
