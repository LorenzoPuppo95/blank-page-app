import { Component, effect, inject } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent {
  service = inject(StorageService);
  // constructor() {
  //   effect(() => {
  //     const editorDiv = document.getElementById('editroia');
  //     if (editorDiv) {
  //       this.service.note.set(editorDiv.textContent!);
  //       console.log('Editor content updated:', editorDiv.textContent!);
  //       console.log(this.service.note());
  //       // this.service.note.update(oldValue => oldValue + editorDiv.innerHTML)
  //     }
  //   });
  // }
  ngAfterViewInit(): void {
    const editorDiv = document.getElementById('editroia');
    if (editorDiv) {
      editorDiv.innerHTML = this.service.note();
      editorDiv.addEventListener('input', () => {
        this.service.note.set(editorDiv.innerHTML);
      });     
    } else {
      console.error('Editor div not found!');
    }
  }
}
