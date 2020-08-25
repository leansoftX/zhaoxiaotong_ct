import { NavigationItem } from '../../navigation';
import { Component, Input, OnInit } from '@angular/core';
import { DattaConfig } from '../../../../../../app-config';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-collapse',
  templateUrl: './nav-collapse.component.html',
  styleUrls: ['./nav-collapse.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ],
})
export class NavCollapseComponent implements OnInit {
  public visible;
  @Input() item: NavigationItem;
  public dattaConfig: any;
  public themeLayout: string;

  constructor() {
    this.visible = false;
    this.dattaConfig = DattaConfig.config;
    this.themeLayout = this.dattaConfig.layout;
  }

  ngOnInit() {
  }

  navCollapse(e) {
    this.visible = !this.visible;

    let parent = e.target;
    if (this.themeLayout === 'vertical') {
      parent = parent.parentElement;
    }

    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (const section of sections as any) {
      if (section !== parent) {
        section.classList.remove('pcoded-trigger');
      }
    }

    let firstParent = parent.parentElement;
    let preParent = parent.parentElement.parentElement;
    if (firstParent.classList.contains('pcoded-hasmenu')) {
      do {
        firstParent.classList.add('pcoded-trigger');
        firstParent = firstParent.parentElement.parentElement.parentElement;
      } while (firstParent.classList.contains('pcoded-hasmenu'));
    } else if (preParent.classList.contains('pcoded-submenu')) {
      do {
        preParent.parentElement.classList.add('pcoded-trigger');
        preParent = preParent.parentElement.parentElement.parentElement;
      } while (preParent.classList.contains('pcoded-submenu'));
    }
    parent.classList.toggle('pcoded-trigger');
  }

}
