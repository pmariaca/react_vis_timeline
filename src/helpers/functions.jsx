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
