import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
  };

  fetchData(): Observable<any> {
    const userId = localStorage.getItem('user_id');
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/post/user/${userId}`, { headers });
  };

  fetchDataLanguage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/language`);
  };

  fetchDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  };

  getPostDetails(postId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/post/${postId}`, { headers });
  };

  createPost(formData: string): Observable<any> { // Changed type to any
    console.log(formData);
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/post/create`, { formData }, { headers });
  };

  updatePost(postId: number, formData: string): Observable<any> { // Changed type to any
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/post/update/${postId}`, { formData }, { headers });
  };

  deletePost(formData: number[]): Observable<any> {
    const headers = this.getHeaders();
    const options = {
      headers: headers,
      body: { formData }
    };
    return this.http.delete<any>(`${this.apiUrl}/post/delete`, options);
  };

  updateCategory(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };

  updateLanguage(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };

  updateStatus(formData: number[]): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/post/update-multiple`, { formData });
  };
}
