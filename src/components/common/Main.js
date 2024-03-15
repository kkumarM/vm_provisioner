import React from 'react'
import { Tabs, Tab, Grid, Typography, Box } from '@material-ui/core'
import WorkloadConfig from "../WorkloadConfiguration/workload"
import VM from "../HardwareConfiguration/VM"

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div>
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
    // const [hardwareConf, setHardwareConf] = React.useState(0);


    const handleTabChange = (event, newValue) => {
        setFirtLevelTabValue(newValue);
    }

    const workloadConfClick = (event, newValue) => {
        setWorkloadConf(newValue);
    }

    // const hardwareConfClick = (event, newValue) => {
    //     setHardwareConf(newValue);
    // }
  return (
    
    <div className='relative py-28 justify-center w-screen'> 
        <Grid container spacing={0} alignItems="center" className='flex place-content-center mx-auto w-full rounded-md'>

        <Grid item sm={6} className="space-x-4">
        <Tabs className='bg-blue-100 rounded-md'
        value={firstLevelTabValue}
        onChange={handleTabChange}
        indicatorColor='primary'
        >
            <Tab className='hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label = "Workload Configuration" />
            <Tab className='hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label = "Hardware Configuration" />
            <Tab className='justify-between hover:bg-white hover:rounded-xl hover:p-2 hover:font-bold' label = "Dashboard" />

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
        </Grid>
            </Grid>

        <TabPanel value={workloadConf} index={0}>
            <div className='mt-10 w-50'>
                <WorkloadConfig />
            </div>
        </TabPanel>
        <TabPanel value={firstLevelTabValue} index={1}>
            <div className='mt-10 w-50'>
                <VM />
            </div>
        </TabPanel>
        </div>
    
  )
}

export default Main
