import React, { useState, useEffect } from 'react'
import { useVisContext } from '../contexts/VisProvider';
import { Box, Checkbox, Input, Stack } from '@mui/material'
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ariaLabel = { 'aria-label': 'description' };

const VisDate = ({ isEdit, ddate1, ddate2, numDate = 1, ddirection = 'column' }) => {
  const { tlZoomMin } = useVisContext();
  dayjs.locale('es')

  const [date1, setDate1] = useState(dayjs(ddate1));
  const [date2, setDate2] = useState();
  const [minDate2, setMinDate2] = useState();
  const [minDateT, setMinDateT] = useState();
  const [maxDateT, setMaxDateT] = useState();

  const [chequiS, setChequiS] = useState(false);
  const [chequiE, setChequiE] = useState(false);
  const [yearS, setYearS] = useState(1999);
  const [yearE, setYearE] = useState(1999);

  console.log('---- VisDate - ddate1', ddate1)
  useEffect(() => {
    if (isEdit) {

      // console.log('VisDate -- ddate1 ', ddate1 , 'dayjs(ddate1)',dayjs(ddate1))

      setMinDateT(dayjs(ddate1).subtract(10, 'year'))
      setMaxDateT(dayjs(ddate1).add(10, 'year'))

      setMinDate2(dayjs(ddate1).add(1, 'day'))
      setDate1(dayjs(ddate1))

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

  const handleChangeChequi = (event) => {
    if (event.target.value < 1) { return }
    setYearS(Number(event.target.value));

    let d = yearS.toString().padStart(6, '0')
    d = `+${d}-01-01`


    console.log(' ---- .isValid ', dayjs(d).isValid())


    if (dayjs(d).isValid()) {
      setDate1(dayjs(d))
      // d = `${d}-01-01`
      // setStartDate2(dayjs(new Date(d)))
      console.log('  SSSssiiiiiii d', d)
      setMinDateT(dayjs(ddate1).subtract(10, 'year'))
      setMaxDateT(dayjs(ddate1).add(10, 'year'))
    } else {
      console.log('  NO VAAAALIDAAAA AA d', d)
    }
  };

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
      <div >
        <Input inputProps={ariaLabel} value={yearS}
          onChange={handleChangeChequi} type="number" style={{ width: '50%' }} />
        <Checkbox {...label} size="small" checked={chequiS} onChange={e => setChequiS(e.target.checked)} />BC
      </div>
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
                minDate={minDateT}
                maxDate={maxDateT}
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
