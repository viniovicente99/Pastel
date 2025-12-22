import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {trigger, transition, style, animate } from '@angular/animations';





 

@Component({
  selector: 'app-confirm-modal',
  standalone: false,
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
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
export class ConfirmModalComponent {

  

  message = inject(DIALOG_DATA).message;

  private dialogRef = inject(DialogRef<boolean>);

  close(result: boolean){
    this.dialogRef.close(result);
  };



}
