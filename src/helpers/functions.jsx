import dayjs from 'dayjs';
import 'dayjs/locale/es'
// ----------------------

import { styled } from '@mui/material/styles';

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

//====================================
// JavaScript's Date object has a limited range. The minimum representable
// date is approximately 271,822 BCE. This is because JavaScript stores
// dates as milliseconds since the Unix epoch (January 1, 1970, UTC), and
// the maximum range is ±8,640,000,000,000,000 milliseconds. Any attempt to
// create a date object outside this range will result in an "Invalid Date."

// Para el calendario gregoriano, la duración media del año civil
// (el año medio) a lo largo del ciclo bisiesto completo de 400 años es de 365.2425 días.

// AÑO TROPICAL: que la cifra correcta es de 365,2422,
// o lo que es lo mismo, 365 días, 5 horas, 48 minutos y 45,10 segundos.

// 271 882 años son 99,215,030 dias

export const yearDays = (days, f = 0) => {
  // console.log(' days', days);
  // export function yearDays(days) {
  if (days == 0) {
    days = 0.001
  }
  // const days = -32566.2432490003
  let text = ''
  const solarYear = 365.2422
  let yearR = days / solarYear
  const diasR = (Math.abs(yearR) - Math.floor(Math.abs(yearR))).toFixed(2)

  if (f == 1) {
    // console.log('================ yearR' ,yearR)
    return yearR.toFixed(2)
  }

  yearR = Math.floor(yearR)
  let xyyearR = yearR
  if (Math.abs(yearR) <= 270822) {
    if (yearR == 0) { yearR = 1 }
    let sign = Math.sign(yearR)
    yearR = (Math.abs(yearR)).toString().padStart(6, '0');
    let signo = '+'
    sign === -1 ? signo = '-' : signo = '+'
    yearR = signo.toString().concat(yearR)
    yearR = dayjs(`${yearR}`).toDate()
    sign === -1 ? yearR = dayjs(yearR).subtract(diasR, 'days') : yearR = dayjs(yearR).add(diasR, 'days')
    // console.log('--------------yearR: ', yearR);
    yearR = dayjs(yearR).format('MM/DD/YYYY')
    // console.log('yearR: ', yearR ,'diasR',diasR);
    text = `${yearR}`
  } else {
    text = `${yearR} años y ${diasR} días  -----   ${xyyearR} años`
    text = `${yearR.toLocaleString()} años `
  }


  return text
}


// -------------------------------------------------
function randomDate(start, end, min, max) {
  const d = (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())))//.toLocaleString()
  return {
    date: d,
    // date: dayjs(d).format('YYYY-MM-DD'),
    close: parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
}
export function dateRandom(toTi = 3, startDate = new Date(2007, 1, 1), endDate = new Date(2012, 1, 1)) {
  // { date: '2007-04-23', close: 93.24 },
  const data = []
  // const startDate = new Date(2007, 0, 1);
  // const endDate = new Date(2012, 0, 1);
  const randomDateResult = randomDate(startDate, endDate, 1, 600);
  // console.log('randomDateResult', randomDateResult);
  for (let i = 0; i < toTi; i++) {
    data[i] = randomDate(startDate, endDate, 1, 600)
  }
  // console.log('data', data);
  return data
}
//===================================
// -----------------------------------
export const hvaluesForm = {
  id: '',
  content: '',
  start: '',
  end: '',
  className: 'opt-content-move-0',
  style: '',
  type: '',
  imageUrl: '',
  link: [],
}

export const hGetDate = (tlZoomMin, date) => {
  // console.log('------------ ggg tlZoomMin ---------', tlZoomMin)
  let ddate1 = null
  if (tlZoomMin == 'day') {
    ddate1 = new Date(date)
  } else if (tlZoomMin == 'month') {
    // const mm = dayjs('mayo 2025 00', 'MMMM YYYY DD', 'es')
    // date1 05/08/2025  new Date(-1100,5,1)
    const mm = dayjs(`${date} 00`, 'MMMM YYYY DD', 'es')
    ddate1 = new Date(mm)
  } else if (tlZoomMin == 'year') {
    // const mm = dayjs(`${date1} 00 00`, 'YYYY MMMM DD', 'es')
    const mm = dayjs(`${date}`, 'YYYY', 'es')
    ddate1 = new Date(mm)
  }

  return (ddate1)
}

// export const hCleanContent = (item) => {
//   const nodes = htmlStringToDOM(item);
//   let content = nodes[0].textContent
//   if (nodes[0].innerHTML != undefined) {
//     // content = content.replaceAll('<br>', RegExp(String.fromCharCode(10), 'g'))
//     content = content.replaceAll('<br>', "\n\r")
//   }
//   return content
// }

function htmlStringToDOM(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return (doc.body.childNodes);
}

export const hGetItemData = (item, f = 0) => {

  // console.log(' -------functoin sevent ------  hGetItemData:item2 ', item);
  // if (item != undefined) {
  const nodes = htmlStringToDOM(item.content);
  // let values = item
  let content = nodes[0].textContent

  // console.log(' ------- nodes', nodes);

  if (f == 1 && nodes[0].innerHTML != undefined) {
    content = nodes[0].innerHTML.replaceAll('<br>', "\n")
  }

  let srcImg = '#'
  let link = []
  for (let i = 0; i < nodes.length; i++) {
    let itemm = nodes[i];
    if (itemm.tagName == 'IMG') {
      srcImg = itemm.attributes.src.textContent
    }

    if (itemm.tagName == 'A') {
      link[0] = itemm.attributes.href.textContent
      link[1] = itemm.innerHTML
    }
    // if (tagName == 'DIV' && tempContent == '') {
    //   tempContent = itemm.textContent
    // }
  }

  // if (content == '' && tempContent != '') { content = tempContent }

  // str = str.replace(RegExp(String.fromCharCode(10), 'g'), 'newChar');
  // algo pasa aqui ????
  // values.content = content
  // values['imageUrl'] = srcImg

  // console.log('-------------content', content)
  const valuess = {
    'id': item.id,
    'content': content,
    'start': item.start,
    'end': item.end,
    'className': item.className,
    'style': item.style,
    'type': item.type,
    'imageUrl': srcImg,
    'link': link
  }
  // console.log('--------functions -> attributes values-> ', valuess)
  return (valuess)
}

export const hGetItems = (datann) => {
  var formatItem = []
  datann.map((item, index) => { formatItem[index] = hGetItemData(item) })
  const rows = []
  formatItem.map((item, index) => {
    if (typeof (item.start) == 'string') {
      item.start = new Date(item.start)
      item.end = item.end ? new Date(item.end) : undefined
    }
    rows[index] = {
      content: item.content,
      start: item.start,
      end: item.end,
      // startDate: `${item.start.getMonth()}/${item.start.getDay()}/${item.start.getFullYear()}`,
      // endDate: item.end ? `${item.end.getMonth()}/${item.end.getDay()}/${item.end.getFullYear()}` : '',
      startDate: item.start.toLocaleDateString(),
      endDate: item.end ? `${item.end.toLocaleDateString()} ` : '',
      type: item.type,
      id: item.id
    }
  })
  return (rows)
}

// ---------------------------------------------------------

export const hAccordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));
export const hAccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor: 'rgba(0, 0, 0, .03)',
  backgroundColor: 'rgba(25,118,210, 0.04)', // #1976d2
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));
export const hAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
