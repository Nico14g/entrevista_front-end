import { Injectable } from '@angular/core';
import { Story } from '../interfaces/story.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  //Servicio utilizado para almacenar información como la story seleccinada
  //el total de topStories o si ya se revisó un comentario, para evitar bucles infinitos
  private story!: Story;
  private topStories!: Story[];
  private readStory = false;

  setSelectedStory(story: Story) {
    this.readStory = false;
    this.story = story;
  }

  getStory() {
    this.readStory = true;
    return this.story;
  }

  getReadStory() {
    return this.readStory;
  }

  setTopStories(topStories: Story[]) {
    this.topStories = topStories;
  }
  getTopStories() {
    return this.topStories;
  }

  getStorysKids() {
    return this.story.kids;
  }
}
