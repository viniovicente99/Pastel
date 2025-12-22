import { Component, inject, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-fullscreen-image',
  standalone: false,
  templateUrl: './fullscreen-image.component.html',
  styleUrl: './fullscreen-image.component.scss'
})
export class FullscreenImageComponent {

  constructor(@Inject(DIALOG_DATA) public data: {url: string}){};

  private dialogRef = inject(DialogRef<void>);

  close() {
    this.dialogRef.close();
  }

}
