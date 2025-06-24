import React from 'react'
import { useState } from 'react'

import { VisProvider } from './contexts/VisProvider'
import AppHeader from './components/AppHeader'

import AppVerticalBar from './components/AppVerticalBar'
import AppDrawerSwip from './components/AppDrawerSwip'
import AppRoutes from './AppRoutes'

import { BrowserRouter } from 'react-router-dom';
import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { styled } from '@mui/material/styles';

const drawerBleeding = 50

const DrawerHeader2 = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [open, setOpen] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openV, setOpenV] = useState(true);

  const handleVerticalBArOpen = () => {
    setOpenV(openV ? false : true);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenB(openB ? false : true);
    // setOpenB(newOpen);
  };

  return (
    <React.Fragment>
      <VisProvider>
        <ThemeProvider theme={darkTheme}>
          <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />
              <AppHeader
                mode={mode}
                setMode={setMode}
                openV={openV}
                handleVerticalBArOpen={handleVerticalBArOpen}
                openB={openB}
                toggleDrawer={toggleDrawer}
                drawerBleeding={drawerBleeding}
              />

              <AppVerticalBar
                openV={openV}
              />

              <AppDrawerSwip
                open={openB}
                toggleDrawer={toggleDrawer}
                drawerBleeding={drawerBleeding}
              />

              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader2 />
                <AppRoutes />
              </Box>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </VisProvider>
    </React.Fragment>
  )
}

export default App
