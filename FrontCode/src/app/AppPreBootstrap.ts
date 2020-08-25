import { environment } from 'src/environments/environment';
import { XmlHttpRequestHelper } from './shared/service-proxies/XmlHttpRequestHelper';
import { AppConsts } from './shared/AppConsts';

export class AppPreBootstrap {
    static run(appRootUrl: string, callback: () => void, resolve: any, reject: any): void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, () => {
            resolve(true);
        });
    }

    private static getApplicationConfig(appRootUrl: string, callback: () => void) {
        const type = 'GET';
        const url = appRootUrl + 'assets/' + environment.appConfig;
        const customHeaders = [{}];
        XmlHttpRequestHelper.ajax(type, url, customHeaders, null, (result) => {
            AppConsts.appBaseUrlFormat = result.appBaseUrl;
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            AppConsts.tokenServiceBaseUrl = result.tokenServiceBaseUrl;
            callback();
        });
    }

}
