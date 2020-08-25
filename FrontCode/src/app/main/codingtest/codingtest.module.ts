import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { CodingtestComponent } from './codingtest.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { CodingtestRoutingModule } from './codingtest-routing.module';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    SharedModule,
    NotifierModule,
    NgbTabsetModule,
    NgbDropdownModule,
    CodingtestRoutingModule,
    ModalModule.forRoot(),
  ],
  declarations: [CodingtestComponent]
})
export class CodingtestModule { }
