import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as log from "electron-log";
import { DomSanitizer } from "@angular/platform-browser";
import { ElectronService } from './providers/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-tour-of-heroes';

  constructor(
    private _domSanitizer: DomSanitizer,
    private electronService: ElectronService,
    router: Router
  ) {}

  ngOnInit() {

    /* this._iconRegistry.addSvgIconInNamespace('assets', 'dosepacker-logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/img/dosepacker-icon.svg'));
 */
    // this.electronService.ipcRenderer.on("message-main", (e, d) => {
    //   // log.info('ipcrenderer data received', e, d);
    //   switch (d["data"]) {
    //     case "toggle-debug":
    //       let currentWin = this.electronService.remote.getCurrentWindow();
    //       if (currentWin.webContents.isDevToolsOpened()) {
    //         currentWin.webContents.closeDevTools();
    //       } else {
    //         currentWin.webContents.openDevTools();
    //       }
    //       break;
    //     case "reload-page":
    //       log.info("Reloading page");
    //       // this.reloadPage();
    //       this.electronService.remote.getCurrentWindow().reload();

    //       break;

    //     default:
    //       log.info("Message from IPC renderer, not caught:", d);
    //   }
    // });
  }
}
