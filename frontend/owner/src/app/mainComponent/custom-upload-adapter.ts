import { FileLoader } from '@ckeditor/ckeditor5-upload';
import { HttpClient } from '@angular/common/http';

export class CustomUploadAdapter {
  loader: FileLoader;
  http: HttpClient;
  url: string;

  constructor(loader: FileLoader, http: HttpClient, url: string) {
    this.loader = loader;
    this.http = http;
    this.url = url;
  }

  upload() {
    return this.loader.file.then(file => new Promise((resolve, reject) => {
      if (file) {
        console.log('img_ckeditor_api_1:', file);
        const data = new FormData();
        data.append('file', file);
        console.log('data_file: ',data);

        this.http.post(this.url, data).subscribe({
          next: (response: any) => {
            console.log('img_ckeditor_api_2:', response.url);
            resolve({
              default: response.url
            });
          },
          error: (err) => {
            reject(err);
          }
        });
      } else {
        reject('No file to upload');
      }
    }));
  }
  abort() {}
}
