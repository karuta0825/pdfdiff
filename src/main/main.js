// アプリケーション作成用のモジュールを読み込み
import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import {getRoot} from '../utils/Path'

const ROOT_PATH = "file://" + getRoot();

// メインウィンドウ
let mainWindow;

//  初期化が完了した時の処理
app.on('ready', () => {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({width: 1200, height: 900});
  mainWindow.loadURL(`${ROOT_PATH}/dist/renderer/index.html`);

  ipcMain.on('open-file-dialog', (event, position) => {
    dialog.showOpenDialog({
      properties: ['openFile']
    }, (files) => {
      if (files) {
        event.sender.send('selected-file', files[0], position)
      }
    });
  })

  // デベロッパーツールの起動
  mainWindow.webContents.openDevTools();

 // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});

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
