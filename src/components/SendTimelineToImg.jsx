import IconButton from '@mui/material/IconButton';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { BsFiletypePng } from "react-icons/bs";

const SendTimelineToImg = ({ componentRef }) => {
  const handleDownloadImage = async () => {

    if (componentRef.current) {
      let yam = new Date()
      let yyam = `${yam.toLocaleDateString()}_${yam.getTime()}`
      yyam = yyam.replaceAll("/", "-")
      const dataUrl = await htmlToImage.toPng(componentRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `timelineImg_${yyam}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadImage_b = async () => {
    if (componentRef.current) {
      const ahora = Date.now()
      const dataUrl = await htmlToImage.toPng(componentRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `timelineImgPng_${ahora}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    // <Button  size="large" onClick={handleDownloadImage}  endIcon={<BsFiletypePng />} />
    <IconButton color="primary" size="large" onClick={handleDownloadImage} ><BsFiletypePng /> </IconButton>
    // <button onClick={handleDownloadImage}>Download as PNG</button>
  )
}

export default SendTimelineToImg
