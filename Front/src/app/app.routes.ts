import { Routes } from '@angular/router';
import { ReflectionComponent } from './reflection/reflection.component';
import { reflectionAccessGuard } from './reflection/reflection.guard';

export const routes: Routes = [
  {
    path: 'reflection',
    canActivate: [reflectionAccessGuard],
    component: ReflectionComponent
  }
];
