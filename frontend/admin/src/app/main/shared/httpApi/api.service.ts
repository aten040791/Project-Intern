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

  constructor(private http: HttpClient) {
  }

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
          console.log('Response received from API:', response); // Log response to debug

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

  private storeTokens(tokens: AuthResponse) {
    if (tokens && tokens.access_token && tokens.refresh_token && tokens.user.id) {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token);
      localStorage.setItem('user_id', tokens.user.id.toString());
    } else {
      console.error('Tokens received from API are invalid:', tokens);
    }
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

    return this.http.get<any>(`${this.apiUrl}/${nameApi}`, {params: query, headers: headers})
  }

  // create a item
  createItem(nameApi: string, queryBody: any): Observable<any> {
    const accessToken = localStorage.getItem("access_token")

    const url = `${this.apiUrl}/${nameApi}/create`

    // reverce to JSON
    // const body = queryBody
    // console.log(body)

    const headers = {
      "Authorization": `Bearer ${accessToken}`
    }

    return this.http.post<any>(url, queryBody, { headers })
    .pipe(
        tap(response => {
          
          console.log('Response received from API:', response); // Log response to debug

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

    console.log(queryBody)

    const url = `${this.apiUrl}${nameApi}/delete`
    return this.http.delete<any>(url, { body: queryBody, headers: headers })
    .pipe(
        tap(response => {
          
          console.log('Response received from API:', response); // Log response to debug

          // if (response && response.data) {
          //   this.storeTokens(response.data);
          // } else {
          //   console.error('Invalid response structure:', response);
          // }

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
            
            console.log('Response received from API:', response); // Log response to debug
  
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

}
