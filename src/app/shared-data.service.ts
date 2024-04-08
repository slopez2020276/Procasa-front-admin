import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedId: any;
  constructor() { }

  setSharedId(id: string): void {
    this.sharedId = id;
  }

  getSharedId(): string {
    return this.sharedId;
  }
}
