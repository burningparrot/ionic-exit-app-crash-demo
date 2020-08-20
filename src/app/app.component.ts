import { Component, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonRouterOutlet, Platform } from '@ionic/angular';

const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})
export class AppComponent {
  @ViewChild(IonRouterOutlet, { static: true })
  routerOutlet: IonRouterOutlet;

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.androidExitAppOnBackButton();
    });
  }

  androidExitAppOnBackButton() {
    if (!this.platform.is('android')) {
      return;
    }

    this.platform.backButton.subscribeWithPriority(1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }
}
