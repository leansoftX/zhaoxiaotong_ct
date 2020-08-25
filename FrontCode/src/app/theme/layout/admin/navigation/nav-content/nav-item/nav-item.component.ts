import {Component, Input, NgZone, OnInit} from '@angular/core';
import {NavigationItem} from '../../navigation';
import {DattaConfig} from '../../../../../../app-config';
import {Location} from '@angular/common';
import { AppConsts } from 'src/app/shared/AppConsts';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() item: NavigationItem;
  public dattaConfig: any;
  public themeLayout: string;

  constructor(private location: Location) {
    this.dattaConfig = DattaConfig.config;
    this.themeLayout = this.dattaConfig.layout;
  }

  ngOnInit() {
  }

  closeOtherMenu(event) {
    if (this.dattaConfig.layout === 'vertical') {
      const ele = event.target;
      if (ele !== null && ele !== undefined) {
        const parent = ele.parentElement;
        const upParent = parent.parentElement.parentElement;
        const lastParent = upParent.parentElement;
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (const section of sections as any) {
          section.classList.remove('active');
          section.classList.remove('pcoded-trigger');
        }
        if (parent.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('pcoded-trigger');
          parent.classList.add('active');
        } else if (upParent.classList.contains('pcoded-hasmenu')) {
          upParent.classList.add('pcoded-trigger');
          upParent.classList.add('active');
        } else if (lastParent.classList.contains('pcoded-hasmenu')) {
          lastParent.classList.add('pcoded-trigger');
          lastParent.classList.add('active');
        }
      }
      if ((document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open'))) {
        document.querySelector('app-navigation.pcoded-navbar').classList.remove('mob-open');
      }
    } else {
      setTimeout(() => {
        const sections = document.querySelectorAll('.pcoded-hasmenu');
        for (const section of sections as any) {
          section.classList.remove('active');
          section.classList.remove('pcoded-trigger');
        }

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
            parent.classList.add('active');
          } else if (upParent.classList.contains('pcoded-hasmenu')) {
            upParent.classList.add('active');
          } else if (lastParent.classList.contains('pcoded-hasmenu')) {
            lastParent.classList.add('active');
          }
        }
      }, 500);
    }
  }

}
