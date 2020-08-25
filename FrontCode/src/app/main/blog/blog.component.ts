import { LazyLoadEvent } from 'primeng/api';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { CreateOrEditBlogModalComponent } from './blog-modal.component';
import { SelectComponent } from 'src/app/theme/shared/components/select/select.component';
import { BlogServiceProxy, BlogSearch, BlogInfo } from 'src/app/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

@Injectable()
export class BlogComponent implements OnInit {
  @ViewChild('selectBlogType', { static: true }) selectBlogType: SelectComponent;
  @ViewChild('createOrEditBlogModal', { static: true }) createOrEditBlogModal: CreateOrEditBlogModalComponent;
  rows = 5;
  loading: boolean;
  datas: BlogInfo[];
  first: number = 0;
  blogDetails: BlogInfo;
  totalRecords: number;
  blogSearch: BlogSearch = { typeId: '0' } as BlogSearch;

  constructor(private notifier: NotifierService, private blogServiceProxy: BlogServiceProxy) { }

  ngOnInit() {
  }

  loadCarsLazy(event?: LazyLoadEvent) {
    this.loading = true;
    if (event) {
      this.blogSearch.skip = event.first;
      this.blogSearch.size = event.rows;
    } else {
      this.blogSearch.skip = 0;
      this.blogSearch.size = this.rows;
    }
    this.blogServiceProxy.getBlogInfos(this.blogSearch).subscribe(res => {
      this.datas = res.data;
      this.totalRecords = res.count;
      this.loading = false;
    });
  }

  delete(blog: BlogInfo) {
    this.loading = true;
    this.blogServiceProxy.deleteBlog(blog).subscribe(res => {
      this.first = 0;
      this.loading = false;
      this.notifier.notify("success", "Action is successfull");
      this.loadCarsLazy();
    });
  }

  read(id: number) {
    this.blogDetails = this.datas.filter(data => data.id === id)[0];
  }

  showBlogDetail(id?: number) {
    this.createOrEditBlogModal.show(id);
  }

  search() {
    this.loading = true;
    this.first = 0;
    this.loadCarsLazy();
  }

  reset() {
    this.first = 0;
    this.loading = true;
    this.blogSearch.name = '';
    this.blogSearch.typeId = '0';
    this.loadCarsLazy();
  }
}
