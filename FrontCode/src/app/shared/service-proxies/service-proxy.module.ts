import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        HttpClientModule
      ],
    providers: [
        ApiServiceProxies.CodingTestServiceProxy
    ]
})
export class ServiceProxyModule { }
