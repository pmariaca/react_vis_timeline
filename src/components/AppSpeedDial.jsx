import React from 'react'
import { useVisContext } from '../contexts/VisProvider';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { TbArrowAutofitContent } from "react-icons/tb";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

const AppSpeedDial = () => {
  const { tlRef, tlItemRef, tlItem, tlValuesForm } = useVisContext();
  const actions = [
    // tlRef.current.fit(); 
    { icon: <TbArrowAutofitContent />, name: 'zoom Out', clicki: () => tlRef.current.fit() },
    { icon: <ZoomInIcon />, name: 'zoom Selected In', clicki: () => tlRef.current.focus(tlRef.current.getSelection()) },
    { icon: < ArrowForwardOutlinedIcon />, name: 'move Right', clicki: () => move(-0.4) },
    { icon: <ArrowBackOutlinedIcon />, name: 'move Left', clicki: () => move(0.4) },
    // { icon: <SendTimelineToImg componentRef={tlItemRef} />, name: 'Imag'},
  ];

  function zoomSelectedIn() {
    var selection = tlRef.current.getSelection();
    tlRef.current.focus(tlRef.current.getSelection())
  }

  const percen = 0.4
  function move(percentage) {
    var range = tlRef.current.getWindow();
    var interval = range.end - range.start;

    tlRef.current.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end: range.end.valueOf() - interval * percentage
    });
  }

  return (
    // <Box sx={{ position: 'relative', mt: 3, height: 320  , flexGrow: 1 }}></Box>
    <Box sx={{ height: 53, transform: 'translateZ(0px)' }}>
      <SpeedDial
        open='true'
        direction='left' // up right down left
        ariaLabel="SpeedDial basic"
        // sx={{ position: 'absolute', bottom: 316, right: 16 }}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={()=>console.log('ajajaaaaa')}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.clicki}
          // onClick={e => {
          //   e.stopPropagation();
          //   console.log('e',e.target);
          // }}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default AppSpeedDial
