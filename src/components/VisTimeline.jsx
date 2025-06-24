import { useEffect, useMemo, useRef, useState } from "react";

import { useVisContext } from "../contexts/VisProvider";
// import { cZoomMin } from "../config/config";
import { hGetItemData } from '../helpers/functions'
import moment from "moment";
import "moment/dist/locale/es";
import { Timeline } from "vis-timeline/esnext";
import { DataSet } from 'vis-data/esnext';
import "vis-timeline/styles/vis-timeline-graph2d.css"
import { Box, Paper } from "@mui/material";
//import PropTypes from 'prop-types';
// import "./customtimeline.css"

function VisTimeline({ data, timelineRef }) {
  const { setTlRef, setTlItemRef, setTlItem, setTlZoomMin, setTlValuesForm, setTlItemLength } = useVisContext();
  // const timelineRef = useRef(null);
  const timelineElementRef = useRef();

  const timelineItems = useMemo(() => {
    return new DataSet(data);
  }, [data]);
  moment.locale('es');

  // console.log(`API apiZoom: ${apiZoom}`);
  // ---- zzoomMin leer de archivo de configuracion ----------
  // deault: 10
  const zzoomMin = 864000000// {cZoomMin} // day -> 864000000
  // const zzoomMin = { cZoomMin } // day -> 864000000
  let strZoomMin = 'day'
  let intStep = 10
  if (zzoomMin == 26280000000) {
    strZoomMin = 'month'
  } else if (zzoomMin == 315400000000) {
    strZoomMin = 'year'
  }

  const timelineOptions = useMemo(() => {
    return {
      // showCurrentTime: true,
      editable: true,
      multiselect: true,
      height: "100%",
      // height: "450px",
      locale: 'es',

      // showMinorLabels: false,
      // timeAxis: {
      //   scale: strZoomMin,//'year',
      //   step: intStep  // 1
      // },
      // showWeekScale: true,
      // format: {
      //   minorLabels: {day: 'DD.MM'},
      //   majorLabels: {day: 'w'}
      // }
      // ---------------
      // You can customize the x-axis labels using a format function. E.g.,
      // showMinorLabels: false,
      // timeAxis: { scale: 'day', step: 1 },
      // format: {
      //   majorLabels: function (date, scale, step) {
      //     // return a custom label or "" depending on the date
      //   }
      // }
      // ---------------
      // verticalScroll: true,
      // start: new Date(2024,1,1),
      // end: new Date(new Date(2024,6,6).getTime() + 1000000),
      // rollingMode: {
      //   follow: true,
      //   offset: 0.5
      // },
      // zoomMax: 10000 years - 315360000000000
      // -------------------------
      // 8.64e+7 milisegundos (864000000) son 1 dia
      // 2.628e+9 milisegundos (26280000000) son 1 mes
      // 3.154e+10 milisegundos (315400000000) son 1 año
      // zoomMin : 315400000000, // años
      // zoomMin: 26280000000 // mes 
      zoomMin: zzoomMin,
      onAdd: function (item, callback) {
        console.log('---- VisTimeline - onAdd -------', item.id)
        let uuid = self.crypto.randomUUID();
        // console.log('uuid',uuid);
        item.id = uuid
        item.content = 'nuevo'
        callback(item);
        const ddata = hGetItemData(item, 1)
        setTlValuesForm(ddata)
        timelineRef.current.setSelection(item.id)
        setTlItemLength(timelineItems.length)
      },
      onUpdate: function (item, callback) {
        console.log('---- VisTimeline - onUpdate -------')
        const ddata = hGetItemData(item, 1)
        setTlValuesForm(ddata)
      },
      onRemove: function (item, callback) {
        callback(item);
        setTlItemLength(timelineItems.length)
      },
      /*
            // stack: true,
      maxHeight: 340,
      horizontalScroll: false,
      verticalScroll: true,
      // zoomKey: "ctrlKey",
      // start: Date.now() - 1000 * 60 * 60 * 24 * 3, // minus 3 days
      // end: Date.now() + 1000 * 60 * 60 * 24 * 21, // plus 1 months aprox.
      orientation: {
        axis: "both",
        // item: "top"
      },
      */
      // align:'center',
    };
  }, []);

  useEffect(() => {
    if (timelineElementRef.current && !timelineRef.current) {
      timelineRef.current = new Timeline(
        timelineElementRef.current,
        timelineItems,
        timelineOptions
      );
      setTlRef(timelineRef)
      setTlItemRef(timelineElementRef)
      setTlItem(timelineItems)
      setTlZoomMin(strZoomMin)
    }
    return () => {
      timelineElementRef.current = null;
    };
  }, [timelineItems, timelineOptions]);

  //============================================
  // return (<>{timelineElementRef}</>)
  return (
    <Paper
      elevation={8}
      sx={{
        flexGrow: 1, position: "relative",
        // py: 1, px:1 
      }}
      ref={timelineElementRef} ></Paper>
  )
}

export default VisTimeline;
