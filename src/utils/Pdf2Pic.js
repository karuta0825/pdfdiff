import PDF2Pic from 'pdf2pic';


export default function convert(pdfPath, outputPath) {

  const converter = new PDF2Pic({
    density: 200,
    savename: "output",
    savedir: outputPath,
    format: "png"
  });

  return converter.convertBulk(pdfPath, -1);

}


  // const PDF2Pic = require('pdf2pic');
  //   const converter = new PDF2Pic({
  //     density: 200,
  //     savename: "output",
  //     savedir: './images/diff',
  //     format: "png"
  //   });

  // converter.convertBulk('test.pdf', -1).then(r=>{console.log(r)});