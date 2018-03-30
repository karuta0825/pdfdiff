import fs from 'fs';


export function ls(path) {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        rej(err);
      }
      const sortfiles = files.sort( (a,b) => {
        a = a.match(/\d+/);
        b = b.match(/\d+/);
        return a-b
      })
      res(sortfiles);
    });
  })
}