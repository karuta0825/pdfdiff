import fs      from 'fs';
import path    from 'path';
import pdf2img from 'pdf2img';

export default function convert(pdfPath, outputPath) {

  pdf2img.setOptions({
    type: 'png',
    size: 640,
    density: 100,
    outputdir: outputPath,
    outputname: 'test',
    page: null
  });

  return new Promise((res, rej) => {
    pdf2img.convert(pdfPath, function(err, info) {
      if (err) {rej(err)};
      res(info);
    });
  });

}

