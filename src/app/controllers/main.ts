import { ipcMain, dialog } from 'electron';
import { homedir } from 'os';
import * as fs from 'fs';

import { window } from './index';


export default () => {
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

    ipcMain.on('read-file', (event, fileName: string) => {
        let channel = 'after-read-file';

        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, { encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    event.sender.send(channel, false, '文件打开失败');
                } else {
                    event.sender.send(channel, true, data.toString());
                }
            })
        } else {
            event.sender.send(channel, false, '文件不存在');
        }
    });

    ipcMain.on('stop-read-file', () => {
        // msg queue
    });
};
