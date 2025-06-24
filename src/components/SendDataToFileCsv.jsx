import { hGetItems } from '../helpers/functions'

import { useState } from 'react';
import { CSVLink } from "react-csv";

import IconButton from '@mui/material/IconButton';
import { BsFiletypeCsv } from "react-icons/bs";

function SendDataToFileCsv({ timelineItems }) {
  const [dataCsv, setDataCsv] = useState([{}]);
  let yam = new Date()
  let yyam = `${yam.toLocaleDateString()}_${yam.getTime()}`
  yyam = yyam.replaceAll("/", "-")

  const data = 'm'
  const handleExportData = (event, done) => {
    let yam = new Date()
    let yyam = `${yam.toLocaleDateString()}_${yam.getTime()}`
    yyam = yyam.replaceAll("/", "-")
    var datann = timelineItems.get({ type: { start: 'ISODate', end: 'ISODate' } });

    const data = hGetItems(datann)
    var csvData = data.map(function (dat) {
      let obj =
      {
        content: dat.content,
        startDate: dat.startDate,
        endDate: dat.endDate == '' ? '' : dat.endDate,
        type: dat.type == undefined ? '' : dat.type,
      }
      return obj;
    });
    // console.log('csvData-- ', csvData)
    setDataCsv(csvData)
    done(true);
  };
  const headersCsv = [
    { label: "content", key: "content" },
    { label: "startDate", key: "startDate" },
    { label: "endDate", key: "endDate" },
    { label: "type", key: "type" }
  ];

  return (
    <IconButton color="primary" size="large" >
      <CSVLink
        data={dataCsv}
        headers={headersCsv}
        filename={`timelineCsv_${yyam}.csv`}
        // separator={","}
        // enclosingCharacter={`'`}
        asyncOnClick={true}
        onClick={handleExportData}
      ><BsFiletypeCsv />
      </CSVLink>
    </IconButton >

  );
}

export default SendDataToFileCsv;
