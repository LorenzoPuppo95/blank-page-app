import { Component, inject , AfterViewInit } from '@angular/core';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent implements AfterViewInit {
  service = inject(StorageService);
  ngAfterViewInit(): void {
    const editorDiv = document.getElementById('editroia');
    if (editorDiv) {
      editorDiv.innerText = this.service.note().desc;
      editorDiv.addEventListener('input', () => {
        const updatedDesc = editorDiv.innerText;
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
      editorDiv.innerText = '';
    }
  }
}
