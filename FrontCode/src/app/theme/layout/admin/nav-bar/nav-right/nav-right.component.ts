import { Component, DoCheck, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { DattaConfig } from '../../../../../app-config';
import { AuthenticationService } from 'src/helpers/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck {
  public visibleUserList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;

  constructor(
    config: NgbDropdownConfig,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
  }

  ngOnInit() {
  }

  chatToggle(friendId) {
    this.friendId = friendId;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['auth/signin']);
  }
}
