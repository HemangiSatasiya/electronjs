import {
    app,
    Menu,
    Tray
} from "electron";
import * as path from "path";
import * as log from "electron-log";
const AutoLaunch = require("auto-launch");


let win, tray;
let iconPath;
let isWin = process.platform === "win32";
let isLinux = process.platform === "linux";
let utilityAutoLauncher = new AutoLaunch({
    name: "recorder-utility",
    path: process.env.APPIMAGE,
  });

if (isLinux) {
    iconPath = path.join(__dirname, "favicon.png");
  } else if (isWin) {
    iconPath = path.join(__dirname, "favicon.ico");
  } else {
    iconPath = path.join(__dirname, "favicon.icns");
}
  
utilityAutoLauncher.enable();

utilityAutoLauncher
  .isEnabled()
  .then((isEnabled) => {
    log.info("Utility auto launcher is enabled: ", isEnabled);
    if (isEnabled) {
      return;
    }
    utilityAutoLauncher.enable();
  })
  .catch((err) => {
    log.info("Error in auto launch: ", err);
  });

/**
 * @desc: Creates a browser window.
 * @returns
 */
 function createWindow() {  
    createTrayIcon();
 }
  
 function createTrayIcon() {
    if (!tray) {
      tray = new Tray(iconPath);
  
      const contextMenu = Menu.buildFromTemplate([
        {
          id: "1",
          label: "Show App",
          click: function () {
            win.show();
          },
        },
        {
          id: "2",
          label: "Reload App",
          click: function () {
            win.webContents.send("message-main", { data: "reload-page" });
          },
        },
        {
          id: "4",
          label: "Toggle Debug Mode",
          click: function () {
            win.webContents.send("message-main", { data: "toggle-debug" });
          },
        },
        {
          id: "5",
          label: "Quit App",
          click: function () {
            app.exit();
          },
        },
      ]);
      tray.setContextMenu(contextMenu);
      tray.setToolTip("Audio Recorder Utility");
  
      // contextMenu.getMenuItemById('3').label = 'tet';
  
      tray.on("click", () => {
        win.show();
      });
    }
 }
  
 try {
    // log.info('app.getpath', app.getPath('exe'));
  
    // Don't register auto start and single instance run in dev environment
    if (app.getPath("exe").indexOf("electron.exe") === -1) {
      const gotTheLock = app.requestSingleInstanceLock();
  
      if (!gotTheLock) {
        app.exit();
      } else {
        app.on("second-instance", (event, commandLine, workingDirectory) => {
          // Someone tried to run a second instance, we should focus our window.
          if (win) {
            if (!win.isVisible()) {
              win.show();
            } else if (win.isMinimized()) {
              win.restore();
            }
            win.focus();
          }
        });
      }
  
      // const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
      //   // Someone tried to run a second instance, we should focus our window.
      //   if (win) {
      //     if (!win.isVisible()) {
      //       win.show();
      //     } else if (win.isMinimized()) {
      //       win.restore();
      //     }
      //     win.focus();
      //   }
      // });
  
      app.setLoginItemSettings({
        openAtLogin: true,
      });
    }
  
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", createWindow);
  
    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
  
    app.on("activate", () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow();
      }
    });
  } catch (e) {
    // Catch Error
    // throw e;
  }