import { useEffect, useMemo, useRef, useState } from "react";
import { useVisContext } from "../contexts/VisProvider";
import { hGetItemData } from '../helpers/functions'
import { VisTimeLineButtonDown, VisTimeLineButtonUp } from "./VisTimeLineButton";
import moment from "moment";
import "moment/dist/locale/es";
import { Timeline } from "vis-timeline/esnext";
import { DataSet } from 'vis-data/esnext';
import "vis-timeline/styles/vis-timeline-graph2d.css"

function VisTimelineDep({ data, timelineRef, timelineDepRef }) {
  const { setTlRef, setTlDepRef, setTlItemRef, setTlItem, setTlZoomMin, setTlValuesForm, setTlItemLength } = useVisContext();
  const timelineElementRef = useRef();
  const timelineElementDefRef = useRef();

  // JavaScript's Date object has a limited range. The minimum representable 
  // date is approximately 271,822 BCE. This is because JavaScript stores 
  // dates as milliseconds since the Unix epoch (January 1, 1970, UTC), and 
  // the maximum range is ±8,640,000,000,000,000 milliseconds. Any attempt to 
  // create a date object outside this range will result in an "Invalid Date."
  // AQUI pondremos tope en: new Date(-271820, 1, 1) 0 
  const miDat = [{
    id: '186bd7d0-7ae8-461a-b211-28ecf61a7dbb',
    content: '<div>Amalia Hajdudcek Bozek</div><img src="/img/fam/z_Amalia.png"/>',
    // start: moment(new Date(-271820, 1, 1)).format(),
    // start: new Date('-271820-04-13'),
    // start: '-271820-04-13',
    // start: new Date('-011820-04-13'),
    start: '10042-04-13',
    type: 'box',
  },]

  const timelineItems = useMemo(() => {
    // return new DataSet(miDat);
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
      height: '50vh',  // "50vh",
      // type: 'box',
      locale: 'es',
      loadingScreenTemplate: function () {
        return '<h1>Loading...</h1>'
      },
      onInitialDrawComplete: function () {
        initialDraw()
      },
      // autoResize: false,
      // showMajorLabels: false,
      // clickToUse:true,
      // margin: {
      //     item: 5
      //   },

      // maxHeight:"70vh",
      // showMinorLabels: false,
      // timeAxis: {
      //   scale: strZoomMin,//'year',
      //   step: intStep  // 1
      // },
      // showWeekScale: false,
      // format: {
      //   minorLabels: {day: 'DD.MM'},
      //   // majorLabels: {day: 'w'}
      // },
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
      // zoomMin: 1000 * 60 * 60 * 24,             // one day in milliseconds
      // zoomMax: 1000 * 60 * 60 * 24 * 31 * 3,     // about three months in milliseconds
      // 8.64e+7 milisegundos (864000000) son 1 dia
      // 2.628e+9 milisegundos (26280000000) son 1 mes
      // 3.154e+10 milisegundos (315400000000) son 1 año
      // zoomMin : 315400000000, // años
      // zoomMin: 26280000000 // mes 
      zoomMin: 864000000,
      onAdd: function (item, callback) {
        console.log('---- VisTimeline - onAdd -------', item.id)
        // let uuid = self.crypto.randomUUID();
        // // console.log('uuid',uuid);
        // item.id = uuid
        item.content = 'nuevo'
        callback(item);

        const ddata = hGetItemData(item)
        setTlValuesForm(ddata)
        timelineRef.current.setSelection(item.id)
        setTlItemLength(timelineItems.length)
        // -------------
        const range = timelineDepRef.current.getWindow()
        if ((item.start < range.start) || (item.start > range.end)) {
          const range = timelineRef.current.getItemRange()
          timelineDepRef.current.setWindow(range.min, range.max, { animation: false })
        }
      },
      onUpdate: function (item, callback) {
        // console.log('---- VisTimeline - onUpdate -------')
        const ddata = hGetItemData(item, 1)
        setTlValuesForm(ddata)
      },
      onRemove: function (item, callback) {
        callback(item);
        setTlItemLength(timelineItems.length)
        // -------------
        // algo pasa con getItemRange,o hago 
        initialDrawDep()
        // const range = timelineRef.current.getItemRange()
        // timelineDepRef.current.setWindow(range.min, range.max, { animation: true })
      },
    };
  }, []);

  const timelineOptionsDep = useMemo(() => {
    return {
      showCurrentTime: false,
      // height: "15vh",
      height: "150px",
      locale: 'es',
      // orientation:{ axis:'top',item:'bottom'},
      editable: false,
      stack: false,
      selectable: false,
      zoomable: false,
      // moveable: false,
      onInitialDrawComplete: function () {
        initialDrawDep()
        // const range = timelineDepRef.current.getItemRange()
        // timelineDepRef.current.setWindow(range.min, range.max)
      },
      // showMajorLabels: false,
      //

      // zoomMin: 26280000000
    };
  }, []);

  useEffect(() => {
    if (timelineElementRef.current && !timelineRef.current) {
      timelineRef.current = new Timeline(timelineElementRef.current, timelineItems, timelineOptions);
      setTlRef(timelineRef)
      setTlItemRef(timelineElementRef)
      setTlItem(timelineItems)
      setTlZoomMin(strZoomMin)

      timelineDepRef.current = new Timeline(timelineElementDefRef.current, timelineItems, timelineOptionsDep);
      setTlDepRef(timelineDepRef)
    }
  }, [timelineItems, timelineOptions]);
  //===========================================

  const initialDraw = () => {
    const todos = timelineItems.get({ type: { start: 'ISODate', end: 'ISODate' } });
    // console.log('----------------- todos ', todos)
    todos.sort((a, b) => {
      let dateA = moment(a.start)
      let dateB = moment(b.start)
      if (dateA < dateB) { return -1; }
      if (dateA > dateB) { return 1; }
      return 0;
    });
    const primero = todos[0]
    const ultimo = todos[(todos.length - 1)]
    timelineRef.current.setSelection(ultimo.id, { animation: false })
    timelineRef.current.focus(timelineRef.current.getSelection(), { animation: false })
    timelineRef.current.setSelection([], { animation: false })

    // timelineRef.current.on('changed', function (props) {
    //   console.log('changed-------------------------')
    // })
    // timelineRef.current.on('currentTimeTick', function (props) {
    //   console.log('currentTimeTick-------------------------', props)
    // })
  }

  const initialDrawDep = () => {
    const range = timelineDepRef.current.getItemRange()
    timelineDepRef.current.setWindow(range.min, range.max, { animation: false })

    timelineDepRef.current.on('click', function (props) {
      props.event.preventDefault();
      // const target = props.event.target
      if (props.item == null) {
        timelineRef.current.setWindow(props.snappedTime._d, props.snappedTime._i, { animation: true })
      } else {
        timelineRef.current.setSelection(props.item, { animation: false })
        timelineRef.current.focus(timelineRef.current.getSelection(), { animation: true })
        timelineRef.current.setSelection([], { animation: false })
      }
      // timelineRef.current.redraw()
      // console.log('props.item', props?.item);
    })
    // // ----------------------------
    //     timelineDepRef.current.on('rangechange', function (props) {
    //       // props.event.preventDefault();
    //       console.log('----------------------props', props);
    // 
    //     })
    // ----------------------------
    // timelineDepRef.current.on('mouseOver', function (props) {
    //   // props.event.preventDefault();
    //   console.log('----------------------props', props);
    // })
  }

  const optionData = () => {
    initialDraw()
    initialDrawDep()
    // timelineRef.current.redraw()
  }

  return (
    <>
      <div >
        <VisTimeLineButtonUp />
        <div
          name='miVis'
          id='miVis'
          // sx={{ flexGrow: 1, position: "relative" }}
          ref={timelineElementRef} >
        </div>
        <div
          name='miVisDep'
          id='miVisDep'
          // sx={{ flexGrow: 1, position: "relative", }}
          ref={timelineElementDefRef} >
        </div>
        <VisTimeLineButtonDown optionData={optionData} />
      </div>
    </>
  )
}

export default VisTimelineDep;
