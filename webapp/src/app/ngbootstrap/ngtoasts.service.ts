import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgbToastsService {

  constructor() { }
  toasts: any[] = [];

  showToast(textOrTemplate: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTemplate, ...options });
  }

  removeToast(removeToast) {
    this.toasts = this.toasts.filter(toast => toast !== removeToast);
  }
}
