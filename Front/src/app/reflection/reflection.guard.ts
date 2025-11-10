import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ReflectionAccessService } from './reflection-access.service';

export const reflectionAccessGuard: CanActivateFn = () => {
  const accessService = inject(ReflectionAccessService);
  const attemptNumber = accessService.registerAttempt();

  if (attemptNumber > 20) {
    window.alert('El acceso a /reflection se bloquea despues de 20 ingresos.');
    return false;
  }

  return true;
};
