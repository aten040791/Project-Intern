import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = "http://localhost:3000"

  constructor(private http: HttpClient) {}

  // login
  login(nameApi: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/${nameApi}/sign-in`;

    const body = {
      email: email,
      password: password
    }

    return this.http.post<any>(url, body)
      .pipe(
        tap(response => {

          if (response && response.data) {
            this.storeTokens(response.data);
          } else {
          }

        }),
        catchError(error => {
            console.error('Error in API call:', error);
            return throwError(error);
        })
      );
  }

  private storeTokens(tokens: AuthResponse) {
    if (tokens && tokens.access_token && tokens.refresh_token && tokens.user.id) {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.user.id.toString());
    } else {
      console.error('Tokens received from API are invalid:', tokens);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  }

  // get current admin
  getUser(id: any): Observable<any> {
    let body = new HttpParams()
    
    if (id !== null) {
      body = body.set('id', id);
    }

    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    }

    return this.http.get<any>(`${this.apiUrl}/users/get-user`, { params: body, headers: headers })
  }

// get all items
  getItems(nameApi: string, search: string, page: number, limit: number): Observable<any> {
    const accessToken = localStorage.getItem("access_token")

    const query = new HttpParams()
    .set("search", search)
    .set("page", page)
    .set("limit", limit)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })

    return this.http.get<any>(`${this.apiUrl}${nameApi}`, {params: query, headers: headers})
  }

  // create a item
  createItem(nameApi: string, queryBody: any): Observable<any> {
    const accessToken = localStorage.getItem("access_token")

    const url = `${this.apiUrl}/${nameApi}/create`

    const headers = {
      "Authorization": `Bearer ${accessToken}`
    }

    return this.http.post<any>(url, queryBody, { headers })
    .pipe(
        tap(response => {
          
          // console.log('Response received from API:', response); // Log response to debug

          if (response && response.data) {
            this.storeTokens(response.data);
          } else {
            console.error('Invalid response structure:', response);
          }

        }),
        catchError(error => {
            console.error('Error in API call:', error);
            return throwError(error);
        })
      );

  }

  // delete a item
  deleteItem(nameApi: string, queryBody: any): Observable<any> {
    const accessToken = localStorage.getItem("access_token")

    const headers = {
      "Authorization": `Bearer ${accessToken}`
    }

    const url = `${this.apiUrl}${nameApi}/delete`
    return this.http.delete<any>(url, { body: queryBody, headers: headers })
    .pipe(
        tap(response => {
          // console.log('Response received from API:', response); // Log response to debug
        }),
        catchError(error => {
            console.error('Error in API call:', error);
            return throwError(error);
        })
      );
  }

  // update a item
  updateItem(nameApi: string, queryBody: any, id: any): Observable<any> {
    const accessToken = localStorage.getItem("access_token")

    const url = `${this.apiUrl}/${nameApi}/update/${id}`

    const headers = {
      "Authorization": `Bearer ${accessToken}`
    }

    return this.http.put<any>(url, queryBody, { headers })
    .pipe(
        tap(response => {
          
          // console.log('Response received from API:', response); // Log response to debug

          if (response && response.data) {
            this.storeTokens(response.data);
          } else {
            console.error('Invalid response structure:', response);
          }

        }),
        catchError(error => {
            console.error('Error in API call:', error);
            return throwError(error);
        })
      );

  }

  // authorization
  checkAuth(): boolean {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      return true;
    } else {
      return false;
    }
  }

}
