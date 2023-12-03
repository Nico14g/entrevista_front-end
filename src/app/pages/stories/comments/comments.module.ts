import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { MaterialModule } from 'src/app/material.module';
import { CommentComponent } from '../comment/comment.component';
import { UnixDatePipe } from 'src/app/utils/date/unix-date.pipe';
import { StoriesModule } from '../stories.module';

@NgModule({
  declarations: [CommentsComponent, CommentComponent],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    MaterialModule,
    UnixDatePipe,
    StoriesModule,
  ],
})
export class CommentsModule {}
