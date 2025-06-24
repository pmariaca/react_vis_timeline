import React from 'react'
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useVisContext } from "../contexts/VisProvider";
import moment from "moment";
import dayjs from 'dayjs';
import 'dayjs/locale/es'

import "moment/dist/locale/es";
import PropTypes from 'prop-types';
import { Box, Button, ButtonGroup, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBackSharp } from "react-icons/io5";
import { TbArrowAutofitContent } from "react-icons/tb";
import { GoZoomIn } from "react-icons/go";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          // p: 1,
          m: 1,
          // bgcolor: 'grey.100',
          // color: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 50,
          boxShadow: 8,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

function Item2(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        (theme) => ({
          // p: 1,
          m: 0,
          // bgcolor: 'grey.100',
          // color: 'grey.800',
          border: '0px solid',
          borderColor: 'grey.300',
          borderRadius: 5,
          boxShadow: 8,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...theme.applyStyles('dark', {
            bgcolor: '#101010',
            color: 'grey.300',
            borderColor: 'grey.800',
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
Item2.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
// https://visjs.github.io/vis-data/data/index.html

export const VisTimeLineButtonDown = ({ optionData }) => {
  const { tlRef, tlDepRef, tlItemRef, tlItem, tlZoomMin, tlValuesForm, tlItemLength } = useVisContext();

  const arrowRef = useRef(null);

  const getWindow1 = () => {
    const win1 = tlRef.current.getWindow()
    console.log('win 1 ', win1)

    const winDep = tlDepRef.current.getWindow()
    console.log('winDep ', winDep)
    // const visible = tlRef.current.getVisibleItems()
    // console.log(' fitData - range', visible)

    // var a = moment('0000-01-01', 'YYYY-MM-DD').set('y', -700)
    // a.format();
    // console.log('aaaaaaaaaaaaaaaa  .format()',a,a.format())
    // -0700-01-01T00:00:00-06:37

    // ====================================================

    // -0700-01-01T00:00:00-06:37
    // let newDate = moment(new Date(1996, 5, 14)).subtract(1, 'months')._d
    // console.log('------------- moment  newDate', newDate)

    // // sii:   266666  269999  max: 271,822 BCE. NO 274000
    // newDate = new Date(-271822, 5, 14)
    // console.log('------------- moment  newDate', newDate)



    // newDate = moment(new Date(-200000, 5, 14)).subtract(1, 'months')._d
    // console.log('------------- moment  newDate', newDate)
    // ====================================================

  }

  const redrawData = (e) => {
    var datann = tlItem.get({ type: { start: 'ISODate', end: 'ISODate' } });
    // console.log('datann', datann)
    tlItem.clear()
    tlItem.add(datann)
  }

  const clearData = (e) => {
    tlItem.clear()
  }


  return (
    <>
      <Box display="flex" justifyContent="flex-end" >
        <Button variant="contained" size="small" onClick={clearData}>clean</Button>
        <Divider orientation="vertical" flexItem />
        <Button variant="contained" size="small" onClick={redrawData}>redraw</Button>
        <Divider orientation="vertical" flexItem />
        <Button variant="contained" size="small" onClick={optionData}>initState</Button>
        <Divider orientation="vertical" flexItem />
        <Button variant="contained" size="small" onClick={getWindow1}>getWindow1</Button>
      </Box>
    </>
  )
}

export const VisTimeLineButtonUp = ({ }) => {
  const { tlRef, tlDepRef, tlItemRef, tlItem, tlZoomMin, tlValuesForm, tlItemLength } = useVisContext();

  const zoomIn = (e) => { tlRef.current.focus(tlRef.current.getSelection()) }
  const zoomOut = (e) => { tlRef.current.fit() }
  const moveLeft = (e) => { move(0.4) }
  const moveRight = (e) => { move(-0.4) }
  function move(percentage) {
    var range = tlRef.current.getWindow();
    var interval = range.end - range.start;

    tlRef.current.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end: range.end.valueOf() - interval * percentage
    });
  }

  return (
    <>
      <div style={{ width: '100%' }}>

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }} >
          <Item>
            <IconButton aria-label="moveLeft" onClick={moveLeft} >
              <IoArrowBackSharp />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label="moveRight" onClick={moveRight} >
              <IoArrowForward />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label="zoomIn" onClick={zoomIn} >
              <GoZoomIn />
            </IconButton>
          </Item>
          <Item>
            <IconButton aria-label="zoomOut" onClick={zoomOut} >
              <TbArrowAutofitContent />
            </IconButton>
          </Item>
          {/* ------------------- */}

        </Box>
      </div>
    </>
  )
}
