import path from 'path';

export function getRoot() {
  return path.resolve('');
}

export function getRootHtmlPath() {
  return getRoot() + '/dist/renderer/index.html';
}

export function getImgDir() {
  return getRoot() + '/images';
}

export function getBeforeDir() {
  return getRoot() + '/images/before';
}

export function getAfterDir() {
  return getRoot() + '/images/after';
}

export function getDiffDir() {
  return getRoot() + '/images/diff';
}

export function getOS() {
  // mac -> darwin
  // win -> win32
  return process.platform;
}