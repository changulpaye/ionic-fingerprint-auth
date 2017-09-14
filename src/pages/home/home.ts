import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  idleTimeoutID: number;
  isHome: boolean = true;
  fingerprintOptions : FingerprintOptions;
  constructor(
    public platform: Platform,
    private events : Events,
    private fingerprint: FingerprintAIO) {
      
      this.fingerprintOptions = {
        clientId : 'fingerprint-badge',
        clientSecret : 'password',
        disableBackup : false,
        localizedFallbackTitle: 'Use Pin', //Only for iOS
        localizedReason: 'Please authenticate' //Only for iOS
      }

      this.trackingUserIdleTime
  ();
      this.subscribeEvents();
  }

  async showFingerintDialog() {

    try {
      await this.platform.ready()
      const avaialable = await this.fingerprint.isAvailable();
      console.log(avaialable);
      if(avaialable === 'OK') {
        const result = await this.fingerprint.show(this.fingerprintOptions);
        this.goActive();
        console.log(result);
      }
    } catch (error) {
      console.error(error);
      this.platform.exitApp();
    }
  }


  subscribeEvents() {

    this.events.subscribe('user:inactive', () => {
      this.showFingerintDialog();
    });

  }

  startTimer() {
    //console.log(this.idleTimeout);
    this.idleTimeoutID = setTimeout(() => {
      this.goInactive();
    }, Constants.IDLE_TIMEOUT);
  }


  goActive() {
    console.log('go active');
    this.startTimer();
  }


  trackingUserIdleTime() {
    var self = this;
    var eventList = ["mousemove", "mousedown", "keypress", "keydown", "keyup", "DOMMouseScroll", "mousewheel", "touchmove", "MSPointerMove", "touchstart"];
    var len = eventList.length;
    for (var i = 0; i < len; i++) {
      document.addEventListener(eventList[i], function () {
        console.log("checking idle");
        if (self.isHome) {
          window.clearTimeout(self.idleTimeoutID);
          self.goActive();
        }
      }, false);
    }

    if (this.isHome)
      this.startTimer();
  }

  goInactive() {
    console.log('go inactive');
    this.events.publish('user:inactive');

  }

}
