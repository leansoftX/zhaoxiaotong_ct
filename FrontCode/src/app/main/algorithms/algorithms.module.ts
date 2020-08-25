import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './algorithms.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { AlgorithmsRoutingModule } from './algorithms-routing.module';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      TableModule,
      CommonModule,
      SharedModule,
      NotifierModule,
      NgbTabsetModule,
      NgbDropdownModule,
      AlgorithmsRoutingModule,
      ModalModule.forRoot(),
    ],
    declarations: [AlgorithmsComponent]
  })
  export class AlgorithmsModule { }