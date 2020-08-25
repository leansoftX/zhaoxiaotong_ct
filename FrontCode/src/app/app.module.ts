import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ServiceProxyModule } from './shared/service-proxies/service-proxy.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/helpers/error.interceptor';
import { fakeBackendProvider } from 'src/helpers/fake-backend';
import { PlatformLocation } from '@angular/common';
import { AppConsts } from './shared/AppConsts';
import { AppPreBootstrap } from './AppPreBootstrap';
import { API_BASE_URL } from './shared/service-proxies/service-proxies';

export function appInitializerFactory(
  injector: Injector,
  platformLocation: PlatformLocation) {
  return () => {

    return new Promise<boolean>((resolve, reject) => {
      AppConsts.appBaseHref = getBaseHref(platformLocation);
      const appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;

      AppPreBootstrap.run(appBaseUrl, () => {
        resolve(true);
      }, resolve, reject);
    });
  };
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  const baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
    return baseUrl;
  }

  return '/';
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

function getDocumentOrigin() {
  if (!document.location.origin) {
    return document.location.protocol + '//' + document.location.hostname + (document.location.port ? ':' + document.location.port : '');
  }

  return document.location.origin;
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    ToggleFullScreenDirective,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ChatUserListComponent,
    FriendComponent,
    ChatMsgComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    ServiceProxyModule
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
    NavigationItem,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
