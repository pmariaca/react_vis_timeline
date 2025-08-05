import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getYear } from "date-fns";

const range = (start, end) => {
  return new Array(end - start + 1).fill().map((_, i) => i + start);
};

function svgIcon() {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
  >
    <mask id="ipSApplication0">
      <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
        <path
          fill="#fff"
          d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
        ></path>
      </g>
    </mask>
    <path
      fill="currentColor"
      d="M0 0h48v48H0z"
      mask="url(#ipSApplication0)"
    ></path>
  </svg >
}

// , chequi, setChequi
const ReactDatePicker = ({ startDate, setStartDate }) => {
  // const [chequi, setChequi] = useState(false);

  // DIAS MESES y AÑOS
  // const [startDate, setStartDate] = useState(new Date());
  // console.log(' ReactDatePicker --- startDate.getFullYear()', startDate.getFullYear())

  const currentYear = new Date().getFullYear();
  let years = range(startDate.getFullYear() - 20, startDate.getFullYear() + 20);

  // console.log(' ReactDatePicker --- years', years)
  //   years = range(1990, currentYear + 1);
  // const years = range(startDate.getFullYear(), getYear(new Date()) + 1, 1);
  // console.log(' ReactDatePicker --- years', years)
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "April",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <>
      <DatePicker
        showIcon
        icon={svgIcon()}
        // icon={
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="1em"
        //     height="1em"
        //     viewBox="0 0 48 48"
        //   >
        //     <mask id="ipSApplication0">
        //       <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
        //         <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
        //         <path
        //           fill="#fff"
        //           d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
        //         ></path>
        //       </g>
        //     </mask>
        //     <path
        //       fill="currentColor"
        //       d="M0 0h48v48H0z"
        //       mask="url(#ipSApplication0)"
        //     ></path>
        //   </svg>
        // }
        className='pickerito'
        // renderCustomHeader={<DatePickerHeader />}
        // renderCustomHeader={(p) => <DatePickerHeader {...p} />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              className="custom-select-style"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)
        }

      />
    </>
  );
};
export default ReactDatePicker
