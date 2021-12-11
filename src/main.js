const {
  BrowserWindow,
  app,
  dialog,
  globalShortcut,
  ipcMain,
} = require('electron');
const ejse = require('ejs-electron');
const path = require('path');

const readXlsxFile = require('./helpers/readXlsxFile');

let mainWindow;
dialog.showErrorBox = (title, content) => {
  console.log(`${title}\n${content}`);
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Gerador de Etiquetas V',
    icon: path.join(__dirname, '../resources/icons/app_icon.png'),
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
  mainWindow.loadFile(`${__dirname}/views/home.ejs`);
}

app.on('ready', createWindow);

ipcMain.on('data:add', (e, { arrayBuffer, ext }) => {
  if (arrayBuffer && ext) {
    const data = readXlsxFile(arrayBuffer, ext);
    ejse.data('css', '2');
    ejse.data('list', data);
    mainWindow.loadFile(`${__dirname}/views/label.ejs`);
  }
});

ipcMain.on('return:home', () => {
  ejse.data('css', '1');
  mainWindow.loadFile(`${__dirname}/views/home.ejs`);
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
