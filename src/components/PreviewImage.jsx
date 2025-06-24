import { useEffect } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import ImageSearchOutlinedIcon from '@mui/icons-material/ImageSearchOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PreviewImage = ({ file, setFile, fileDataURL, setFileDataURL, iconVisible, setIconVisible, formaImg=0 }) => {


  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      setIconVisible('visible')
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }
  }, [file]);

  const changeHandler = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
    console.log('target file', e.target)
    setFile(file);
  }

  const removeSelImage = (e) => {
    e.preventDefault()
    setFileDataURL('#')
    setFile(null)
    setIconVisible('collapse')
  };

  return (

    <Stack direction="column" spacing={1} sx={{ py: 0 }}>
      <Button
        sx={{ alignItems: "center", visibility: iconVisible == 'visible' ? 'collapse' : 'visible' }}
        // sx={{justifyContent:"center", visibility: iconVisible == 'visible' ? 'collapse' : 'visible' }}
        variant="contained" component="label" startIcon={<ImageSearchOutlinedIcon />}>
        <VisuallyHiddenInput
          accept='.png, .jpg, .jpeg, .svg'
          // accept='image/*, .png, .jpg, .jpeg, .svg'
          type="file"
          loading="lazy"
          onChange={changeHandler}
        />
      </Button>

      <Box direction='column' >
        {
          fileDataURL == '' ? '.' :
            <Box
            // sx={{ p: 2, border: '1px dashed grey', backgroundColor: grey[100] }}
            // sx={{ p: 2,  backgroundColor: grey[200], borderRadius:`${formaImg}%` }}
            >
              <img src={fileDataURL} alt="." width='100px' height='100px' style={{ borderRadius: `${formaImg}%` }} />
            </Box>
        }
        <IconButton sx={{ padding: '0px', visibility: iconVisible == 'collapse' ? 'collapse' : 'visible' }} color="primary" aria-label="upload picture" onClick={removeSelImage}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Stack>

  )
}

export default PreviewImage
