import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { PlayArrow, Delete, Stop, Check, PlayCircleOutline, Assessment } from "@material-ui/icons";
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import Terminal from '@mui/icons-material/Terminal';
import SummarizeIcon from '@mui/icons-material/Summarize';
import IosShareIcon from '@mui/icons-material/IosShare';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimeCalculator from "./TimeCalculator";
import JSONDialogBox from "./JSONDialogBox";
import * as hardwareActions from "../../actions/hardwareActions";
import { makeStyles } from "@material-ui/core/styles";
import * as summaryActions from "../../actions/summaryActions";
import {
    Grid,
    TableContainer,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Paper,
    Button,
    Typography,
    Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttonClass: {
      marginRight: "8px", marginBottom: '6px', padding: '5px 4px', minWidth: '41px'
    },
    tableSpace: {height: '30px'},
    alignment:{ textAlign: 'center'},
    blueIconClass: {color: "#33aaff", marginRight: "5px", padding: '7px 8px' , borderRadius: ' 21px', minWidth: '1px', marginBottom: '6px'},
    greyIconClass: {color: "#666660", marginRight: "5px", padding: '7px 8px' , borderRadius: ' 21px', minWidth: '1px', marginBottom: '6px'},
    addBtn: {float: "right", marginBottom: "25px"},
    instancePop:{float: 'left'},
    cellWrap: {wordWrap: 'break-word', width: '14%'}
  }));

