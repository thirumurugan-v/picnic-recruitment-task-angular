import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScreenSize, ScreenSizeSettings } from '../../models/screen-size';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSize$: BehaviorSubject<ScreenSize>;
  screenWidth: any;
  screenSize: ScreenSize;

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));

    // get the initial window size and updates the screen size observable.
    this.screenWidth = window.innerWidth;
    this.identifyDeviceType();
    this.screenSize$ =  new BehaviorSubject<ScreenSize>(this.screenSize);
  }

  // called on windows resize event.
  private onResize(event: any) {
    this.screenWidth = event.target.innerWidth;

    this.identifyDeviceType();
    this.screenSize$.next(this.screenSize);
  }

  // Compares the current screen size against the settings to identify the device type
  private identifyDeviceType(){
    if(this.screenWidth <= ScreenSizeSettings.mobileScreenSize){
      this.screenSize = ScreenSize.mobile;
    } else if(this.screenWidth <= ScreenSizeSettings.tabletScreenSize && this.screenWidth > ScreenSizeSettings.mobileScreenSize){
      this.screenSize = ScreenSize.tablet;
    } else {
      this.screenSize = ScreenSize.desktop;
    }
  }

  // returns the screen size enum as observable whenever the window resize happens.
  public getScreenSize(): Observable<ScreenSize> {
    return this.screenSize$.asObservable();
  }
}
