import VisForm from './VisForm';
import { useVisContext } from '../contexts/VisProvider';
import SendTimelineToImg from './SendTimelineToImg';
import SendDataToFileJs from './SendDataToFileJs'
import SendDataToFileCsv from './SendDataToFileCsv'
import { styled, useTheme } from '@mui/material/styles';
import { Box, Divider, Paper } from '@mui/material';
import { GiSpiralArrow } from "react-icons/gi";

const TopSpace = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
// ====================================================

const AppVerticalBar = ({ openV }) => {
  const { tlItem, tlItemRef, tlValuesForm } = useVisContext();
  const theme = useTheme();
  // const verticalWidth = 360 : 30  460
  const verticalWidth = openV ? 260 : 60

  return (
    <>
      <Box variant="permanent" sx={{ width: `${verticalWidth}px` }}>
        <TopSpace />
        <Paper elevation={8} >

          <Box sx={{ mx: 2 }} >
            <SendTimelineToImg componentRef={tlItemRef} />
            <SendDataToFileJs timelineItems={tlItem} />
            <SendDataToFileCsv timelineItems={tlItem} />
          </Box>

          <Divider variant="middle" textAlign="right" > <GiSpiralArrow /> </Divider>
          {
            openV ?
              <VisForm isEdit={true} valuesForm={tlValuesForm} />
              : ''
          }
        </Paper>
      </Box>
    </>
  )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  container: {
    bgcolor: 'theme.palette.main',
  },
}

export default AppVerticalBar