const Dashboard = () => {
    let hw = [];
    let ip = "";
    let status = "";
    let node_access = [];

    const dispatch = useDispatch();

    const classes = useStyles();

    const { selected_hardware, vm_rows, reservation } = useSelector(
        (state) => state.hardware_parameters
    );

    const {
        all_jobs,
        vm_reserved_status,
        vm_reset_resp,
        results_url,
        saved_jobs,
        added_jobs_resp,
        vm_start_resp_status,
        vm_stop_resp_status,
        vm_reset_resp_status

    } = useSelector((state) => state.summary_parameters);

    const [state, setState] = React.useState({
        open: false,
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
        hardware_configuration: {
            selected_hardware: hw,
        },
    };
    const showJob = (item) => {
        setState({ ...state, open: true, sel_job: { ...item } });
    }
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const handlePlayBtn = (item, index) => {
        const formData = new FormData();
        localStorage.setItem("indexing", index);

        dispatch();
    };

    const handleAddBtn = () => {
        current_job.hardware_configuration.selected_hardware.length > 0 &&
            dispatch(summaryActions.appendJob(current_job));
        setState({ ...state, cart_btn: true });
    };

    useEffect(() => {

        dispatch(summaryActions.viewJobs());
        localStorage.setItem('jobStatus', '')
        if (added_jobs_resp === 200) {
            let temp = [...all_jobs];
            var temp_item = all_jobs.indexOf(all_jobs[localStorage.getItem('indexing')])
            if (temp_item !== -1) {
                temp.splice(temp_item, 1);
                dispatch(summaryActions.updateJobsArray(temp));
                dispatch(summaryActions.updateAddJobStatus(""));
                setState({ ...state, cart_btn: true });
                // localStorage.setItem('jobStatus', new_status)
                dispatch(summaryActions.updateJobStatus("Not Started"));

                localStorage.removeItem('indexing');
            }
        }
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                {selected_hardware &&
                    <Button
                        variant="contained"
                        onClick={handleAddBtn}
                        color="primary"
                        disabled={state.cart_btn || current_job.hardware_configuration.selected_hardware[0].Status !== 'Available'}
                    >
                        Add Job to Cart
                    </Button>
                }
                {
                    localStorage.getItem('jobStatus') === 'Completed' && saved_jobs.length === 0 &&
                    <div className="spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                }
                        {selected_hardware === '' && saved_jobs.length === 0 && 
        <TableContainer component={Paper} id="hardware_table_info">
          <Table aria-label="simple table"><TableBody><TableRow>
            <TableCell colSpan={12} align="center">
              No Added Hardware Available.
            </TableCell>
          </TableRow></TableBody></Table>
        </TableContainer>}
        {all_jobs.length > 0 && selected_hardware &&  (
          <>
          {/* <div className={classes.instancePop}><strong>Created Instance</strong>
          </div><div className={classes.instancePop}><WorkloadPop/></div> */}
          <TableContainer component={Paper} id="summary_table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Workload</TableCell>
                  <TableCell align="center">System ID</TableCell>
                  <TableCell align="center">Created On</TableCell>
                  <TableCell align="center">Summary</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Controls</TableCell>
                  <TableCell align="center">Real Time Monitoring</TableCell>
                  <TableCell align="center">Node Access</TableCell>
                  <TableCell align="center">Node Mgnt</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {all_jobs.map((item, index) => {
                  new_status =  Number(localStorage.getItem('indexing')) !== index ?  "Not Started" : benchmark_status ;
                 
                  return (
                    <TableRow key={index}>
                      <TableCell align="center" className={classes.cellWrap}>{item.pre_defined_workloads.workload_name+'-0'}
                        { saved_jobs.length + 1}</TableCell>
                      <TableCell align="center" >{item.hardware_configuration.selected_hardware[0].System_ID}</TableCell>
                      <TableCell align="center">{Moment(item.hardware_configuration.selected_hardware[0].Created_On).format('LLL')}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          title="View Link"
                          onClick={() => showJob(item)}
                          className={classes.blueIconClass}
                        >
                          <SummarizeIcon/>
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {new_status }
                      </TableCell>
                      <TableCell align="center">  
                      {new_status === 'Not Started' ?           
                        <Button
                          variant="contained"
                          title="Start"
                          className={classes.buttonClass}
                          onClick={() => handlePlayBtn(item, index)}
                          style={{ background: "lightgreen",
                          }}
                        >
                          <PlayArrow/>
                        </Button>: <Button
                            variant="contained"
                            title="Pause"
                            className={classes.buttonClass}
                            disabled
                            style={{background: "lightgreen",
                            }}
                          >
                            <Stop />
                          </Button>} 
                        <Button
                          variant="contained"
                          title="Stop"
                          className={classes.buttonClass}
                          onClick={() => {
                            handleDelete(item)}}
                          style={{background: "red",
                          }}
                          
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        
                      
                      </TableCell>
                      

                      {/* Node Management */}    
                      
                      <TableCell align="center">                   
                       {/* {new_status !== "Completed" ? '' : localStorage.getItem('res_day') <= 1 ? localStorage.getItem('res_day') + ' Day Remaining' : localStorage.getItem('res_day') + ' Days Remaining'}                     */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer></>
        )}
         {/* api success responses */}
         {benchmark_status !== "Not Started" && 
          vm_reset_resp !== "VM_Resetted" && all_jobs.length > 0 && (
          <Typography component="div" className="logs_container">
            <h4 className="log_title">Log details...</h4>
            <Typography component="div" className="logs_details">
              <Typography>
                <Check /> {vm_reserved_status}...
              </Typography>
              {ssh_access_status && 
              <Typography>
                <Check /> {ssh_access_status}...
              </Typography>
              }
              {upload_files_status !== "" && (
                <>
                  <Typography>
                    <Check /> Transferred the Workload, Models and Streams...
                  </Typography>
                  <Typography>
                    <Check /> Transferred Application services and Eval
                    Configuration scripts...
                  </Typography>
                </>
              )} 
              {provisioning_status &&             
                <Typography>
                  <Check /> {provisioning_status}...
                </Typography>
              }
            </Typography>
          </Typography>
        )}
        <Grid className={classes.tableSpace}></Grid>
        {/* saved job list */}
        {saved_jobs.length > 0 && (
          <><div className={classes.instancePop}><strong>Running Instance</strong></div>
          <div className={classes.instancePop}><WorkloadRunningInstancePop/></div>
          <TableContainer component={Paper} id="summary_table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Workload</TableCell>
                  <TableCell align="center">System ID</TableCell>
                  <TableCell align="center">Created On</TableCell>
                  <TableCell align="center">Summary</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Controls</TableCell>
                  <TableCell align="center">Real Time Monitoring</TableCell>
                  <TableCell align="center">Node Access</TableCell>
                  <TableCell align="center">Node Mgnt</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  {saved_jobs.map((item, index) => {
                   return (
                    <TableRow key={index}>
                      <TableCell align="center" className={classes.cellWrap}>{item.wl_obj.workload}</TableCell>
                      <TableCell align="center">{item.wl_obj.summary.hardware_configuration.selected_hardware[0].System_ID}</TableCell>
                      <TableCell align="center">{Moment(item.wl_obj.summary.hardware_configuration.selected_hardware[0].Created_On).format('LLL')}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => showJob(item)}
                          title='View Link'
                          className={classes.blueIconClass}
                        >
                          <SummarizeIcon/>
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {item.wl_obj.controls === 'play' ? 'In Process' : 'Stop'}
                      </TableCell>
                      <TableCell align="center">
                        {item.wl_obj.summary.workload_configuration.edge_device_configuration.instance_type === 'VM'? 
                          item.wl_obj.controls === 'play' ?
                          <Button
                            variant="contained"
                            title="Stop"
                            className={classes.buttonClass}
                            onClick={() => handleStop(item.wl_obj.summary, index)}
                            disabled={state.ctrl_btn === index }
                            style={{ background: "lightgreen"}}
                          >
                            <Stop />
                          </Button>
                          :
                          <Button
                          variant="contained"
                          title="Start"
                          className={classes.buttonClass}
                          onClick={() => handleStart(item.wl_obj.summary, index)}
                          disabled={state.restart_btn === index}
                          style={{ background: "lightgreen" }}
                        >
                          <PlayArrow/>
                        </Button>
                        : ""}
                        <Button
                          variant="contained"
                          title="Delete"
                          className={classes.buttonClass}
                          onClick={() => {
                            handleReset(item.wl_obj.summary, index);
                            }}
                          disabled={state.reset_btn === index}                           
                          style={{ background: "red"}}
                        >
                          <Delete />
                        </Button>
                      </TableCell>
                      
                      

                      {/* Node Management */}    
                      
                       
                    </TableRow>
                  );
                })
                } 
              </TableBody>
            </Table>
          </TableContainer></>
        )}

            </Grid>
            <JSONDialogBox
                obj={state.sel_job}
                open={state.open}
                handleClose={handleClose}
            />
            <Snackbar
                open={state.alert_open}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{
                    vertical: state.vertical,
                    horizontal: state.horizontal,
                }}
            >
                <Alert onClose={handleAlertClose} severity="error">
                    Target Node is under Process. Re-Provision it after seconds.
                </Alert>
            </Snackbar>
        </Grid>



    )
}

export default Dashboard
