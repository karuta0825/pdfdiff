import fs from 'fs';


export function ls(path) {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        rej(err);
      }
      res(files);
    });
  })
}

// export 

//       var fileList = files.filter(function(file){
//           return fs.statSync(file).isFile() && /.*\.csv$/.test(file); //絞り込み
//       })
