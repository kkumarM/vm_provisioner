import React, {useEffect} from "react";

import {
	Grid,
	TableContainer,
	Table,
	TableCell,
	TableBody,
	TableRow,
	TableHead,
	Checkbox,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import Moment from "moment";


import * as hardwareActions from "../../actions/hardwareActions";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { subMonths, addMonths } from "date-fns";


function VM(){
	const dispatch = useDispatch();


	const headCells = [
		{id: "system_id", label: "System ID" },  
		{id: "status", label: "Status" },  
		{id: "type", label: "type" },  
		{id: "cpu", label: "CPU" },  
		{id: "vm_size", label: "VM Size" },  
		{id: "config", label: "Config" },  
		{id: "OS", label: "OS" },  
		{id: "user", label: "User" },  
		{id: "reservation", label: "Reservation" },  
	];

	const {selected_hardware, reservation} = useSelector(
		(state) => state.hardware_parameters
	);


	const { vm_rows, vm_rows_status } = useSelector((state) => state.hardware_parameters);
	
	const isSelected = (System_ID) => selected_hardware.indexOf(System_ID) !== -1;

	const [selectedDate, setSelectedDate] = React.useState('');

	const handleDateChange = (date) => {
		setSelectedDate(date);
		dispatch(hardwareActions.updateReservation(Moment(date).format("YYYY/MM/DD hh:mm:ss")));
	};

	const handleClick = (event, row) => {
		let newSelected = selected_hardware;
		if (selected_hardware !== row.System_ID && row.Status === 'Available') { 
			newSelected = row.System_ID; 
			setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
		}

		dispatch(hardwareActions.updateHardwares(newSelected));
	}; 

	 
	
	const hardware_data = () => {
		let filtered_data;
		// populate VM list
		return (
			<TableBody>
				{ filtered_data.length === 0 || Object.keys(vm_rows).length === 0 ? (
					<TableRow>
						<TableCell colSpan={12} align='center'>
							No Data Available
						</TableCell>
					</TableRow>
				):(
					filtered_data.map((row, index) => {
						const isItemSelected = isSelected(row.System_ID);
						return(
							<TableRow 
							hover
							onClick = {(event) => handleClick(event, row)}
							role="checkbox"
							aria-checked={isItemSelected}
							tabIndex={-1}
							key={index}
							selected={isItemSelected}
							className={(row.Status === "In-Use" || row.status === "Stoppped") ? "row_disabled" : ""}
							>
								<TableCell padding="checkbox">
									<Radio
									checked={isItemSelected}
									value = {row.System_ID}
									disabled={row.Status === "In-Use" || row.Status === "Stopped" || row.Status === "Under-Maintenance"}/>

								</TableCell>
								<TableCell align='center'>{row.System_ID}</TableCell>
								<TableCell 
								align="center"
								className={
									row.Status === "Available"
									? "status_color-green"
									: "status_color_red"
								}
								>
									{row.Status}
								</TableCell>
								<TableCell align="center">{row.Type}</TableCell>
								<TableCell align="center">{row.CPU}</TableCell>
								<TableCell align="center">{row.OS}</TableCell>
								<TableCell align="center">{row.VM_SIZE}</TableCell>
								<TableCell align="center">{row.User}</TableCell>
								{row.Reservation ? <TableCell align="center">{Moment(row.Reservation).format("YYYY/MM/DD") }</TableCell> :
								<TableCell align="center">
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker 
										variant="inline"
										format="yyyy/mm/dd"
										margin="normal"
										id="date-picker-inline"
										name="reservation"
										disablePast
										autoOk={true}
										error={false}
										helperText={null}
										className=""
										value={row.System_ID === selected_hardware ? selectedDate: ''}
										onChange={(e) => handleDateChange(e)}
										InputProps={{readOnly:true}}
										KeyboardButtonProps={{
											"aria-label": "change date"
										}}
										/>
									</MuiPickersUtilsProvider>
								</TableCell>
								
								}

							</TableRow>
						);
					})
				)
				}
			</TableBody>
		);
	};
	useEffect(() => {
		const vm_data = () => dispatch(hardwareActions.getVMList());
		vm_data();
		
	  }, [reservation])
	
}

export default VM;
