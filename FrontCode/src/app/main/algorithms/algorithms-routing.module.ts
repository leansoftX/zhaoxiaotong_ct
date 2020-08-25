import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmsComponent } from './algorithms.component';

const routes: Routes = [
  {
    path: '',
    component: AlgorithmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlgorithmsRoutingModule { }
