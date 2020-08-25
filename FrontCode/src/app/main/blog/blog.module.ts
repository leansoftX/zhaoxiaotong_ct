import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ModalModule } from 'ngx-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { BlogComponent } from './blog.component';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { CreateOrEditBlogModalComponent } from './blog-modal.component';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    SharedModule,
    NotifierModule,
    NgbTabsetModule,
    NgbDropdownModule,
    BlogRoutingModule,
    ModalModule.forRoot(),
  ],
  declarations: [BlogComponent, CreateOrEditBlogModalComponent]
})
export class BlogModule { }
