import { app, BrowserWindow, Menu } from 'electron';
import startIpcMain from './main';

export let window: BrowserWindow = null;

const createWindow = (env: string) => {
    Menu.setApplicationMenu(null);

    window = new BrowserWindow({
        width: 700,
        height: 600,
        fullscreenable: false,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (env === 'dev') {
        window.webContents.openDevTools();
    }

    window.loadFile('dist/index.html');
    window.on('closed', () => {
        window = null;
    })
};

export default (env: string = 'dev') => {
    app.once('ready', () => createWindow(env));

    app.once('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.once('activate', () => {
        if (window === null) {
            createWindow(env);
        }
    });

    startIpcMain();
};
