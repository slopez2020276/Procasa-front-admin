import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private sharedId: any;
  private sharedData: any;
  constructor() { }

  setSharedId(id: string): void {
    this.sharedId = id;
  }

  getSharedId(): string {
    return this.sharedId;
  }

  setSharedData(data: any) {
    this.sharedData = data;
  }

  getSharedData(): any {
    return this.sharedData;
  }
}
