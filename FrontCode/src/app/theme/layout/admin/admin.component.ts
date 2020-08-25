import { Location } from '@angular/common';
import { DattaConfig } from '../../../app-config';
import { Component, OnInit } from '@angular/core';
import { AppConsts } from 'src/app/shared/AppConsts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public dattaConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor(private location: Location) {
    this.dattaConfig = DattaConfig.config;

    let currentUrl = this.location.path();
    if (this.location[AppConsts.baseHref]) {
      currentUrl = this.location[AppConsts.baseHref] + this.location.path();
    }

    if (currentUrl === this.location[AppConsts.baseHref] + '/layout/collapse-menu'
      || currentUrl === this.location[AppConsts.baseHref] + '/layout/box') {
      this.dattaConfig['collapse-menu'] = true;
    }

    this.windowWidth = window.innerWidth;
    this.navCollapsed = (this.windowWidth >= 992) ? this.dattaConfig['collapse-menu'] : false;
    this.navCollapsedMob = false;
  }

  ngOnInit() {
  }

  navMobClick() {
    if (this.navCollapsedMob && !(document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

}
