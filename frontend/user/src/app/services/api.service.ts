import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService { 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPostCategories(categoryId: number, page: number = 1, perPage: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', perPage.toString());
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}`, { params });
  };

  getDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  };

  getPostDetails(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`);
  };

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/index`);
  };
}
