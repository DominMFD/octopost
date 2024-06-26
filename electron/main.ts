import { app, BrowserWindow } from 'electron';
import path from 'node:path';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null;

async function createWindow(): Promise<void> {
  if (process.env.VITE_PUBLIC) {
    win = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, 'logo.svg'),
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        preload: path.join(__dirname, './preload.js'),
      },
    });
  }

  if (win) {
    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
      win?.webContents.send(
        'main-process-message',
        new Date().toLocaleString()
      );
    });

    if (process.env.VITE_DEV_SERVER_URL) {
      await win.loadURL(process.env.VITE_DEV_SERVER_URL);
      win.webContents.openDevTools();
    } else {
      if (process.env.DIST) {
        await win.loadFile(path.join(process.env.DIST, 'index.html'));
      }
    }
  }
}

app.on('window-all-closed', () => {
  app.quit();
  win = null;
});

app.whenReady().then(createWindow).catch(console.error);
