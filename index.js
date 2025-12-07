const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        toolbar: false,
        icon: __dirname + '/res/icon/desktop/icon.ico'
    });
    win.setMenuBarVisibility(false);

    win.loadURL(url.format({
        pathname: path.join(path.join(__dirname + '/platforms/browser/www/index.html')),
        protocol: 'file:',
        slashes: true
    }));


    win.once('ready-to-show', () => {
        win.show();
    });

    // Open the DevTools.
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});