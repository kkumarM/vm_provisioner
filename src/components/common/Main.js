import React from 'react'
import { Tabs, Tab, Grid, Typography, Box } from '@material-ui/core'
import WorkloadConfig from "../WorkloadConfiguration/workload"
import VM from "../HardwareConfiguration/VM"
import TableTest from '../HardwareConfiguration/TableTest'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}>
            {value === index && (
                <Box>
                    <Typography component="div" className='mainPadding'>
                        {children}
                    </Typography>
                </Box>
            )}
        </div>
    )
}

const Main = () => {
    const [firstLevelTabValue, setFirtLevelTabValue] = React.useState(0);
    const [workloadConf, setWorkloadConf] = React.useState(undefined);
    const [hardwareConf, setHardwareConf] = React.useState(0);


    const handleTabChange = (event, newValue) => {
        setFirtLevelTabValue(newValue);

        if (newValue === 0) {
            setWorkloadConf(0);
            setHardwareConf();
        } else {
            setHardwareConf(0);
            setWorkloadConf();
        }
    }



    const workloadConfClick = (event, newValue) => {
        setWorkloadConf(newValue);
    }

    const hardwareConfClick = (event, newValue) => {
        setHardwareConf(newValue);
    }

    const dashboardClick = (event, newValue) => {

    }

    return (

        <div className='flex-row py-28'>
            <div className='container place-items-center mx-auto space-x-4 border border-blue-400'>
                {/* <Grid container spacing={0} alignItems="center" className='flex place-content-center mx-auto w-full rounded-md'> */}

                {/* <Grid item sm={6} className="space-x-4"> */}
                <div className='w-4/5 mx-auto'>
                    <Tabs className='bg-blue-100 rounded-md'
                        value={firstLevelTabValue}
                        onChange={handleTabChange}
                        indicatorColor='primary'
                    >
                        {/* <div className='w-1/2 mx-auto border border-red-600'> */}

                        <Tab className='w-full hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label="Workload Configuration" />
                        <Tab className='w-full hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label="Hardware Configuration" />
                        <Tab className='w-full hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label="Dashboard" />
                        {/* </div> */}

                    </Tabs>
                    <TabPanel value={firstLevelTabValue} index={0}>
                        <Tabs
                            value={workloadConf}
                            onChange={workloadConfClick}
                            indicatorColor='primary'
                            variant='fullwidth'
                            className='className="bg-purple-400 rounded-md'
                        >
                            <Tab className="bg-purple-400 rounded-md" label="Select Workload Type" />

                        </Tabs>
                    </TabPanel>
                    {/* </Grid> */}
                    {/* </Grid> */}

                    <TabPanel value={workloadConf} index={0}>
                        <div className='mt-10 mx-auto'>
                            <WorkloadConfig />
                        </div>
                    </TabPanel>
                    <TabPanel value={firstLevelTabValue} index={1}>
                        <div className='mt-10 mx-auto'>
                            <TableTest />
                        </div>
                    </TabPanel>
                </div>
                </div>
            </div>
            )
}

            export default Main
