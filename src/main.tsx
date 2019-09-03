import { app, BrowserWindow, ipcMain } from 'electron';


let window: BrowserWindow = null;

const createWindow = () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    window.webContents.openDevTools();
    window.loadFile('dist/index.html');
    window.on('closed', () => {
        window = null;
    })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});

ipcMain.on('test', () => {
    console.log('test');
});