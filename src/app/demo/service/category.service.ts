import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  deleteCategories(categoryIds: any[]) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  /** Fetch token from localStorage. */
  private getToken(): string | null {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  }

  /** For JSON-based requests (GET, POST, PUT, DELETE). */
  private getJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken() ?? ''}`,
    });
  }

  // Fetch all categories
  getCategories(): Observable<any> {
    const headers = this.getJsonHeaders();
    return this.http.get<any>(`${this.apiUrl}=get_category`, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Fetch a single category by ID
  getCategoryById(id: number): Observable<any> {
    const headers = this.getJsonHeaders();
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Create a new category
  createCategory(category: { title: string }): Observable<any> {
    const headers = this.getJsonHeaders();
    console.log('Creating Category:', category); // Log the payload
    console.log('API URL:', this.apiUrl); // Log the API endpoint
    
    return this.http.post<any>(`${this.apiUrl}=create_category`, category, { headers }).pipe(
      tap(response => console.log('Create Response:', response)), // Log successful response
      catchError(this.handleError)
    );
  }
  // Update an existing category
  updateCategory(id: number, category: { title: string }): Observable<any> {
    const headers = this.getJsonHeaders();
    return this.http.put<any>(`${this.apiUrl}=update_category`, category, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Delete a category
  // deleteCategory(ids: number[]): Observable<any> {
  //   const headers = this.getJsonHeaders();
  //   return this.http.delete<any>(`${this.apiUrl}=delete_category`, { 
  //     headers, 
  //     body: { ids } // Pass array of IDs
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }
 // Delete one or multiple categories
 deleteCategory(id: number | number[]): Observable<any> {
  const headers = this.getJsonHeaders();
  const body = Array.isArray(id) ? { ids: id } : { id: id };
  const options = {
    headers: headers,
    body: body
  };
  return this.http.delete<any>(`${this.apiUrl}=delete_category`, options).pipe(
    catchError(this.handleError)
  );
}

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}