import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { AuthUserService } from './auth.user.service';
import { SearchParams } from './search-params';
import { Post } from '../interfaces/post';
import { SearchPostParams } from './search-post-params';
import { log } from 'node:console';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5069/api/post';
  private apiUrlC = 'http://localhost:5069/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  searchPosts(searchParams: SearchPostParams): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/search`, searchParams, {
      headers: this.getAuthHeaders()
    });
  }

  commentPost(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlC}/comment`, request, {
      headers: this.getAuthHeaders()
    });
  }

  getPostById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  savePost(formData: FormData, id?: number): Observable<any> {
    if (id) {
        return this.http.put<any>(`${this.apiUrl}/${id}`, formData, {
            headers: this.getAuthHeaders()
        });
    } else {
        return this.http.post<any>(this.apiUrl, formData, {
            headers: this.getAuthHeaders()
        });
    }
  }
  deletePost(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`, {
          headers: this.getAuthHeaders()
      });
  }
}