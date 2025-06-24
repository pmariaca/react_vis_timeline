import React, { useState, useEffect, useCallback } from 'react'

import { useVisContext } from '../contexts/VisProvider';
import { hGetDate, hvaluesForm } from '../helpers/functions'
import VisDate from './VisDate';
import PreviewImage from './PreviewImage';
import { Box, Button, Divider, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { styled } from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const VisForm = ({ isEdit, idEvent = 0, valuesForm = hvaluesForm }) => {
  const { tlItem, tlRef, tlZoomMin, tlValuesForm, setTlValuesForm } = useVisContext();
  // const valuesForm = tlValuesForm
  // const valuesForm = hvaluesForm
  // const [valuesForm, setValuesForm] = useState(hvaluesForm);

  const [content, setContent] = useState(valuesForm.content);
  const [datClassName, setDatClassName] = useState(valuesForm.className);
  const [rradio, setRradio] = useState(valuesForm.type);
  const [dosDates, setDosDates] = useState(1);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(valuesForm.imageUrl);
  // -----------------------------
  const [iconVisible, setIconVisible] = useState('collapse');

  useEffect(() => {
    if (isEdit && idEvent != 0) {
      var item = tlItem.get(idEvent)
      // console.log('----- isNkcotEmpty idEvent ------si qaquiiiii idEvent', idEvent)
    }

    const isNotEmpty = Object.keys(tlItem).length > 0;
    if (isNotEmpty && isEdit && idEvent == 0) {
      // if (isEdit) {
      // console.log('-------- sssiiiii----si qaquiiiii  valuesForm.id)', valuesForm.id)
      // console.log('VisForm -- valuesForm.type', valuesForm)

      // setValuesForm(tlValuesForm)
      setContent(valuesForm.content)
      setRradio((valuesForm.type == undefined) ? 'box' : valuesForm.type)
      // setRradio((valuesForm.type == undefined && valuesForm.end == undefined) ? 'box' : valuesForm.type)
      setDatClassName(valuesForm.className)
      setFileDataURL(valuesForm.imageUrl)
      if ((valuesForm.imageUrl == '#' || valuesForm.imageUrl == '')) {
        setIconVisible('collapse')
      } else {
        setIconVisible('visible')
      }
      // -----
      if ((valuesForm.type == undefined || valuesForm.type == 'range') && valuesForm.end != undefined) {
        setRradio('range')
        setDosDates(2)
      } else {
        if (valuesForm.type == undefined) {
          // setRradio('box')
        }
        setDosDates(1)
      }
    }
  }, [valuesForm.type, valuesForm.content, valuesForm.start, valuesForm.end, valuesForm.imageUrl]);

  const handleChange = (e) => {
    e.preventDefault();
    // console.log('---- handleChange ----', e.target.name)
    // console.log('target : ', e.target);
    // console.log('target value: ', e.target.value);
    if (e.target.name == 'content') {
      setContent(e.target.value)
    }
    if (e.target.name == 'isRradio') {
      // console.log('setRradio: ', e.target.value)
      setRradio(e.target.value);
      if (e.target.value == 'range') {
        setDosDates(2)
      } else {
        setDosDates(1)
      }
    }
  };

  function initForm() {
    setTlValuesForm({
      id: '',
      content: '',
      start: '',
      end: '',
      className: 'opt-content-move-0',
      style: '',
      type: '',
      imageUrl: '',
      link: [],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // The type of the item. 
    // Can be 'box' (default), 'point', 'range', or 'background'. 
    // Types 'box' and 'point' need a start date,  
    // the types 'range' and 'background' needs both a start and end date. 

    const formData = new FormData(e.target);
    const { idItem, isEdit, content, date1, date2, myImg } = Object.fromEntries(formData);
    // console.log('---------idItem', idItem)

    if (isEdit && !idItem) { return }
    console.log('================================ date1 ', date1)

    const ddate1 = hGetDate(tlZoomMin, date1)
    var newItem = { 'start': ddate1 }
    const isRradio = rradio
    console.log('---------- idItem-1', idItem)
    console.log('---------- isRradio -> ', isRradio, 'rradio', rradio)
    // ------------------------


    if (isEdit == 'true') { newItem['id'] = idItem }
    if (isRradio == 'box' || isRradio == undefined) {
      // if (rradio == 'box') {
      newItem['type'] = 'box'
    } else {
      newItem['type'] = isRradio
    }

    let end = hGetDate(tlZoomMin, date2)
    if (isRradio == 'range' && end.toString() !== "Invalid Date") {
      newItem['end'] = end
    }
    // ------------------------
    // 'column' -> sin className
    if (!(myImg == undefined || myImg == '#' || myImg == '')) {
      // console.log('---------- SIIIII hay imagen, tons sin className')
      // console.log('---------- datClassName - original', datClassName)
      // console.log('contentDirection ->', contentDirection)

      // if ((contentDirection).search('column') != -1 || (contentDirection).search('row') != -1) {
      //   let contDirection = datClassName
      //   if (datClassName != undefined && (datClassName).search('opt-content-move') != -1) {
      //     for (let i = 0; i < 4; i++) {
      //       contDirection = contDirection.replaceAll("opt-content-move-" + i, "").trim()
      //     }
      //   }

      //   let classN = ''
      //   for (let i = 0; i < 4; i++) {
      //     if (contentDirection == borderBox[i]) { classN = 'opt-content-move-' + i }
      //   }
      //   newItem['className'] = `${contDirection} ${classN}`.trim()
      // }
    }
    // ------------------------
    // replace(/\r/gm,'newChar');
    let divContent = content
    let myIimagen = myImg
    myIimagen = valuesForm.imageUrl
    divContent = `<div>${content}</div><img src="${myImg}"/>`;
    if (myImg == undefined || myImg == '#' || myImg == '') {
      divContent = `<div>${content}</div>`;
    }
    // str = str.replace(RegExp(String.fromCharCode(10), 'g'), 'newChar');
    // newItem['content'] = divContent.replaceAll(RegExp(String.fromCharCode(10), 'g'),'<br>')
    newItem['content'] = divContent.replaceAll(/[\n\r]/g, '<br>')
    console.log('------------------ newItem-1', newItem)

    if (isEdit == 'true') {
      tlItem.updateOnly(newItem)
      tlRef.current.setSelection([], { animation: false })
      initForm()
    } else {
      tlItem.add(newItem)
    }
  }

  return (
    <Box sx={{ p: 2, backgroundColor: 'pink' }} >
      <form onSubmit={handleSubmit}>
        <input type='hidden' value={valuesForm.id} id='idItem' name='idItem' />
        {/* aqui fileDataURL no puede ser nulo !!! */}
        <input type='hidden' value={fileDataURL} name='myImg' />
        <input type='hidden' value={isEdit} name='isEdit' />

        {/* <TextField variant="filled" label="--- BORRAME ---" value={contentDirection} />   <VisFormat />  */}
        {/* ---------------------------------- */}

        <Grid size={12} >
          <Item>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="isRradio"
              value={rradio}
              onChange={handleChange}
            >
              <FormControlLabel value="box" control={<Radio />} label="Caja" />
              <FormControlLabel value="range" control={<Radio />} label="Rango" />
              <FormControlLabel value="point" control={<Radio />} label="Punto" />
              <FormControlLabel value="background" control={<Radio />} label="Fondo" />
            </RadioGroup>
          </Item>
          {/* ---------------------------------- */}
          <Item>
            <Box sx={{ py: 1, padding: '3px' }}>
              <VisDate
                isEdit={isEdit}
                ddate1={valuesForm.start}
                ddate2={valuesForm.end}
                numDate={dosDates}
                ddirection={'row'}
              />
            </Box>
          </Item>

          <Item>
            <TextareaAutosize label="Titulo" variant="outlined"
              minRows={4}
              style={{ width: 200 }}
              // sx={{ m: 1, width: '15ch'  }}
              name='content'
              onChange={handleChange}
              value={content}
            />
          </Item>
          <Item>
            <PreviewImage
              file={file}
              setFile={setFile}
              fileDataURL={fileDataURL}
              setFileDataURL={setFileDataURL}
              iconVisible={iconVisible}
              setIconVisible={setIconVisible}
            // formaImg={formaImg}
            />
          </Item>
        </Grid>

        {/* ---------------------------------- */}
        {isEdit ?
          <Box display="flex" justifyContent="flex-end">
            <Button
              name='update'
              justify="flex-end"
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            > Update </Button>
          </Box>
          :
          <Box display="flex" justifyContent="flex-end">
            <Button
              justify="flex-end"
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            > Add</Button>
          </Box>
        }

      </form>
    </Box >
  )
}

export default VisForm
