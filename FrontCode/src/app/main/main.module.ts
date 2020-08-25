import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { CodingtestComponent } from './codingtest/codingtest.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [CodingtestComponent]
})
export class MainModule { }
