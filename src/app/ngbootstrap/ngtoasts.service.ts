import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgbToastsService {

  constructor() { }
  toasts: any[] = [];

  showToast(textOrTemplate: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTemplate, ...options });
  }

  showClipboardToast() {
    this.showToast('Copied to clipboard!',
      { classname: 'bg-success text-light', delay: 5000 });
  }

  removeToast(removeToast) {
    this.toasts = this.toasts.filter(toast => toast !== removeToast);
  }
}
