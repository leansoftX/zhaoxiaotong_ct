import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    imports: [
        HttpClientModule
      ],
    providers: [
        ApiServiceProxies.BlogServiceProxy,
        ApiServiceProxies.AlgorithmsServiceProxy
    ]
})
export class ServiceProxyModule { }
