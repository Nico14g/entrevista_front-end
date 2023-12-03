import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Story } from '../interfaces/story.interface';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent {
  //story se obtiene de la declaración en el html de stories.component.html, para comunicarse con el componente padre.
  //selectedStory Y selectedComment son eventos que se activan al presionar el título de la story
  //y al presionar el el botón de ver comentarios respectivamente.
  @Input() story!: Story;
  @Output() selectedStory = new EventEmitter<string>();
  @Output() selectedComment = new EventEmitter<Story>();

  //Función encargada de activar el evento selectedStory en el html de stories.component.html
  handleTitleClick() {
    this.selectedStory.emit(this.story.url);
  }

  //Función encargada de activar el evento selectedComment en el html de stories.component.html
  handleSelectedComment() {
    this.selectedComment.emit(this.story);
  }
}
