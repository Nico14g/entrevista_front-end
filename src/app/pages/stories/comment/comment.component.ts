import { Component, Input } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  //comment se obtiene desde comments.component.html
  @Input() comment!: Comment;
}
