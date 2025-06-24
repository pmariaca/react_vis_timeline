import React from 'react'
import { Link } from "react-router-dom";import { SlicingArrow, SlicingArrowInv } from './MyIcon'

import MenuItem from '@mui/material/MenuItem';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Box, Divider } from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { GiWitchFlight } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";
import { GiRapidshareArrow } from "react-icons/gi";

// const drawerWidth = 240;  360
const drawerWidth = 360;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const AppHeader = ({ mode, setMode, openV, handleVerticalBArOpen, openB, toggleDrawer, drawerBleeding }) => {

  return (
    <AppBar position="fixed" >
      <Toolbar>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />

        <IconButton
          onClick={handleVerticalBArOpen}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {openV ? <GiReturnArrow /> : < GiRapidshareArrow />}
        </IconButton>

        <IconButton
          onClick={toggleDrawer(true)}
          color="inherit"
          size="large"
          edge="start"
          aria-label="menus"
          sx={{ mr: 2 }}
        >
          <SvgIcon component={openB ? SlicingArrowInv : SlicingArrow} inheritViewBox />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <MenuItem>
          <IconButton >
            {
              mode === "light" ?
                <DarkModeIcon onClick={e => setMode(mode === "light" ? "dark" : "light")} /> :
                <LightModeIcon onClick={e => setMode(mode === "light" ? "dark" : "light")} />
            }
          </IconButton>

        </MenuItem>

        <Divider orientation="vertical" variant="middle" flexItem />
        <MenuItem>
          <IconButton
            color="inherit"
            size='medium'
            aria-label="open drawer"
            style={{ transform: "scale(2)", }}
            sx={[{ marginRight: 5, }]}
          >
            <GiWitchFlight />
          </IconButton>
        </MenuItem>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader