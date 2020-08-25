export class XmlHttpRequestHelper {

    static ajax(type: string, url: string, customHeaders: any, data: any, success: any) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const result = JSON.parse(xhr.responseText);
                    success(result);
                } else if (xhr.status !== 0) {
                    console.warn('InternalServerError');
                }
            }
        };

        url += (url.indexOf('?') >= 0 ? '&' : '?') + 'd=' + new Date().getTime();
        xhr.open(type, url, true);

        for (const property in customHeaders) {
            if (customHeaders.hasOwnProperty(property)) {
                xhr.setRequestHeader(property, customHeaders[property]);
            }
        }

        xhr.setRequestHeader('Content-type', 'application/json');
        if (data) {
            xhr.send(data);
        } else {
            xhr.send();
        }
    }
}
