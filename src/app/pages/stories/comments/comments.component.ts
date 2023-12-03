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
      this.loadComments(this.story.kids);
    } else {
      this.loadComments(this.commentIds);
    }
  }

  private loadComments(commentIds: number[]): void {
    commentIds.forEach((commentId) => {
      this.storySvc.getComment(commentId).subscribe((res: Comment) => {
        this.comments.push(res);
      });
    });
  }
}
