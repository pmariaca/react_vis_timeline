import React, { useRef } from 'react'
// import data from '../data/data_rosa.js'
import data from '../data/data_culturamaya.js'


import '../vis.css'

import { useVisContext } from '../contexts/VisProvider';
// import VisTimeline from '../components/VisTimeline'
import VisTimelineDep from '../components/VisTimelineDep.jsx'
import AppSpeedDial from '../components/AppSpeedDial'
import { Box, Divider } from '@mui/material';

const Dashboard = () => {
  const timelineRef = useRef(null);
  const timelineDepRef = useRef(null);

  return (
    <div>
      {/* <AppSpeedDial /> */}

      {/* <Divider >.......................</Divider> */}

        <VisTimelineDep
          data={data}
          timelineRef={timelineRef}
          timelineDepRef={timelineDepRef}
        />


      
    </div>
  )
}

export default Dashboard
