import React, { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import * as hardwareActions from "../../actions/hardwareActions";

const TableTest = () => {
  const columns = [
    { id: "System_ID", name: "System_ID" },
    { id: "Name", name: "Name" },
    { id: "User", name: "User" },
    { id: "OS", name: "OS" },
    { id: "CPU", name: "CPU" },
    { id: "DiskType", name: "DiskType" },
    { id: "MDAP_Version", name: "MDAP_Version" },
    { id: "Memory", name: "Memory" },
    { id: "Status", name: "Status" }

  ]
  const dispatch = useDispatch();

  const { selected_hardware, reservation } = useSelector(
    (state) => state.hardware_parameters
  );

  const isSelected = (System_ID) => selected_hardware.indexOf(System_ID) !== -1;


  const handleClick = (event, row) => {
		let newSelected = selected_hardware;
		if (selected_hardware !== row.System_ID && row.Status === 'Available') { 
			newSelected = row.System_ID; 
			// setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
		}

		dispatch(hardwareActions.updateHardwares(newSelected));
	}; 

  const { vm_rows, vm_rows_status } = useSelector((state) => state.hardware_parameters);
  console.log(vm_rows.resp_data, "vm_rows")

  useEffect(() => {
    console.log("calling use effect")
    const vm_data = () => dispatch(hardwareActions.getVMList());
    vm_data();
  }, [])

  // console.log(vm_rows.resp_data,"resp data");
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow >
            {columns.map((column) => (
              <TableCell colSpan={12} align="center" key={column.id} >{column.name}</TableCell>
            ))}

          </TableRow>
        </TableHead>
        <TableBody>
          {vm_rows.resp_data.map((row, index) => {
            const isItemSelected = isSelected(row.System_ID);
            console.log(row.CPU, "row")
            return (
              // <TableRow key={index} colSpan={12}>
              //   {columns.map((column, index) => {
              //     let value = row[column.id];
              //     console.log(value,"value")
              //     return(

              //       <TableCell colSpan={12} align="center" key={value}>{value}</TableCell>
              //     )
              //   })}
              // </TableRow>
              <TableRow
                hover
                onClick={(event) => handleClick(event, row)}
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
									disabled={row.Status === "In-Use" || row.Status === "Stopped" || row.Status === "Under-Maintenance"}/></TableCell>
                <TableCell colSpan={12} align="center" className="bg-red">{row.System_ID}</TableCell>
                <TableCell colSpan={12} align="center" className="bg-red">{row.Name}</TableCell>
                <TableCell colSpan={12} align="center" >{row.User}</TableCell>
                <TableCell colSpan={12} align="center">{row.OS}</TableCell>
                <TableCell colSpan={12} align="center">{row.CPU}</TableCell>
                <TableCell colSpan={12} align="center">{row.DiskType}</TableCell>
                <TableCell colSpan={12} align="center">{row.MDAP_Version}</TableCell>
                <TableCell colSpan={12} align="center">{row.Memory}</TableCell>
                <TableCell colSpan={12} align="center">{row.Status}</TableCell>
              </TableRow>

            )
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableTest
