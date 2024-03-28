import React, { useEffect } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { PlayArrow, Delete, Stop, Check, PlayCircleOutline, Assessment } from "@material-ui/icons";
import Terminal from '@mui/icons-material/Terminal';


const DashboardTest = () => {
    const columns = [
        { id: "System_ID", name: "System_ID" },
        { id: "Name", name: "Name" },
        { id: "User", name: "User" },
        { id: "Actions", name: "Actions" },
        { id: "Remote Access", name: "Remote Access" },
    ]

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
                <TableCell colSpan={12} align="center" >02</TableCell>
                <TableCell colSpan={12} align="center" >brdstgserver903</TableCell>
                <TableCell colSpan={12} align="center" >Karthik</TableCell>
                <TableCell colSpan={12} align="center" >

                            <Button><PlayArrow/></Button>
                            <Button><Stop /></Button>
                            <Button><Delete /></Button>

                </TableCell>
                <TableCell colSpan={12} align="center" >
                    <Button><Terminal /></Button>
                </TableCell>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DashboardTest;

