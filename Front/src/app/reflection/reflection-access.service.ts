import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReflectionAccessService {
  private visitCount = 0;

  registerAttempt(): number {
    this.visitCount += 1;
    return this.visitCount;
  }

  get currentCount(): number {
    return this.visitCount;
  }
}
