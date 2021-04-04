import { Component, TemplateRef } from '@angular/core';
import { NgbToastsService } from './ngtoasts.service';


@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toaster.toasts"
      [class]="toast.classname"
      [autohide]="true"
      (click)="toaster.removeToast(toast)"
      [delay]="toast.delay || 5000"
      (hidden)="toaster.removeToast(toast)">

      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTemplate"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTemplate }}</ng-template>
    </ngb-toast>`,
  host: { '[class.ngb-toasts]': 'true' }
})
export class NgbToastsComponent {
  constructor(public toaster: NgbToastsService) { }

  isTemplate(toaster) {
    return toaster.textOrTemplate instanceof TemplateRef;
  }
}
