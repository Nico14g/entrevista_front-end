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
  //story es para obtener la Story a la que se le está viendo los comentarios.
  //commentIds es para obtener la lista de comentarios de un comentario.
  //comments es una lista de comentarios según la interface de Comment.
  story!: Story;
  @Input() commentIds: number[] = [];
  comments: Comment[] = [];

  //Servicios para obtener la story seleccionada y obtener un comentario en específico
  constructor(
    private dataSvc: SharedDataService,
    private storySvc: StoryService
  ) {}

  //Inicialización del componente, al inicio se obtiene si es que ya se ha renderizado la story seleccionada
  //en caso de que no, se obtienen los comentarios de esta, caso contrario se obtienen los comentarios del comentario a renderizar.
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

  //Función encargada de obtener una lista de comentarios según la interface Comment.
  private loadComments(commentIds: number[]): void {
    commentIds.forEach((commentId) => {
      this.storySvc.getComment(commentId).subscribe((res: Comment) => {
        this.comments.push(res);
      });
    });
  }

  //Función encargada de mostrar una sola vez la story seleccionada, ya que si no se hace, cada vez que se llame a este
  //componente se renderizaria.
  //primero se revisa si la story fue seleccionada en el primer if y luego se revisa si los comentarios de la story seleccionada
  //son los mismos que se van a renderizar.
  displayStory(): boolean {
    if (!this.story) {
      return false;
    }

    const commentIds = this.comments.map((item) => item.id);
    return this.story.kids.every((commentId) => commentIds.includes(commentId));
  }

  //Función encaragada de abril el url en una nueva pestaña
  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
