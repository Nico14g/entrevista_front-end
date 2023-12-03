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
  //isLoading, utilizada para el spinner inicial.
  //topStories, guarda todas las topStories
  //dataSource guarda los 50 elementos o menos de la paginación
  isLoading = true;
  topStories: Story[] = [];
  dataSource: Story[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  //constructor donde se llaman a servicios para poder obtener información de la API de Hacker news,
  //además de guardar información como la story seleccionada en la funcion showComments.
  constructor(
    private topStorySvc: TopStoriesService,
    private storySvc: StoryService,
    private dataSvc: SharedDataService,
    private router: Router
  ) {}

  //Inicialización del componente, en caso de que ya se hayan obtenido las topStories, solo se configura la paginación,
  //en caso contrario se hace la llamada a la API, en la función loadTopStories
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
        //El index es para agregarle la posición donde se encuentra en la lista, para mostrarla en pantalla.
        this.topStories = stories.map((story, index) => ({
          ...story,
          index: index + 1,
        }));
        this.dataSvc.setTopStories(this.topStories);
        this.isLoading = false;
        this.setupPaginator();
      });
  }

  //Configuración de paginación, donde pageSize es 50 y se llama al evento handlePageChange
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

  //Se encarga de asignar parte topStories en dataSource, además de terminar de configurar la paginación
  handlePageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginator.length = this.topStories.length;
    this.dataSource = this.topStories.slice(startIndex, endIndex);
  }

  //Función encargada de abrir el url de la story
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
  //Función encargada de cambiar la ruta a top/:id y guardar la story seleccionada.
  showComments(story: Story): void {
    if (story && story?.kids?.length > 0) {
      this.dataSvc.setSelectedStory(story);
      this.router.navigate(['/top', story.id]);
    }
  }
}
