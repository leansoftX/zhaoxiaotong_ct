import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DattaConfig } from '../../../../app-config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() navCollapseEvent = new EventEmitter<any>();
  @Output() navCollapsedMobEvent = new EventEmitter<any>();

  public dattaConfig: any;
  public navCollapsed: boolean;
  public navCollapsedMob: boolean;
  public windowWidth: number;

  constructor() {
    this.dattaConfig = DattaConfig.config;
    this.windowWidth = window.innerWidth;
    this.navCollapsed = (this.windowWidth >= 992) ? this.dattaConfig['collapse-menu'] : false;
    this.navCollapsedMob = false;
  }

  ngOnInit() {
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.navCollapsed = !this.navCollapsed;
      this.navCollapseEvent.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.navCollapsedMobEvent.emit();
    }
  }
}
