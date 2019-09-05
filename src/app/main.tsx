import { app, BrowserWindow, Menu, dialog, ipcMain } from 'electron';
import { homedir } from 'os';
import { PathObserver } from 'observe-js';


const DEV = true;

let window: BrowserWindow = null;

const createWindow = () => {
    Menu.setApplicationMenu(null);

    window = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreenable: false,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if (DEV) {
        window.webContents.openDevTools();
    }

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

ipcMain.on('exit', () => {
    window.close();
});

ipcMain.on('minimize', () => {
    window.minimize();
});

ipcMain.on('open-file-chooser', (event) => {
    dialog.showOpenDialog({
        title: '选择c文件',
        defaultPath: homedir(),
        filters: [
            { name: 'c文件', extensions: ['c'] },
        ],
        properties: ['openFile'],
    }).then(({ filePaths }) => {
        if (filePaths.length > 0) {
            event.sender.send('after-open-file-chooser', filePaths[0]);
        }
    }).catch((err) => console.log(err));
});

ipcMain.on('read-file', (event, fileName) => {
    // TODO: if file is deleted
    // arg1: boolean, arg2: log, arg3: data
    setTimeout(() => {
        event.sender.send('after-read-file', 'ok')
    }, 10000);
});
