import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { MaterialModule } from 'src/app/material.module';
import { UnixDatePipe } from 'src/app/utils/date/unix-date.pipe';
import { StoryComponent } from './story/story.component';

@NgModule({
  declarations: [StoriesComponent, StoryComponent],
  imports: [CommonModule, StoriesRoutingModule, MaterialModule, UnixDatePipe],
  exports: [StoryComponent],
})
export class StoriesModule {}
