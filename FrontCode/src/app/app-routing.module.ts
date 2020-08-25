import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from 'src/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './demo/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'dashboard',
        loadChildren: './demo/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'basic',
        loadChildren: './demo/ui-elements/ui-basic/ui-basic.module#UiBasicModule'
      },
      {
        path: 'forms',
        loadChildren: './demo/pages/form-elements/form-elements.module#FormElementsModule'
      },
      {
        path: 'tables',
        loadChildren: './demo/pages/tables/tables.module#TablesModule'
      },
      {
        path: 'charts',
        loadChildren: './demo/pages/core-chart/core-chart.module#CoreChartModule'
      },
      {
        path: 'sample-page',
        loadChildren: './demo/extra/sample-page/sample-page.module#SamplePageModule'
      },
      {
        path: 'codingtest',
        loadChildren: './main/codingtest/codingtest.module#CodingtestModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './account/authentication/authentication.module#AuthenticationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
