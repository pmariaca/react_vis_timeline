import React, { useState, useEffect } from 'react'
import { useVisContext } from '../contexts/VisProvider';
import { Box, Stack } from '@mui/material'
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const VisDate = ({ isEdit, ddate1, ddate2, numDate = 1, ddirection = 'column' }) => {
  const { tlZoomMin } = useVisContext();
  dayjs.locale('es')

  const bcTimeString = '-000001-01-01T00:00:00.000';
  const bcTimeStringT = '-000100-01-01T00:00:00.000';
  const bcTimeStringTT = '-271820-01-01T00:00:00.000';
  // const bcTimeString = '-000010-01-01';  271822

  const [date1, setDate1] = useState(dayjs(ddate1));
  const [date2, setDate2] = useState();
  const [minDate2, setMinDate2] = useState();
  const [minDateT, setMinDateT] = useState(dayjs(bcTimeString));
  const [minDateTT, setMinDateTT] = useState(dayjs(bcTimeStringT));


  // console.log('---- VisDate - ddate1', ddate1)
  useEffect(() => {
    if (isEdit) {

      // console.log('VisDate -- ddate1 ', ddate1 , 'dayjs(ddate1)',dayjs(ddate1))

      setMinDateT(dayjs(bcTimeString))
      setMinDateTT(dayjs(bcTimeStringT))
      setMinDate2(dayjs(ddate1).add(1, 'day'))
      // setDate1(dayjs('0012-02-25'))
      setDate1(dayjs(ddate1))

      // 
      if (ddate2 == undefined) {
        setDate2(dayjs(ddate1).add(1, 'day'))
      } else {
        setDate2(dayjs(ddate2))
      }



      // console.log('VisDate -- ddate1', ddate1)
      // console.log('dayjs(date1).add(1, day) ', dayjs(ddate1).add(1, 'day'))
      // console.log('  miniDate',miniDate)

    }
  }, [ddate1, ddate2])
  // ================================

  let hText = 'MM/DD/YYYY'
  let zOopenTo = "day"
  let zViews = ['year', 'month', 'day']
  if (tlZoomMin == 'month') {
    zOopenTo = "month"
    zViews = ['year', 'month']
    hText = ''
  } else if (tlZoomMin == 'year') {
    zOopenTo = "year"
    zViews = ['year']
    hText = ''
  }
  zOopenTo = "year"
  zViews = ['year', 'day']

  return (
    <>

      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={numDate == 2 ? ['DatePicker', 'DatePicker'] : ['DatePicker']}>
          <Stack direction={ddirection} // column row row-reverse
          >
            <Box sx={{ width: '170px', padding: '1px' }}  >
              <DatePicker
                label="Inicio"
                value={date1}
                onChange={(newValue) => setDate1(newValue)}
                name='date1'
                minDate={dayjs(minDateT)}
                shouldRespectLeadingZeros
                openTo="year"
                // openTo={zOopenTo}
                // views={['year', 'month']}
                // views={zViews}
                slotProps={{ textField: { helperText: hText, size: 'small' } }}
                sx={{ width: "100%" }}
              />
            </Box>
            {
              numDate == 2 ?
                <Box sx={{ width: '170px', padding: '1px' }}  >
                  <DatePicker
                    label="Final"
                    value={date2}
                    onChange={(newValue) => setDate2(newValue)}
                    name='date2'
                    minDate={minDate2}
                    openTo="year"
                    shouldRespectLeadingZeros
                    // openTo={zOopenTo}
                    // views={zViews}
                    slotProps={{ textField: { helperText: hText, size: 'small' }, }}
                    sx={{ width: "100%" }}
                  /></Box>
                : ''
            }
          </Stack>
        </DemoContainer>
      </LocalizationProvider>

    </>
  )
}

export default VisDate
