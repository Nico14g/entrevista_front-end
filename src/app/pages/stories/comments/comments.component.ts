import { Component, Input, OnInit } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';
import { StoryService } from '../services/story.service';
import { Story } from '../interfaces/story.interface';
import { Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  story!: Story;
  @Input() commentIds: number[] = [];
  comments: Comment[] = [];

  constructor(
    private dataSvc: SharedDataService,
    private storySvc: StoryService
  ) {}

  ngOnInit(): void {
    const readStory = this.dataSvc.getReadStory();
    if (!readStory) {
      this.story = this.dataSvc.getStory();

      if (this.story?.kids) {
        this.loadComments(this.story.kids);
      }
    } else {
      if (this.commentIds.length > 0) {
        this.loadComments(this.commentIds);
      }
    }
  }

  private loadComments(commentIds: number[]): void {
    commentIds.forEach((commentId) => {
      this.storySvc.getComment(commentId).subscribe((res: Comment) => {
        this.comments.push(res);
      });
    });
  }

  displayStory(): boolean {
    if (!this.story) {
      return false;
    }

    const commentIds = this.comments.map((item) => item.id);
    return this.story.kids.every((commentId) => commentIds.includes(commentId));
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
