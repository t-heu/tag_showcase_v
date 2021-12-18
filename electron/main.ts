/* eslint global-require: off */

import {
  BrowserWindow,
  app,
  nativeImage,
} from 'electron';
import { autoUpdater } from 'electron-updater'; 
import path from 'path';
import * as url from 'url';

let mainWindow: BrowserWindow | null = null;

if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const icon = nativeImage.createFromPath(
    `${app.getAppPath()}/assets/icon.png`,
  );

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 600,
    icon,
    webPreferences: {
      nodeIntegration: true
    },
  });

  mainWindow.setMenu(null);
  mainWindow.setMenuBarVisibility(false);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000')
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  }
}

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
