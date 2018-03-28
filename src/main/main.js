// アプリケーション作成用のモジュールを読み込み
import {app, BrowserWindow} from 'electron';
import path from 'path';

const ROOT_PATH = "file://" + path.resolve("");
 
// メインウィンドウ
let mainWindow;
 
function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({width: 1200, height: 900});
  mainWindow.loadURL(`${ROOT_PATH}/dist/renderer/index.html`);
 
  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();
 
  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
 
//  初期化が完了した時の処理
app.on('ready', createWindow);
 
// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});
