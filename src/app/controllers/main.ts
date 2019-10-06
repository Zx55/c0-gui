import { ipcMain, dialog, shell } from 'electron';
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

    // 通过FileChooser选择文件 返回文件名
    ipcMain.on('open-file-chooser', (event, title: string, format: string) => {
        dialog.showOpenDialog({
            title: title,
            defaultPath: homedir(),
            filters: [
                { name: format, extensions: ['c'] },
            ],
            properties: ['openFile'],
        }).then(({ filePaths }) => {
            if (filePaths.length > 0) {
                event.sender.send('after-open-file-chooser', filePaths[0]);
            }
        }).catch((err) => console.log(err));
    });

    // 根据fileName打开文件 返回读入代码
    ipcMain.on('read-file', (event, fileName: string) => {
        let channel = 'after-read-file';

        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, { encoding: 'utf-8'}, (err, data) => {
                if (err) {
                    event.sender.send(channel, false, '0');
                } else {
                    event.sender.send(channel, true, data.toString());
                }
            })
        } else {
            event.sender.send(channel, false, '1');
        }
    });

    // 打开GitHub仓库
    ipcMain.on('open-repo', (event) => {
        shell.openExternal('https://github.com/Zx55/c0-compiler');
    });
};
