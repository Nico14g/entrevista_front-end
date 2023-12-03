import { Injectable } from '@angular/core';
import { Story } from '../interfaces/story.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private story!: Story;
  private topStories!: Story[];
  private showedComments: number[] = [];
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

  setShowedComments(id: number) {
    this.showedComments.push(id);
  }

  getShowedComments() {
    return this.showedComments;
  }
}
