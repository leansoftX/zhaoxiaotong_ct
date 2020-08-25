import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodingtestComponent } from './codingtest.component';


const routes: Routes = [
  {
    path: '',
    component: CodingtestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodingtestRoutingModule { }
