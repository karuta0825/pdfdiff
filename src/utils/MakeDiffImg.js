import fs from 'fs'
import {PNG} from 'pngjs'
import pixelmatch from 'pixelmatch'

function readImage(path) {
  return new Promise((res, rej) =>{
    const r = fs.createReadStream(path).pipe(new PNG()).on('parsed', () => {
      res(r)
    })
  })
}

function writeImage(diff, output) {
  return new Promise((res, rej) => {
    const w = diff.pack().pipe(fs.createWriteStream(output));
    w.on('close', () => {
      res('end');
    });
  })
}

export default async function makeDiff(path1, path2, output) {
  try {
    const img1 = await readImage(path1);
    const img2 = await readImage(path2);
    const diff = new PNG({width:img1.width, height: img1.height});
    pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height,{threshold: 0.1});
    await writeImage(diff, output);
  }catch(e) {
    throw e;
  }
}

