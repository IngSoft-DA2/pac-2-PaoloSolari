import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReflectionService } from './reflection.service';
import { ReflectionAccessService } from './reflection-access.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrl: './reflection.component.css'
})
export class ReflectionComponent {
  importers: string[] = [];
  isLoading = false;
  hasFetched = false;
  errorMessage = '';

  constructor(
    private readonly reflectionService: ReflectionService,
    private readonly accessService: ReflectionAccessService
  ) {}

  loadImporters(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.reflectionService.fetchImporterAssemblies().subscribe({
      next: (names) => {
        this.importers = names;
        this.hasFetched = true;
        this.isLoading = false;
      },
      error: () => {
        this.importers = [];
        this.hasFetched = true;
        this.isLoading = false;
        this.errorMessage = 'No se pudieron cargar las DLL. Intenta nuevamente en unos segundos.';
      }
    });
  }

  get showEmptyState(): boolean {
    return this.hasFetched && !this.isLoading && !this.errorMessage && this.importers.length === 0;
  }

  get totalVisits(): number {
    return this.accessService.currentCount;
  }
}
