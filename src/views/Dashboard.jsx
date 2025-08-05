import React, { useRef } from 'react'
import VisTimelineDep from '../components/VisTimelineDep.jsx'
import '../vis.css'
// import data from '../data/data_prueba.js';
import data from '../data/data_culturamaya.js'

const Dashboard = () => {
  const timelineRef = useRef(null);
  const timelineDepRef = useRef(null);

  return (
    <>
      <div>
        <VisTimelineDep
          data={data}
          timelineRef={timelineRef}
          timelineDepRef={timelineDepRef}
        />
      </div>
      <ul>
        <li> <a href="https://visjs.org/" target="_blank"> visjs.org/ </a> </li>
        <li> <a href="https://visjs.github.io/vis-timeline/docs/timeline/" target="_blank"> docs</a> </li>
        <li><a href="https://visjs.github.io/vis-timeline/examples/timeline/" target="_blank" rel="noopener noreferrer">ejemplos</a></li>
      </ul >
    </>
  )
}

export default Dashboard
