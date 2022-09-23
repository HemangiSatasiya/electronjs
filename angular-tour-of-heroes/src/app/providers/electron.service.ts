import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, dialog, app } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable()
export class ElectronService {

    // ipcRenderer: typeof ipcRenderer;
    // webFrame: typeof webFrame;
    // remote: typeof remote;
    // childProcess: typeof childProcess;
    // fs: typeof fs;
    // nodePrinter: any;
    // dialog: typeof dialog;
    // app: typeof app;

    // constructor() {
    //     if (this.isElectron()) {
    //         this.ipcRenderer = window.require('electron').ipcRenderer;
    //         this.webFrame = window.require('electron').webFrame;
    //         this.remote = window.require('electron').remote;
    //         // this.nodePrinter = remote.require('printer');
    //         this.dialog = remote.dialog;
    //         this.app = remote.app;
    //         this.childProcess = window.require('child_process');
    //         this.fs = window.require('fs');
    //     }
    // }

    // isElectron = () => {
    //     return window && window.process && window.process.type;
    // }

}
