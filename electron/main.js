/* eslint global-require: off */

const {
  BrowserWindow,
  app,
  globalShortcut,
  ipcMain,
  nativeImage,
} = require('electron');
const ejse = require('ejs-electron');
const path = require('path');

const readXlsxFile = require('../src/helpers/readXlsxFile');

let mainWindow;
const homePath = path.join(__dirname, '../src/views/home.ejs');
const labelPath = path.join(__dirname, '../src/views/label.ejs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const icon = nativeImage.createFromPath(
    `${app.getAppPath()}/build/app_icon.png`,
  );

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Gerador de Etiquetas V',
    icon,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const { id } = mainWindow;
  const window = BrowserWindow.fromId(id);
  mainWindow.setMenu(null);
  mainWindow.setMenuBarVisibility(false);

  globalShortcut.register('Ctrl+q', () => {
    window.close();
  });

  globalShortcut.register('Ctrl+m', () => {
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  ejse.data('css', '1');
  mainWindow.loadFile(homePath);
}

app.on('ready', createWindow);

ipcMain.on('data:add', (e, { arrayBuffer, ext }) => {
  if (arrayBuffer && ext) {
    const data = readXlsxFile(arrayBuffer, ext);
    ejse.data('css', '2');
    ejse.data('list', data);
    mainWindow.loadFile(labelPath);
  }
});

ipcMain.on('return:home', () => {
  ejse.data('css', '1');
  mainWindow.loadFile(homePath);
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
