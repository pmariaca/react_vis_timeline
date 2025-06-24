import VisEventItemsTbl from './VisEventItemsTbl.jsx';

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import { GiSlicingArrow } from "react-icons/gi";

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

const AppDrawerSwip = ({ open, toggleDrawer, drawerBleeding }) => {

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      keepMounted
    >
      <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
          backgroundColor: 'rgba(25,118,210,0.09)',
        }}
      >
        <Puller >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
          >
            <GiSlicingArrow />
          </IconButton>
        </Puller>
        <Typography sx={{ p: 2, color: 'text.secondary' }}>
          Lista de Eventos</Typography>
      </StyledBox>

      <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
        <Box
          // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
        >

          <VisEventItemsTbl />
        </Box>
      </StyledBox>
    </SwipeableDrawer>
  )
}

export default AppDrawerSwip