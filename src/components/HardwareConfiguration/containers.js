import React from "react";

import {
	Grid,
	TableContainer,
	Table,
	TableCell,
	TableBody,
	TableRow,
	TableHead,
	Checkbox,

}from "@material-ui/core;

import * as hardwareActions from "../../actions/hardwareActions";
import { useDispatch, useSelector } from "react-redux";


function ContainersList(){
	const dispatch = useDispatch();


	const headCells = [
		{id: "system_id", label: "System ID" },  
		{id: "status", label: "Status" },  
		{id: "cluster_type", label: "Cluster Type" },  
		{id: "type", label: "type" },  
		{id: "cpu", label: "CPU" },  
		{id: "vm_size", label: "VM Size" },  
		{id: "config", label: "Config" },  
		{id: "OS", label: "OS" },  
		{id: "user", label: "User" },  
		{id: "reservation", label: "Reservation" },  
	]
}


