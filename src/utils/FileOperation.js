import fs from 'fs';

/**
 * unix ls command
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
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

function isExist(path) {
  return new Promise((res, rej) => {
    fs.access(path, err => {
      if(err) {
        res(false)
      }else{
        res(true);
      };
    })
  })
}

function simpleMkdir(path) {
  return new Promise((res, rej) => {
    fs.mkdir(path, err => {
      if(err) { rej(err); }
      res('end');
    })
  })
}

export async function mkdir(path) {
  const result = await isExist(path);
  if (result) { return 'end' };
  await simpleMkdir(path);
}

export function rm(path) {
  return new Promise((res, rej) =>{
    fs.unlink(path, err => {
      if (err) rej(err);
      res('end');
    })
  });
}

export async function rmdir(path) {
  const list = await ls(path);
  for ( let i=0; i<list.length; i += 1 ) {
    await rm(path + '/' + list[i]);
  }
}
