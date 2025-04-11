import { Component, inject , AfterViewInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Note } from '../note';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent {
  service = inject(StorageService);
  ngAfterViewInit(): void {
    const editorDiv = document.getElementById('editroia');
    if (editorDiv) {
      editorDiv.innerHTML = this.service.note().desc;
      editorDiv.addEventListener('input', () => {
        const updatedDesc = editorDiv.innerHTML;
        this.service.note.update(note => ({ ...note, desc: updatedDesc }));
      });
    } else {
      console.error('Editor div not found!');
    }
  }

  startNewNote(): void {
    const newNote = this.service.createNewNote();
    this.service.note.update(() => newNote);
    const editorDiv = document.getElementById('editroia');
    if (editorDiv) {
      editorDiv.innerHTML = '';
    }
  }
}
