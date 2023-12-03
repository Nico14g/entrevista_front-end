import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopStories } from '../interfaces/topStories.interface';

@Injectable({
  providedIn: 'root',
})
export class TopStoriesService {
  //URL api para obtener topStories.
  private apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  constructor(private http: HttpClient) {}

  //Función encargada de conectarse con la API de Hacker News y retornar un observable de topStories
  getTopStories(): Observable<TopStories[]> {
    return this.http.get<TopStories[]>(this.apiUrl);
  }
}
