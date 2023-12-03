import { Component, OnInit, ViewChild } from '@angular/core';
import { TopStoriesService } from './services/top-stories.service';
import { StoryService } from './services/story.service';
import { mergeMap, map } from 'rxjs/operators';
import { TopStories } from './interfaces/topStories.interface';
import { forkJoin } from 'rxjs';
import { Story } from './interfaces/story.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SharedDataService } from './services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit {
  isLoading = true;
  topStories: Story[] = [];
  dataSource: Story[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private topStorySvc: TopStoriesService,
    private storySvc: StoryService,
    private dataSvc: SharedDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topStories = this.dataSvc.getTopStories();

    if (!this.topStories || this.topStories.length === 0) {
      this.loadTopStories();
    } else {
      this.isLoading = false;
      this.setupPaginator();
    }
  }

  private loadTopStories(): void {
    this.topStorySvc
      .getTopStories()
      .pipe(
        mergeMap((topStories: TopStories[]) =>
          forkJoin(
            topStories.map((storyId) =>
              this.storySvc
                .getStory(storyId)
                .pipe(map((story) => ({ ...story })))
            )
          )
        ),
        map((stories: Story[][]) => stories.flat())
      )
      .subscribe((stories: Story[]) => {
        this.topStories = stories;
        this.dataSvc.setTopStories(this.topStories);
        this.isLoading = false;
        this.setupPaginator();
      });
  }

  private setupPaginator(): void {
    if (this.paginator && this.topStories) {
      this.paginator.pageSize = 50;
      this.paginator.page.subscribe((event) => {
        this.handlePageChange(event);
      });

      this.handlePageChange({
        pageIndex: 0,
        pageSize: this.paginator.pageSize,
        length: this.topStories.length,
      });
    }
  }

  handlePageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginator.length = this.topStories.length;
    this.dataSource = this.topStories.slice(startIndex, endIndex);
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }

  showComments(story: Story): void {
    if (story.kids.length > 0) {
      this.dataSvc.setSelectedStory(story);
      this.router.navigate(['/top', story.id]);
    }
  }
}
