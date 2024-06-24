import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<any>(`${this.apiUrl}/post/user/${userId}`, { headers });
  };

  fetchDataLanguage(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/language`);
  };

  fetchDataCategory(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category`);
  };

  getPostDetails(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${postId}`); // Adjust the URL to your API endpoint
  }

  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/create`, formData);
  }


}
