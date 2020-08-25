import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { Location } from '@angular/common';
import { DattaConfig } from '../../../../../../app-config';
import { AppConsts } from 'src/app/shared/AppConsts';

@Component({
  selector: 'app-nav-group',
  templateUrl: './nav-group.component.html',
  styleUrls: ['./nav-group.component.scss']
})
export class NavGroupComponent implements OnInit {
  @Input() item: NavigationItem;
  public dattaConfig: any;

  constructor(private zone: NgZone, private location: Location) {
    this.dattaConfig = DattaConfig.config;
  }

  ngOnInit() {
    // at reload time active and trigger link
    let currentUrl = this.location.path();
    if (this.location[AppConsts.baseHref]) {
      currentUrl = this.location[AppConsts.baseHref] + this.location.path();
    }
    const link = 'a.nav-link[ href="' + currentUrl + '" ]';
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const upParent = parent.parentElement.parentElement;
      const lastParent = upParent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig.layout === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if (upParent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig.layout === 'vertical') {
          upParent.classList.add('pcoded-trigger');
        }
        upParent.classList.add('active');
      } else if (lastParent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig.layout === 'vertical') {
          lastParent.classList.add('pcoded-trigger');
        }
        lastParent.classList.add('active');
      }
    }
  }

}
