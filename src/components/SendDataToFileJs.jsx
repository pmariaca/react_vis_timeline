import IconButton from '@mui/material/IconButton';
import { BsFiletypeJs } from "react-icons/bs";
import moment from "moment";

function SendDataToFileJs({ timelineItems }) {
  let yam = new Date()
  let yyam = `${yam.toLocaleDateString()}_${yam.getTime()}`
  yyam = yyam.replaceAll("/", "-")

  const handleDownload = () => {
    const filename = `timelineJs_${yyam}.js`;
    const content = generateFileContent();
    const blob = createFileBlob(content);
    const link = createDownloadLink(blob, filename);
    triggerDownload(link);
  };

  const triggerDownload = (link) => {
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const createDownloadLink = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    return link;
  };

  const createFileBlob = (content) => {
    return new Blob([content], { type: 'text/javascript' });
  };

  const generateFileContent = () => {
    // mejor con string, ya que new Date(YYYY,MM,DD) recordar que suma un mes
    // a menos que se use new Date('YYYY-MM-DD') este ok, pero usaremos solo 'YYYY-MM-DD'
    // const jsonStr = generaConNewDate()
    const jsonStr = generaConDateString()

    // const jsonStr = generaDateSumaDiasParaD3js()

    // console.log('jsonStr -- \n', jsonStr)

    return `export default [\n ${jsonStr} \n];`;
  };



  function convDate(item, sep) {
    // sep (,) para new Date, o (-) para string

    let arrDate = []
    // console.log('item', item)

    if ((typeof item) != 'string') {
      arrDate = item.toJSON().split('T')
      arrDate = arrDate[0].split('-')
    } else {
      arrDate = item.split('-')
    }

    if (arrDate.length > 3) {
      arrDate.shift();
      arrDate[0] = arrDate[0].padStart(6, '0')
      arrDate[0] = '-' + arrDate[0]
    } else {
      arrDate[0] = arrDate[0].padStart(4, '0')
    }
    if (sep == ',') {
      arrDate[0] = parseInt(arrDate[0])
      arrDate[1] = parseInt(arrDate[1])
      arrDate[2] = parseInt(arrDate[2])
    }
    // console.log('arrDate.join(sep)', arrDate.join(sep))
    return arrDate.join(sep)
  }

  function generaDateSumaDiasParaD3js() {
    // sin imagen y sin DIV
    // y si no tiene end => end = start + 100
    // solo dejar el año, nada de dia y mes, por ahora
    // DESPUES mejor total de dias, en lugar de años

    // 1- prehistoria hasta aparicion de la escritura, 
    // 2 - Edad Antigua, 3,500 a.c hasta el impero romano, siglo V ->  ANCIENT WORLD
    // 3 - Edad Media (mediaval) siglo V (401 al 500) a s XV (1401 al 1500 ) -> MEDIAVAL WORLD
    // 4 - Edad Moderna s.XV a XXI -> MODERN WORLD
    // 5 - Edad Contemporanea sXXI
    let dat = timelineItems.get()
    let jsonStr = '';
    const sumaEnd = 50

    dat.map((item, index) => {
      //  id: '76abe9ee-10b8-4562-9d65-62c2627a0c6d', 
      // if (item.id != '03f95b3f-c2ea-4f11-b8a5-0a11ae00f99f') { return }
      // if (index > 1) { return } // '2024-01-20'
      // console.log('item.id', item.id)
      // --------------------------------------
      let content = item.content
      content = content.replace("<div>", "")
      content = content.replace("</div>", "")
      content = content.replace("<br>", "")
      //  content: 'Apogeo de Tulúm<img src="/img/maya/tulum.jpg" >', 
      let arr = content.split("<img")
      if (arr.length > 1) {
        content = arr[0]
      }
      // --------------------------------------
      const start = fechaSumaDias(item.start)

      const quieroId = false
      if (quieroId) {
        jsonStr += `{\n id: '${item.id}', \n content: '${content}', \n start: ${start}, \n`;
      } else {
        jsonStr += `{\n content: '${content}', \n start: ${start}, \n`;
      }

      if (item.end != undefined) {
        const end = fechaSumaDias(item.end)
        jsonStr += ` end: ${end}, \n`;
      } else {
        const end = start + sumaEnd
        jsonStr += ` end: ${end}, \n`;
      }

      if (item.className != undefined) {
        jsonStr += ` className: "${item.className}", \n`;
      }
      if (item.type != undefined) {
        jsonStr += ` type: "${item.type}", \n`;
      }
      if (item.style != undefined) {
        jsonStr += ` style: "${item.style}", \n`;
      }
      // ----------------------
      jsonStr += ` region: "Mesoamerica", \n`;
      jsonStr += ` civilization: "Maya", \n`;
      jsonStr += ` color: "bn", \n`;

      const fecha = new Date(item.start)
      let edad = ''
      if (fecha < new Date('-003500-01-01')) {
        edad = "Prehistoria"
      } else if (fecha >= new Date('-003500-01-01') && fecha < new Date('+000401-01-01')) {
        edad = "ANCIENT WORLD" // "Edad Antigua"
      } else if (fecha >= new Date('+000401-01-01') && fecha < new Date('+001500-01-01')) {
        edad = "MEDIAVAL WORLD" // "Edad Media"
      } else if (fecha >= new Date('+001500-01-01') && fecha < new Date('2001-01-01')) {
        edad = "MODERN WORLD" // "Edad Moderna"
      } else if (fecha >= new Date('2001-01-01')) {
        edad = "MODERN WORLD" //  "Edad Contemporánea"
      }
      jsonStr += ` timeline: "${edad}", \n`;
      // ----------------------
      jsonStr += `},\n`;
    })
    return jsonStr
  }

  function fechaSumaDias(itemstart) {

    let signo = 1
    const arrD = itemstart.split('-')
    if (arrD.length > 3) {
      signo = -1
    }
    // console.log('arrD ', arrD, arrD.length)
    const diaS = moment(itemstart)
    const diaCero = moment('000000-01-01')
    const sumaDias = diaCero.diff(diaS, 'days');

    // console.log('suma dias ', sumaDias)
    let start = sumaDias
    if (signo == -1) {
      start = '-' + start
      start = parseInt(start)
    }
    return start
  }

  function generaConDateString() {
    let dat = timelineItems.get()
    let jsonStr = '';

    dat.map((item, index) => {
      // id: 'ab921539-cd10-44a0-b762-775b6ae9650f'
      // if (item.id !=   'ab921539-cd10-44a0-b762-775b6ae9650f') { return }
      // if (index > 1) { return } // '2024-01-20'
      console.log('item.start', item.content)

      jsonStr += `{\n id: '${item.id}', \n content: '${item.content}', \n start: "${convDate(item.start, '-')}", \n`;

      if (item.end != undefined) {
        jsonStr += ` end: "${convDate(item.end, '-')}", \n`;
      }
      if (item.className != undefined) {
        jsonStr += ` className: "${item.className}", \n`;
      }
      if (item.type != undefined) {
        jsonStr += ` type: "${item.type}", \n`;
      }
      if (item.style != undefined) {
        jsonStr += ` style: "${item.style}", \n`;
      }
      jsonStr += `},\n`;
    })
    return jsonStr
  }

  function generaConNewDate() {
    let dat = timelineItems.get()
    let jsonStr = '';
    dat.map((item, index) => {
      if (index > 2) { return } // '2024-01-20'
      console.log('item', item)

      if (typeof (item.start) == 'string') {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa', item.start)
        item.start = new Date(item.start)
        item.end = item.end ? new Date(item.end) : undefined
      }

      jsonStr += `{\n id: '${item.id}', \n content: '${item.content}', \n start: new Date(${convDate(item.start, ',')} ), \n`;
      if (item.end != undefined) {
        jsonStr += ` end: new Date(${convDate(item.end, ',')}), \n`;
      }
      if (item.className != undefined) {
        jsonStr += ` className: '${item.className}', \n`;
      }
      if (item.type != undefined) {
        jsonStr += ` type: '${item.type}', \n`;
      }
      if (item.style != undefined) {
        jsonStr += ` style: '${item.style}', \n`;
      }
      jsonStr += `},\n`;
    })
    return jsonStr
  }

  return (
    // <Button onClick={handleDownload} endIcon={<BsFiletypeJs />} />
    <IconButton color="primary" size="large" onClick={handleDownload} ><BsFiletypeJs /> </IconButton>
  );
}

export default SendDataToFileJs;

