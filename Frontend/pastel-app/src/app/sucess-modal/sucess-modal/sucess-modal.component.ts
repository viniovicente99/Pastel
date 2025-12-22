import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sucess-modal',
  standalone: false,
  templateUrl: './sucess-modal.component.html',
  styleUrl: './sucess-modal.component.scss',
  animations: [
    trigger('fadescale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.05)'}),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'scale(1)'})
        )
      ]),
      transition(':leave',[
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'Scale(0.05)' })
        )
      ])
    ])
  ]
})

export class SucessModalComponent {
  message = inject(DIALOG_DATA)?.message || 'Operação realizada com sucesso!';
  private dialogRef = inject(DialogRef<void>);

  close() {
    this.dialogRef.close();
  }
}
