import React, { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { DatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import Moment from "moment";
import * as hardwareActions from "../../actions/hardwareActions";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    { id: "Status", name: "Status" },
    { id: "Reservation", name: "Reservation" }

  ]
  const dispatch = useDispatch();

  const { selected_hardware, reservation } = useSelector(
    (state) => state.hardware_parameters
  );

  const isSelected = (System_ID) => selected_hardware.indexOf(System_ID) !== -1;

  const [selectedDate, setSelectedDate] = React.useState("");

  const handleDateChange = (date) => {
    console.log(date,"original date")
    console.log(Moment(date).format("YYYY/MM/DD"))
    setSelectedDate(date);
    dispatch(hardwareActions.updateReservation(Moment(date).format("YYYY/MM/DD")));
  }


  const handleClick = (event, row) => {
    let newSelected = selected_hardware;
    if (selected_hardware !== row.System_ID && row.Status === 'Available') {
      newSelected = row.System_ID;
      setSelectedDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    }

    dispatch(hardwareActions.updateHardwares(newSelected));
  };

  const { vm_rows, vm_rows_status } = useSelector((state) => state.hardware_parameters);
  console.log(vm_rows.resp_data, "vm_rows")

  useEffect(() => {
    console.log("calling use effect")
    dispatch(hardwareActions.getVMList());

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
          {Object.keys(vm_rows).length === 0 ? (
            <TableRow>
              <TableCell colSpan={12} align='center'>
                No Data Available
              </TableCell>
            </TableRow>
          ) : (
            vm_rows.resp_data.map((row, index) => {
              const isItemSelected = isSelected(row.System_ID);
              console.log(row.CPU, "row")
              return (
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
                      value={row.System_ID}
                      disabled={row.Status === "In-Use" || row.Status === "Stopped" || row.Status === "Under-Maintenance"} /></TableCell>
                  <TableCell colSpan={12} align="center" className="bg-red">{row.System_ID}</TableCell>
                  <TableCell colSpan={12} align="center" className="bg-red">{row.Name}</TableCell>
                  <TableCell colSpan={12} align="center" >{row.User}</TableCell>
                  <TableCell colSpan={12} align="center">{row.OS}</TableCell>
                  <TableCell colSpan={12} align="center">{row.CPU}</TableCell>
                  <TableCell colSpan={12} align="center">{row.DiskType}</TableCell>
                  <TableCell colSpan={12} align="center">{row.MDAP_Version}</TableCell>
                  <TableCell colSpan={12} align="center">{row.Memory}</TableCell>
                  <TableCell colSpan={12} align="center">{row.Status}</TableCell>
                  {row.Reservation ? (
                    <TableCell colSpan={12} align="center">
                      {row.Reservation}
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          variant="inline"
                          format="yyyy/MM/dd"
                          margin="normal"
                          id="date-picker-inline"
                          name="reservation"
                          disablePast
                          autoOk
                          error={false}
                          helperText={null}
                          className=""
                          value={selectedDate}
                          onChange={handleDateChange} 
                          InputProps={{ readOnly: true }}
                        />
                      </MuiPickersUtilsProvider> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker 
                          label="Reserve" 
                          variant="inline"
                          name ="reservation"
                          // format="yyyy/MM/dd"
                          // value = {selectedDate}
                          onChange={handleDateChange}
                          disabled={row.Status === "In-Use" || row.Status === "Stopped" || row.Status === "Under-Maintenance"}
                          />
                          </LocalizationProvider>
                    </TableCell>
                  )}

                </TableRow>)
            }
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableTest
