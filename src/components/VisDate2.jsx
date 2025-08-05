import React, { useState, useEffect, useRef } from 'react'
import { Box, Checkbox, Input, Stack, TextField } from '@mui/material'
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import ReactDatePicker from './ReactDatePicker'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ariaLabel = { 'aria-label': 'description' };

const VisDate2 = ({ isEdit, ddate1, ddate2, numDate = 1, ddirection = 'column' }) => {
  const [date1, setDate1] = useState(dayjs(ddate1));
  const [date2, setDate2] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [minDate, setMinDate] = useState(dayjs(new Date()));
  const [maxDate, setMaxDate] = useState(dayjs(new Date()));
  const [chequiS, setChequiS] = useState(false);
  const [chequiE, setChequiE] = useState(false);
  const [yearS, setYearS] = useState(1999); // 202222
  const [yearE, setYearE] = useState(1999);

  useEffect(() => {
    if (isEdit) {

      // console.log('VisDate -- ddate1 ', ddate1 , 'dayjs(ddate1)',dayjs(ddate1))

      // setMinDateT(dayjs(bcTimeString))
      // setMinDateTT(dayjs(bcTimeStringT))
      // setMinDate2(dayjs(ddate1).add(1, 'day'))
      // // setDate1(dayjs('0012-02-25'))
      // setDate1(dayjs(ddate1))

      // 
      if (ddate2 == undefined) {
        setDate2(dayjs(ddate1).add(1, 'day'))
      } else {
        setDate2(dayjs(ddate2))
      }


      setMinDate(dayjs(startDate).subtract(10, 'year'))
      setMaxDate(dayjs(startDate).add(10, 'year'))
      // console.log('VisDate -- ddate1', ddate1)
      // console.log('dayjs(date1).add(1, day) ', dayjs(ddate1).add(1, 'day'))
      // console.log('  miniDate',miniDate)

    }
  }, [ddate1, ddate2, startDate])

  const handleChangeChequi = (event) => {
    if (event.target.value < 1) { return }
    setYearS(Number(event.target.value));
    // agregarle ceros si es 1 o dos digitos arrDate[0].padStart(6, '0')
    // console.log(' -----------------year ',year)
    let d = yearS.toString().padStart(6, '0')
    d = `+${d}-01-01`
    if (dayjs(d).isValid()) {
      setStartDate(new Date(d))
      // d = `${d}-01-01`
      // setStartDate2(dayjs(new Date(d)))
      console.log('  SSSssiiiiiii d', d)
      // setMinDate(dayjs(startDate).subtract(10, 'year')   )
      // setMaxDate(dayjs(startDate).add(10, 'year')    )
    } else {
      console.log('  NO VAAAALIDAAAA AA d', d)
    }
  };

  return (
    <div className='pickerito-grp'>
      <div >
        <Input  inputProps={ariaLabel} value={yearS}
          onChange={handleChangeChequi} type="number" style={{ width: '50%' }} />
        <Checkbox {...label} size="small" checked={chequiS} onChange={e => setChequiS(e.target.checked)} />BC
      </div>
      <ReactDatePicker
        setStartDate={setStartDate}
        startDate={startDate}
      />
    </div>
  )
}

export default VisDate2
