import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../interfaces/story.interface';
import { TopStories } from '../interfaces/topStories.interface';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0';
  constructor(private http: HttpClient) {}

  getStory(id: TopStories): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}/item/${id}.json`);
  }

  getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/item/${id}.json`);
  }
}
