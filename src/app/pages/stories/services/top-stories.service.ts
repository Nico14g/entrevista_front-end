import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopStories } from '../interfaces/topStories.interface';

@Injectable({
  providedIn: 'root',
})
export class TopStoriesService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<TopStories[]> {
    return this.http.get<TopStories[]>(this.apiUrl);
  }
}
