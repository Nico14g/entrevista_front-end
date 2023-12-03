import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../interfaces/story.interface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent {
  @Input() storyUrl!: string;
  @Input() story!: Story;
  @Output() selectedStory = new EventEmitter<string>();
  @Output() selectedComment = new EventEmitter<Story>();

  handleTitleClick() {
    this.selectedStory.emit(this.storyUrl);
  }

  handleSelectedComment() {
    this.selectedComment.emit(this.story);
  }
}
